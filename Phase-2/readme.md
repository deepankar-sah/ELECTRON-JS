## DEEPANKAR SAH

---

# 🎯 Phase 2: Setup Electron.js + React + TypeScript with Vite

## ✅ Step-by-Step Setup Guide

---

### 🧱 Step 1: Create a Vite + React + TypeScript Project

```bash
npm create vite@latest my-electron-app -- --template react-ts
cd my-electron-app
npm install
```

---

### 📁 Folder Structure (abhi kuch extra files add karenge)

```
my-electron-app/
├── electron/                ← Electron files
│   └── main.ts              ← Main process entry
├── public/
├── src/
│   └── main.tsx             ← React entry point
│   └── App.tsx              ← UI
├── index.html
├── package.json
└── vite.config.ts
```

---

### 🧠 Step 2: Install Electron

```bash
npm install --save-dev electron
```

---

### 🧠 Step 3: Add Electron Main Process File

📄 **`electron/main.ts`**

```ts
import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // optional
    },
  });

  // during dev use Vite's dev server
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools(); // optional
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
```

---

### 🧠 Step 4: Configure Scripts

📄 **Add to `package.json`**

```json
"main": "electron/main.ts",
"scripts": {
  "dev": "vite",
  "electron": "electron .",
  "start": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\""
},
"devDependencies": {
  "concurrently": "^8.0.0",
  "wait-on": "^7.0.0"
}
```

⬆️ Ye script `vite` ko React serve karne dega aur Electron ko us page par load karayega.

```bash
npm install --save-dev concurrently wait-on
```

---

### 🧠 Step 5: Configure Vite to Work with Electron

📄 **vite.config.ts** me ye add karo:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
  },
});
```

---

### 🚀 Step 6: Run Everything

```bash
npm run start
```

---
