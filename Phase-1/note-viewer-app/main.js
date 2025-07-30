const { app, BrowserWindow } = require("electron");
const path = require("path");

// Creates the main window
function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true, // To use Node.js in renderer
      contextIsolation: false,
    },
  });
  // Load the index.html
  win.loadFile("index.html");
}

// Runs create window when app is ready
app.whenReady().then(createWindow);

// Mac specific behavior for closing
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
