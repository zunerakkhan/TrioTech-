import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;
const JWT_SECRET = "mySecretKey"; // ⚠️ Use env variable in production

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error(err));

// Schema + Model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// ------------------- AUTH ROUTES -------------------

// Register
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashed });
  await newUser.save();

  res.json({ message: "User registered ✅" });
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Protected route
app.get("/api/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: `Welcome ${decoded.username}! 🔒 Protected data accessed.` });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// ------------------- FRONTEND -------------------
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Auth App</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 400px; margin: 20px auto; }
    h1 { text-align: center; }
    input, button { width: 100%; padding: 10px; margin: 6px 0; }
    .success { color: green; }
    .error { color: red; }
  </style>
</head>
<body>
  <h1>🔐 Login</h1>
  <form id="loginForm">
    <input type="text" id="username" placeholder="Username" required />
    <input type="password" id="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
  <button onclick="fetchProtected()">Access Protected</button>
  <button onclick="logout()">Logout</button>
  <p id="message"></p>

  <script>
    const API = "/api";
    let token = localStorage.getItem("token") || "";

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const res = await fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.token) {
        token = data.token;
        localStorage.setItem("token", token);
        document.getElementById("message").innerText = "✅ Login Successful!";
        document.getElementById("message").className = "success";
      } else {
        document.getElementById("message").innerText = "❌ " + data.message;
        document.getElementById("message").className = "error";
      }
    });

    async function fetchProtected() {
      const res = await fetch(API + "/protected", {
        headers: { "Authorization": token }
      });
      const data = await res.json();
      document.getElementById("message").innerText = data.message;
    }

    function logout() {
      localStorage.removeItem("token");
      token = "";
      document.getElementById("message").innerText = "✅ Logged out!";
    }
  </script>
</body>
</html>
  `);
});

