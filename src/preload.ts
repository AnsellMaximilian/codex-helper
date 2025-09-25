// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
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
  },
};

contextBridge.exposeInMainWorld("api", api);
