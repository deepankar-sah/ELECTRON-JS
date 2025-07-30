const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveNote: (content) => ipcRenderer.invoke("save-note", content),
  loadNote: () => ipcRenderer.invoke("load-note"),
});
