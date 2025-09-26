// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import type { TemplateSyncProgress, TemplateSyncRequest } from "./shared/types";
import { AppAPI } from "./shared/types";
import { CHANNELS } from "./shared/channels";

const api: AppAPI = {
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  projects: {
    addWorkspace: () => ipcRenderer.invoke(CHANNELS.PROJECT.ADD_WORKSPACE),
    getAll: () => ipcRenderer.invoke(CHANNELS.PROJECT.GET_ALL),
    remove: (projectId: string) =>
      ipcRenderer.invoke(CHANNELS.PROJECT.REMOVE, projectId),
    checkTemplates: (projectDir: string) =>
      ipcRenderer.invoke(CHANNELS.PROJECT.CHECK_TEMPLATES, projectDir),
    syncTemplates: (request: TemplateSyncRequest) =>
      ipcRenderer.invoke(CHANNELS.PROJECT.SYNC_TEMPLATES, request),
    checkAndroidTemplates: (projectId: string) =>
      ipcRenderer.invoke(CHANNELS.PROJECT.CHECK_ANDROID_TEMPLATES, projectId),
    generateAndroidTemplates: (projectId: string) =>
      ipcRenderer.invoke(
        CHANNELS.PROJECT.GENERATE_ANDROID_TEMPLATES,
        projectId
      ),
    onTemplateSyncProgress: (callback) => {
      const listener = (
        _event: Electron.IpcRendererEvent,
        payload: unknown
      ) => {
        callback(payload as TemplateSyncProgress);
      };
      ipcRenderer.on(CHANNELS.PROJECT.TEMPLATE_SYNC_PROGRESS, listener);
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.PROJECT.TEMPLATE_SYNC_PROGRESS,
          listener
        );
      };
    },
  },
  templates: {
    loadAgents: () => ipcRenderer.invoke(CHANNELS.TEMPLATES.READ_AGENTS),
    saveAgents: (content: string) =>
      ipcRenderer.invoke(CHANNELS.TEMPLATES.WRITE_AGENTS, content),
  },
};

contextBridge.exposeInMainWorld("api", api);
