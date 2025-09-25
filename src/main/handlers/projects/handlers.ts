import { ipcMain } from "electron";
import projectStore from "../../store/projectStore";
import { checkProjectTemplates, selectWorkspace, syncTemplates } from "./service";
import { CHANNELS } from "../../../shared/channels";
import type { TemplateSyncRequest } from "./types";

export default function projectFeatuerHandlers() {
  ipcMain.handle(CHANNELS.PROJECT.ADD_WORKSPACE, async () => {
    const project = await selectWorkspace();
    if (!project) {
      return null;
    }
    const { project: storedProject } = projectStore.upsert(project);
    return storedProject;
  });

  ipcMain.handle(CHANNELS.PROJECT.GET_ALL, async () => {
    return projectStore.getAll();
  });

  ipcMain.handle(CHANNELS.PROJECT.REMOVE, async (_event, projectId: unknown) => {
    if (typeof projectId !== "string" || projectId.length === 0) {
      throw new Error("A valid project id is required to remove a project.");
    }
    return projectStore.delete(projectId);
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
