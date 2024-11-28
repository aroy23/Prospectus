const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/post.route.js");
const userRoutes = require("./routes/user.route.js");
const commentRoutes = require("./routes/comment.route.js");
const authRoutes = require("./routes/auth.route.js");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

// Configure CORS to allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Vite's default port
    credentials: true,
  })
);

app.use(express.json()); // For parsing application/json requests
app.use("/api/posts", postRoutes); // Using postRoutes for handling post-related routes
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes); // Add authentication routes

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Add this line to serve files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
