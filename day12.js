
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());


let todos = [
  { id: 1, text: "Learn HTML" },
  { id: 2, text: "Build ToDo App" },
];




app.get("/api/todos", (req, res) => {
  res.json(todos);
});


app.post("/api/todos", (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text };
  todos.push(newTodo);
  res.json(newTodo);
});


app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ success: true });
});



app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>To-Do App</title>
      <style>
        body { font-family: Arial; max-width: 500px; margin: 2rem auto; }
        h1 { color: #333; }
        input { padding: 0.5rem; width: 70%; }
        button { padding: 0.5rem 1rem; margin-left: 0.5rem; }
        ul { list-style: none; padding: 0; }
        li { display: flex; justify-content: space-between; background: #f1f1f1; margin: 0.3rem 0; padding: 0.5rem; }
        .delete { background: red; color: white; border: none; cursor: pointer; }
      </style>
    </head>
    <body>
      <h1>📝 To-Do App</h1>
      <div>
        <input type="text" id="todoInput" placeholder="Enter new task" />
        <button onclick="addTodo()">Add</button>
      </div>
      <ul id="todoList"></ul>

      <script>
        async function fetchTodos() {
          const res = await fetch('/api/todos');
          const data = await res.json();
          const list = document.getElementById('todoList');
          list.innerHTML = '';
          data.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = todo.text + '<button class="delete" onclick="deleteTodo(' + todo.id + ')">Delete</button>';
            list.appendChild(li);
          });
        }

        async function addTodo() {
          const input = document.getElementById('todoInput');
          if (!input.value) return;
          await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content
