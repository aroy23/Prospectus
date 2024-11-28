const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:userId", getUser);

// Create a new user
router.post("/", createUser);

// Update a user by ID
router.patch("/:userId", updateUser);

// Delete a user by ID
router.delete("/:userId", deleteUser);

module.exports = router;