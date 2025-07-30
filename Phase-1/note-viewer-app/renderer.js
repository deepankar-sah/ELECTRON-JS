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
