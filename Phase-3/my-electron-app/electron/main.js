import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(createWindow);

// Handle save note
ipcMain.handle("save-note", async (_event, content) => {
  const filePath = path.join(__dirname, "note.txt");
  fs.writeFileSync(filePath, content, "utf8");
  return "Note saved!";
});

// Handle load note
ipcMain.handle("load-note", async () => {
  const filePath = path.join(__dirname, "note.txt");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  }
  return "";
});
