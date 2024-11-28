const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const user = new User(req.body);

  if (!user.name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      userId: req.params.userId,
    });
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's posts
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Getting posts for user:", userId);
    
    // Find the user and populate their posts
    const user = await User.findOne({ userId }).populate({
      path: 'posts',
      options: { sort: { createdAt: -1 } }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Found user with posts:", user);

    res.status(200).json({ 
      success: true, 
      data: {
        posts: user.posts,
        user: {
          name: user.name,
          username: user.username,
          profilePic: user.profilePic
        }
      }
    });
  } catch (err) {
    console.error("Error fetching user posts", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { 
  getAllUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser, 
  getUserPosts 
};
