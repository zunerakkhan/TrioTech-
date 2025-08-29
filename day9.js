// ===== BACKEND: server.js =====
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data (resets when server restarts)
let students = [
  { id: 1, name: "Ayesha Khan", course: "CSE", year: "1st Year" },
  { id: 2, name: "Rahul Sharma", course: "ECE", year: "2nd Year" }
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// POST add new student
app.post("/students", (req, res) => {
  const { name, course, year } = req.body;
  if (!name || !course || !year) {
    return res.status(400).json({ error: "All fields required" });
  }
  const newStudent = { id: Date.now(), name, course, year };
  students.push(newStudent);
  res.json(newStudent);
});

// DELETE student by ID
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.json({ message: "Deleted successfully" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);
