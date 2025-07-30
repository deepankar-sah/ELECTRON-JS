### DEEPANKAR SAH

---

## 🧠 Roadmap to Learn Electron.js with React + TypeScript

We’ll go in **5 phases**:

### ✅ **Phase 1: Electron Basics**

- [x] What is Electron.js (already covered)
- [ ] Set up a bare minimum Electron app
- [ ] Understand `main` and `renderer` processes
- [ ] Add simple HTML interface

### ✅ **Phase 2: Add React + TypeScript**

- [ ] Use **Vite** to create React + TypeScript frontend
- [ ] Connect React app with Electron
- [ ] Add build scripts

### ✅ **Phase 3: Communicate Between Electron & React**

- [ ] Use **IPC (inter-process communication)**
- [ ] Send data from React (renderer) to Electron (main)
- [ ] Access OS-level APIs (like file system)

### ✅ **Phase 4: Packaging App**

- [ ] Use `electron-builder` or `electron-forge` to generate `.exe` / `.dmg`
- [ ] Add app icon, metadata

### ✅ **Phase 5: Final Project**

- [ ] Build a small project (e.g., Notes App, Markdown Editor, or File Explorer)

---

## 🔧 Let's Start Phase 1: Basic Electron Setup

### 📁 Folder Structure:

```
my-electron-app/
├── main.js
├── index.html
├── package.json
```

### 📦 Step 1: Initialize Project

```bash
mkdir my-electron-app && cd my-electron-app
npm init -y
npm install electron --save-dev
```

---

### ✍️ Step 2: Create `main.js` (Main Process)

```js
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
```

---

### 🖼️ Step 3: Create `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Electron App</title>
  </head>
  <body>
    <h1>Hello from Electron</h1>
  </body>
</html>
```

---

### ⚙️ Step 4: Add Start Script in `package.json`

```json
"scripts": {
  "start": "electron ."
}
```

---

### 🚀 Step 5: Run the App

```bash
npm start
```

It should open a native window with "Hello from Electron".

---
