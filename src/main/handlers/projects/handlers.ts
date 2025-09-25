import { dialog, ipcMain } from "electron";
import { extractAndroidBasePackage } from "./service";
import { CHANNELS } from "../../../shared/channels";

export default function projectFeatuerHandlers() {
  ipcMain.handle(CHANNELS.PROJECT.PICK_FOLDER, async () => {
    const res = await dialog.showOpenDialog({
      properties: ["openDirectory", "createDirectory"],
    });
    if (res.canceled) return null;

    return res.filePaths[0];
  });
  ipcMain.handle(CHANNELS.PROJECT.ADD_WORKSPACE, async () => {
    return extractAndroidBasePackage();
  });
}
