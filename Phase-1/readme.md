### DEEPANKAR SAH

---

# ⚡ Electron.js Mastery Roadmap (with React + TypeScript)

## 📚 **Phase 1: Pure Electron.js Basics**

👉 _Yahan ham Electron.js ka core concept sikhenge bina React ke_
📦 **Target:** Build a simple Note Viewer desktop app using HTML + JS + Electron

---

### 🧠 Step 1: What is Electron.js? (Detailed Definition)

> **Electron.js** ek open-source framework hai jo developers ko allow karta hai **cross-platform desktop apps** banane ke liye using **web technologies** like HTML, CSS, and JavaScript.
>
> Ye basically 2 cheezon ko combine karta hai:
>
> - **Chromium** – frontend render karta hai (UI part)
> - **Node.js** – backend & OS-level tasks ke liye (file system, OS access)

---

## ✅ Project 1: Simple Note Viewer App (without React)

### 📁 Folder Structure:

```
note-viewer-app/
├── main.js            # Electron main process
├── index.html         # UI
├── renderer.js        # Renderer logic
├── package.json       # Project config
```

---

### 📦 Step-by-Step Setup:

#### 📌 Step 1: Initialize Project

```bash
mkdir note-viewer-app
cd note-viewer-app
npm init -y
npm install electron --save-dev
```

---

#### 🧠 Step 2: Create `main.js` (Main Process)

// 👉 **main.js**

```js
const { app, BrowserWindow } = require("electron");
const path = require("path");

// 🪟 Creates the main window
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

// 📦 Runs createWindow when app is ready
app.whenReady().then(createWindow);

// 🧹 Mac specific behavior for closing
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
```

---

#### 🖼️ Step 3: Create `index.html`

// 👉 **index.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Note Viewer</title>
  </head>
  <body>
    <h1>📝 My Notes</h1>
    <textarea id="note" rows="10" cols="50"></textarea><br />
    <button onclick="saveNote()">💾 Save Note</button>
    <script src="renderer.js"></script>
  </body>
</html>
```

---

#### ⚙️ Step 4: Create `renderer.js` (Renderer Process)

// 👉 **renderer.js**

```js
const fs = require("fs");
const path = require("path");

// Save note to a file
function saveNote() {
  const noteText = document.getElementById("note").value;
  const filePath = path.join(__dirname, "note.txt");

  fs.writeFile(filePath, noteText, (err) => {
    if (err) {
      alert("❌ Error saving note");
      return;
    }
    alert("✅ Note saved successfully!");
  });
}
```

---

#### 🧠 Step 5: Add Start Script in `package.json`

```json
"scripts": {
  "start": "electron ."
}
```

---

### 🚀 Step 6: Run Your Electron App

```bash
npm start
```

🪟 App window open hoga, text likho, **Save Note** pe click karo — ek `note.txt` file banegi.

---

## 📘 You Just Learned:

- Electron ke **Main & Renderer process**
- `BrowserWindow` ka use
- Node.js ka use in frontend (fs module)
- Event handling

---
