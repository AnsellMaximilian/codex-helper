import { ipcMain } from "electron";

const initHandlers = () => {
  ipcMain.handle("test", () => {
    console.log("Swagger");
  });
};

export default initHandlers;
