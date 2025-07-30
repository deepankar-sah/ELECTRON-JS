import { useEffect, useState } from "react";

function App() {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  // App start hote hi file load karo (from main process)
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.loadNote().then((content) => {
        setNote(content);
      });
    }
  }, []);

  const handleSave = async () => {
    if (window.electronAPI) {
      const res = await window.electronAPI.saveNote(note);
      setStatus(res);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Electron Note Saver</h1>

      <textarea
        rows={10}
        cols={50}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your note here..."
      />

      <br />
      <button onClick={handleSave}>💾 Save Note</button>
      <p style={{ color: "green" }}>{status}</p>
    </div>
  );
}

export default App;
