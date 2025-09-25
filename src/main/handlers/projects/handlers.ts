import { ipcMain } from "electron";
import { checkProjectTemplates, selectWorkspace } from "./service";
import { CHANNELS } from "../../../shared/channels";

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
}
