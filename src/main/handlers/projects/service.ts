import path from "node:path";
import { promises as fs } from "node:fs";
import { createHash, randomUUID } from "node:crypto";
import { app, dialog } from "electron";

import type {
  BasePackageResult,
  Project,
  TemplateCheckMap,
  TemplateSyncMode,
  TemplateSyncProgress,
  TemplateSyncRequest,
  TemplateSyncResult,
} from "./types";

const IGNORE_DIRS = new Set([
  ".git",
  ".idea",
  ".gradle",
  "build",
  "node_modules",
  "out",
  "dist",
]);

// Groovy & Kotlin DSL patterns
const RE_APPLICATION_ID = [
  /applicationId\s*=\s*["']([^"']+)["']/i, // Kotlin DSL
  /applicationId\s+["']([^"']+)["']/i, // Groovy DSL
];

const RE_NAMESPACE = [
  /namespace\s*=\s*["']([^"']+)["']/i, // Kotlin DSL
  /namespace\s+["']([^"']+)["']/i, // Groovy DSL
];

// Very lightweight manifest "package" grab
const RE_MANIFEST_PACKAGE = /<manifest[^>]*\spackage=["']([^"']+)["']/i;

// Identify an application module quickly
const RE_ANDROID_APP_PLUGIN = [
  /id\s*\(?["']com\.android\.application["']\)?/i,
  /apply\s+plugin:\s*["']com\.android\.application["']/i,
  /plugins\s*\{[^}]*alias\s*\(\s*libs\.plugins\.android\.application\s*\)[^}]*\}/is,
];

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}
async function readIf(p: string) {
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return "";
  }
}
function firstMatch(res: RegExp[], text: string): string | null {
  for (const r of res) {
    const m = r.exec(text);
    if (m?.[1]) return m[1].trim();
  }
  return null;
}

async function readGradlePair(dir: string) {
  const groovy = path.join(dir, "build.gradle");
  const kts = path.join(dir, "build.gradle.kts");
  const txtGroovy = await readIf(groovy);
  const txtKts = await readIf(kts);
  return {
    files: [groovy, kts],
    text: (txtGroovy || "") + "\n" + (txtKts || ""),
  };
}

async function tryFromModule(
  moduleDir: string,
  filesChecked: string[]
): Promise<{ pkg: string | null; source: BasePackageResult["source"] }> {
  const { files, text } = await readGradlePair(moduleDir);
  filesChecked.push(...files.filter(Boolean));

  // 1) applicationId
  const appId = firstMatch(RE_APPLICATION_ID, text);
  if (appId) return { pkg: appId, source: "applicationId" };

  // 2) namespace
  const ns = firstMatch(RE_NAMESPACE, text);
  if (ns) return { pkg: ns, source: "namespace" };

  // 3) AndroidManifest.xml
  const manifest = path.join(moduleDir, "src", "main", "AndroidManifest.xml");
  filesChecked.push(manifest);
  const mTxt = await readIf(manifest);
  const m = RE_MANIFEST_PACKAGE.exec(mTxt);
  if (m?.[1]) return { pkg: m[1].trim(), source: "manifest" };

  return { pkg: null, source: "none" };
}

async function looksLikeAppModule(dir: string): Promise<boolean> {
  const { text } = await readGradlePair(dir);
  return RE_ANDROID_APP_PLUGIN.some((r) => r.test(text));
}

async function findCandidateModules(root: string): Promise<string[]> {
  const candidates: string[] = [];

  // Priority 1: classic app module at root
  const appDir = path.join(root, "app");
  if (await exists(appDir)) candidates.push(appDir);

  // Priority 2: RN/Flutter convention: ./android/app
  const rnAndroidApp = path.join(root, "android", "app");
  if (await exists(rnAndroidApp)) candidates.push(rnAndroidApp);

  // Priority 3: any subdir that looks like an application module (shallow scan)
  try {
    const items = await fs.readdir(root, { withFileTypes: true });
    for (const d of items) {
      if (!d.isDirectory() || IGNORE_DIRS.has(d.name)) continue;
      const dir = path.join(root, d.name);
      if (await looksLikeAppModule(dir)) candidates.push(dir);
    }
  } catch {
    /* ignore */
  }

  // De-dupe while preserving order
  return [...new Set(candidates)];
}

async function pickProjectDirectory(): Promise<string | null> {
  const res = await dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory"],
  });
  if (res.canceled || res.filePaths.length === 0) return null;

  return res.filePaths[0];
}

async function extractFromDirectory(
  projectDir: string
): Promise<BasePackageResult> {
  const filesChecked: string[] = [];
  const warnings: string[] = [];
  const modules = await findCandidateModules(projectDir);

  // Try each candidate in order
  for (const m of modules) {
    const { pkg, source } = await tryFromModule(m, filesChecked);
    if (pkg) {
      return {
        dirScanned: projectDir,
        moduleDir: m,
        packageName: pkg,
        source,
        filesChecked,
        warnings,
      };
    }
  }

  // As a last-ditch: look at root build files for namespace/appId (multi-module single-DSL case)
  const { files, text } = await readGradlePair(projectDir);
  filesChecked.push(...files);
  const rootAppId = firstMatch(RE_APPLICATION_ID, text);
  if (rootAppId) {
    warnings.push(
      "applicationId found in root build file; verify module structure."
    );
    return {
      dirScanned: projectDir,
      moduleDir: null,
      packageName: rootAppId,
      source: "applicationId",
      filesChecked,
      warnings,
    };
  }
  const rootNs = firstMatch(RE_NAMESPACE, text);
  if (rootNs) {
    warnings.push(
      "namespace found in root build file; verify module structure."
    );
    return {
      dirScanned: projectDir,
      moduleDir: null,
      packageName: rootNs,
      source: "namespace",
      filesChecked,
      warnings,
    };
  }

  return {
    dirScanned: projectDir,
    moduleDir: null,
    packageName: null,
    source: "none",
    filesChecked,
    warnings,
  };
}

function normalizeDir(dir: string): string {
  return dir.replace(/[\\/]+$/, "");
}

function deriveProjectName(dir: string): string {
  const trimmed = normalizeDir(dir);
  const base = path.basename(trimmed);
  return base || trimmed;
}

function buildProject(base: BasePackageResult): Project {
  const id = createHash("sha1").update(base.dirScanned).digest("hex");
  return {
    id,
    name: deriveProjectName(base.dirScanned),
    rootDir: base.dirScanned,
    moduleDir: base.moduleDir,
    packageName: base.packageName,
    packageSource: base.source,
    warnings: base.warnings,
    filesChecked: base.filesChecked,
  };
}

async function resolveTemplateRoot(): Promise<string | null> {
  const candidates = new Set<string>();
  if (typeof app.getAppPath === "function") {
    try {
      const appPath = app.getAppPath();
      candidates.add(
        path.join(appPath, "src", "shared", "assets", "templates")
      );
      candidates.add(path.join(appPath, "shared", "assets", "templates"));
    } catch {
      // Ignore failures and fall back to cwd checks
    }
  }
  candidates.add(
    path.join(process.cwd(), "src", "shared", "assets", "templates")
  );

  for (const candidate of candidates) {
    if (await exists(candidate)) {
      return candidate;
    }
  }
  return null;
}

async function collectTemplateFiles(
  dir: string,
  baseDir: string
): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await collectTemplateFiles(abs, baseDir)));
      } else if (entry.isFile()) {
        const rel = path.relative(baseDir, abs).replace(/\\/g, "/");
        files.push(rel);
      }
    }
    return files;
  } catch {
    return [];
  }
}

let templateRootPromise: Promise<string | null> | null = null;
let templatePathsPromise: Promise<string[]> | null = null;

async function getTemplateRoot(): Promise<string | null> {
  if (!templateRootPromise) {
    templateRootPromise = resolveTemplateRoot();
  }
  return templateRootPromise;
}

async function getTemplatePaths(): Promise<string[]> {
  if (!templatePathsPromise) {
    templatePathsPromise = (async () => {
      const root = await getTemplateRoot();
      if (!root) return [];
      return collectTemplateFiles(root, root);
    })();
  }
  return templatePathsPromise;
}

async function copyTemplateFile(
  templateRoot: string,
  projectDir: string,
  relativePath: string,
  overwrite: boolean
): Promise<"copied" | "skipped" | "missing-source"> {
  const segments = relativePath.split("/");
  const source = path.join(templateRoot, ...segments);
  if (!(await exists(source))) {
    return "missing-source";
  }

  const target = path.join(projectDir, ...segments);
  await fs.mkdir(path.dirname(target), { recursive: true });

  if (!overwrite && (await exists(target))) {
    return "skipped";
  }

  await fs.copyFile(source, target);
  return "copied";
}

export async function checkProjectTemplates(
  projectDir: string
): Promise<TemplateCheckMap> {
  const templatePaths = await getTemplatePaths();
  if (templatePaths.length === 0) {
    return {};
  }

  const result: TemplateCheckMap = {};

  for (const rel of templatePaths) {
    const key = rel;
    const target = path.join(projectDir, ...rel.split("/"));
    // eslint-disable-next-line no-await-in-loop
    result[key] = await exists(target);
  }

  return result;
}

export async function syncTemplates(
  request: TemplateSyncRequest,
  notify: (progress: TemplateSyncProgress) => void
): Promise<TemplateSyncResult> {
  const { projectDir, mode = "missing", files } = request;
  const templateRoot = await getTemplateRoot();
  if (!templateRoot) {
    throw new Error("Template assets directory could not be located.");
  }

  const templatePaths = await getTemplatePaths();
  const normalizedMode: TemplateSyncMode = mode;
  let selectedPaths: string[] = [];

  if (normalizedMode === "all") {
    selectedPaths = [...templatePaths];
  } else if (normalizedMode === "missing") {
    for (const rel of templatePaths) {
      const target = path.join(projectDir, ...rel.split("/"));
      // eslint-disable-next-line no-await-in-loop
      if (!(await exists(target))) {
        selectedPaths.push(rel);
      }
    }
  } else if (normalizedMode === "single") {
    const requested = Array.isArray(files) ? files : [];
    if (requested.length === 0) {
      throw new Error("No template files provided for synchronization.");
    }
    const templateSet = new Set(templatePaths);
    selectedPaths = requested.filter((rel) => templateSet.has(rel));
    if (selectedPaths.length === 0) {
      throw new Error("Requested template files do not exist in the template directory.");
    }
  } else {
    throw new Error(`Unsupported template sync mode: ${normalizedMode}`);
  }

  selectedPaths = [...new Set(selectedPaths)];

  const overwrite = normalizedMode !== "missing";
  const runId = randomUUID();
  let copiedCount = 0;

  for (const rel of selectedPaths) {
    notify({
      projectDir,
      runId,
      mode: normalizedMode,
      relativePath: rel,
      state: "start",
    });

    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await copyTemplateFile(templateRoot, projectDir, rel, overwrite);
      if (result === "copied") {
        copiedCount += 1;
        notify({
          projectDir,
          runId,
          mode: normalizedMode,
          relativePath: rel,
          state: "success",
        });
      } else if (result === "skipped") {
        notify({
          projectDir,
          runId,
          mode: normalizedMode,
          relativePath: rel,
          state: "skipped",
        });
      } else {
        notify({
          projectDir,
          runId,
          mode: normalizedMode,
          relativePath: rel,
          state: "error",
          error: "Template source file not found.",
        });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error ?? "Unknown error");
      notify({
        projectDir,
        runId,
        mode: normalizedMode,
        relativePath: rel,
        state: "error",
        error: message,
      });
    }
  }

  const status = await checkProjectTemplates(projectDir);

  notify({
    projectDir,
    runId,
    mode: normalizedMode,
    relativePath: null,
    state: "complete",
    copiedCount,
    totalCount: selectedPaths.length,
  });

  return {
    runId,
    status,
  };
}

export async function selectWorkspace(
  projectDir?: string
): Promise<Project | null> {
  const resolvedDir = projectDir ?? (await pickProjectDirectory());
  if (!resolvedDir) return null;

  const base = await extractFromDirectory(resolvedDir);
  return buildProject(base);
}
