import path from "node:path";
import { promises as fs } from "node:fs";
import { app, ipcMain } from "electron";

import { CHANNELS } from "../../../shared/channels";

const AGENTS_FILE_NAME = "AGENTS.md";
let cachedAgentsTemplatePath: string | null = null;

async function exists(target: string): Promise<boolean> {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function resolveAgentsTemplatePath(): Promise<string> {
  if (cachedAgentsTemplatePath) {
    return cachedAgentsTemplatePath;
  }

  const candidates = new Set<string>();

  if (typeof app.getAppPath === "function") {
    try {
      const appPath = app.getAppPath();
      candidates.add(
        path.join(appPath, "src", "shared", "assets", "templates", AGENTS_FILE_NAME)
      );
      candidates.add(
        path.join(appPath, "shared", "assets", "templates", AGENTS_FILE_NAME)
      );
    } catch {
      /* noop */
    }
  }

  candidates.add(
    path.join(process.cwd(), "src", "shared", "assets", "templates", AGENTS_FILE_NAME)
  );
  candidates.add(
    path.join(__dirname, "..", "..", "shared", "assets", "templates", AGENTS_FILE_NAME)
  );

  for (const candidate of candidates) {
    if (await exists(candidate)) {
      cachedAgentsTemplatePath = candidate;
      return candidate;
    }
  }

  throw new Error("Agents template file could not be located.");
}

export default function templateHandlers() {
  ipcMain.handle(CHANNELS.TEMPLATES.READ_AGENTS, async () => {
    const filePath = await resolveAgentsTemplatePath();
    return fs.readFile(filePath, "utf8");
  });

  ipcMain.handle(CHANNELS.TEMPLATES.WRITE_AGENTS, async (_event, content: unknown) => {
    if (typeof content !== "string") {
      throw new Error("Template content must be a string.");
    }

    const filePath = await resolveAgentsTemplatePath();
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, "utf8");
  });
}
