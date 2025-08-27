const express = require("express");
const app = express();

const students = ["Ayesha Khan", "Zunera Khan", "Ali Ahmed", "Sara Fatima"];

// Route to show student list
app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/students");
});

