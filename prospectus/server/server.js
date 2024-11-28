const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/post.route.js");
const userRoutes = require("./routes/user.route.js");
const commentRoutes = require("./routes/comment.route.js");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // For parsing application/json requests
app.use("/api/posts", postRoutes); // Using postRoutes for handling post-related routes
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Add this line to serve files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log("Server started on port", process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
