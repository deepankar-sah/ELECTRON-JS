### DEEPANKAR SAH

---

# ⚡ Phase 3: IPC Communication (React ⇄ Electron)

---

## 🔍 What is IPC?

> **IPC (Inter-Process Communication)** ka matlab hota hai:
>
> - Electron ke **Renderer Process (React app)** se **Main Process** ko message bhejna ya lena.
> - Ye communication Electron ke `ipcRenderer` aur `ipcMain` modules ke through hota hai.

---

## 🧠 Use Case:

- 📝 React se file content bhejna main process ko → Save as text file
- 🧾 Main process se file read karke React me show karna

---

## 📦 Tools You'll Use:

- `ipcRenderer` (React side)
- `ipcMain` (Electron side)
- `contextBridge` (for secure communication)
- Preload Script

---

## 🎯 Goal of This Phase:

Banayenge ek React + Electron app jisme:

- Textarea me likha hua data **Electron ke through** file me save hoga
- File content React app me wapas show hoga

---

## ✅ Step-by-Step Setup

---

### 📁 Folder Structure Update

```
my-electron-app/
├── electron/
│   ├── main.ts
│   ├── preload.ts         👈 NEW FILE (secure bridge)
├── src/
│   ├── App.tsx
│   ├── main.tsx
├── electron-entry.cjs
├── package.json
```

---

### 🔧 Step 1: Update `main.ts` to use `preload.ts`

📄 `electron/main.ts`

```ts
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";

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

// ✅ Handle save note
ipcMain.handle("save-note", async (_event, content: string) => {
  const filePath = path.join(__dirname, "note.txt");
  fs.writeFileSync(filePath, content, "utf8");
  return "Note saved!";
});

// ✅ Handle load note
ipcMain.handle("load-note", async () => {
  const filePath = path.join(__dirname, "note.txt");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  }
  return "";
});
```

---

### 📄 Step 2: Create `preload.ts` — Secure Communication Bridge

📄 `electron/preload.ts`

```ts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  saveNote: (content: string) => ipcRenderer.invoke("save-note", content),
  loadNote: () => ipcRenderer.invoke("load-note"),
});
```

🛡️ `contextBridge` allows only specific safe APIs to be exposed to React — no full Node access.

---

### 🧠 Step 3: Tell Vite to include `.ts` preload script

Make sure `preload.ts` is compiled to `.js`. Since we're using `esbuild-register`, it'll work at runtime.

---

### 🧩 Step 4: Update `App.tsx` to use Electron APIs

📄 `src/App.tsx`

```tsx
import { useEffect, useState } from "react";

declare global {
  interface Window {
    electronAPI: {
      saveNote: (content: string) => Promise<string>;
      loadNote: () => Promise<string>;
    };
  }
}

function App() {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Load note from file
    window.electronAPI.loadNote().then((content) => {
      setNote(content);
    });
  }, []);

  const handleSave = async () => {
    const res = await window.electronAPI.saveNote(note);
    setStatus(res);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Electron IPC Note App</h1>
      <textarea
        rows={10}
        cols={50}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <br />
      <button onClick={handleSave}>💾 Save Note</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
```

---

### ✅ Step 5: Run Your App

```bash
npm run start
```

💥 React app khulega:

- Text likho
- “💾 Save Note” pe click karo
- File save hogi backend (main process) me
- App boot hote hi file load hogi automatically

---

## ✅ Phase 3 Complete 🎉

Tumne sikha:

- `ipcRenderer`, `ipcMain`, `contextBridge`
- React se file write & read
- Secure Electron communication bridge

---

## Create Production `.exe` File Using `electron-builder`\*\*

---

## 🧰 Step 1: Install `electron-builder`

```bash
npm install --save-dev electron-builder
```

---

## 📝 Step 2: Update `package.json`

### 🔧 Add/Modify these scripts:

```json
"scripts": {
  "dev": "vite",
  "start": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\"",
  "build": "vite build",
  "pack": "electron-builder --dir",
  "dist": "electron-builder"
}
```

### 🏷️ Add `build` section:

```json
"build": {
  "appId": "com.deepankar.electronapp",
  "productName": "MyElectronApp",
  "directories": {
    "buildResources": "assets",        // icons folder
    "output": "release"                // final exe output
  },
  "files": [
    "dist/**/*",
    "electron/**/*",
    "preload.js",
    "main.js",
    "package.json"
  ],
  "extraMetadata": {
    "main": "electron/main.js"
  },
  "win": {
    "target": "nsis"
  }
}
```

📁 **Important:**

- Make sure your compiled code is in `dist/`
- Your Electron main file path (e.g. `electron/main.js`) is accurate
- If you have icon, place it in `assets/icon.ico`

---

## 📁 Folder Structure Reference

```
my-electron-app/
├── dist/               ← vite build output
├── electron/
│   ├── main.js
│   └── preload.js
├── assets/
│   └── icon.ico        ← optional (recommended)
├── package.json
```

---

## 🚀 Step 3: Build the App

```bash
npm run build      # Builds React app (dist/)
npm run dist       # Builds Electron + Installer (in release/)
```

> ⚠️ Ye step pe pehli baar thoda time lag sakta hai (30–90 sec)

---

## 🎁 Output:

Agar sab kuch sahi hai, to:

📁 `release/` folder me:

- `.exe` installer file banega (example: `MyElectronApp Setup 1.0.0.exe`)
- Aur ek portable app ve banega

---

## 🧪 Step 4: Test It

1. `release/` folder me jao
2. `.exe` ko double click karo
3. Proper installer open hoga — install and run app ✅

---

## 🛠️ Bonus (Optional):

### 🔸 Customize App Icon

- Add `icon.ico` in `assets/`
- Update build config:

  ```json
  "win": {
    "target": "nsis",
    "icon": "assets/icon.ico"
  }
  ```

---
