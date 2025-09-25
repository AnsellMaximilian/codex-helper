import { ipcMain } from "electron";
import { checkProjectTemplates, selectWorkspace, syncTemplates } from "./service";
import { CHANNELS } from "../../../shared/channels";
import type { TemplateSyncRequest } from "./types";

export default function projectFeatuerHandlers() {
  ipcMain.handle(CHANNELS.PROJECT.ADD_WORKSPACE, async () => {
    return selectWorkspace();
  });
  ipcMain.handle(
    CHANNELS.PROJECT.CHECK_TEMPLATES,
    async (_event, projectDir: string) => {
      return checkProjectTemplates(projectDir);
    }
  );
  ipcMain.handle(
    CHANNELS.PROJECT.SYNC_TEMPLATES,
    async (event, payload: TemplateSyncRequest) => {
      if (!payload || typeof payload.projectDir !== "string") {
        throw new Error("Invalid template sync payload");
      }
      return syncTemplates(payload, (progress) => {
        event.sender.send(CHANNELS.PROJECT.TEMPLATE_SYNC_PROGRESS, progress);
      });
    }
  );
}
