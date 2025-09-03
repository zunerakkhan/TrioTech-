import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/notesApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error(err));

// Schema + Model
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

// ------------------- API ROUTES -------------------
// Get all notes
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Create note
app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  await newNote.save();
  res.json(newNote);
});

// Update note
app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
  res.json(updatedNote);
});

// Delete note
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ message: "Note deleted" });
});

// ------------------- FRONTEND -------------------
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notes App</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; }
    h1 { text-align: center; }
    form { margin-bottom: 20px; }
    input, textarea { width: 100%; padding: 8px; margin: 5px 0; }
    button { padding: 8px 12px; margin-top: 8px; }
    .note { border: 1px solid #ccc; padding: 10px; margin: 8px 0; border-radius: 5px; }
    .actions { margin-top: 5px; }
    .edit { background: orange; color: white; border: none; padding: 5px 8px; margin-right: 5px; }
    .delete { background: red; color: white; border: none; padding: 5px 8px; }
  </style>
</head>
<body>
  <h1>📝 Notes App</h1>
  <form id="noteForm">
    <input type="text" id="title" placeholder="Title" required />
    <textarea id="content" placeholder="Content" required></textarea>
    <button type="submit">Add Note</button>
  </form>
  <div id="notes"></div>

  <script>
    const API_URL = "/api/notes";
    let editId = null;

    async function fetchNotes() {
      const res = await fetch(API_URL);
      const notes = await res.json();
      const notesDiv = document.getElementById("notes");
      notesDiv.innerHTML = "";
      notes.forEach(note => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = \`
          <h3>\${note.title}</h3>
          <p>\${note.content}</p>
          <div class="actions">
            <button class="edit" onclick="editNote('\${note._id}', '\${note.title}', '\${note.content}')">Edit</button>
            <button class="delete" onclick="deleteNote('\${note._id}')">Delete</button>
          </div>
        \`;
        notesDiv.appendChild(div);
      });
    }

    document.getElementById("noteForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;

      if (editId) {
        await fetch(\`\${API_URL}/\${editId}\`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content })
        });
        editId = null;
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content })
        });
      }

      document.getElementById("noteForm").reset();
      fetchNotes();
    });

    async function deleteNote(id) {
      await fetch(\`\${API_URL}/\${id}\`, { method: "DELETE" });
      fetchNotes();
    }

    function editNote(id, title, content) {
      document.getElementById("title").value = title;
      document.getElementById("content").value = content;
      editId = id;
    }

    fetchNotes();
  </script>
</body>
</html>
  `);
});

