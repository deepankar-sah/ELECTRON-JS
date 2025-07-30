**🔰 Phase 4: Create Production `.exe` File Using `electron-builder`**

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

## ✅ Phase 4 Summary:

| Task                        | Status |
| --------------------------- | ------ |
| Install electron-builder    | ✅     |
| Update package.json scripts | ✅     |
| Create `dist/` via Vite     | ✅     |
| Run `npm run dist`          | ✅     |
| Output `.exe` ready         | ✅     |

---
