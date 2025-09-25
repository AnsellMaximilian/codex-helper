import path from "node:path";
import { promises as fs } from "node:fs";
import { dialog } from "electron";

import type { BasePackageResult, ProjectSelectionResult } from "./types";

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

export async function extractAndroidBasePackage(
  projectDir?: string
): Promise<ProjectSelectionResult> {
  const resolvedDir = projectDir ?? (await pickProjectDirectory());
  if (!resolvedDir) return null;

  return extractFromDirectory(resolvedDir);
}
