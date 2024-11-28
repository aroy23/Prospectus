const Post = require("../models/post.model.js");
const User = require("../models/user.model.js");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let bucket;
mongoose.connection.once("open", () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
});

// Fetch all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error("Error fetching posts", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, body, userID } = req.body;
    console.log("Creating post with userID:", userID);

    const postData = {
      title,
      body,
      userID,
    };

    // Validate required fields
    if (!title || !body || !userID) {
      return res.status(400).json({
        success: false,
        message: "Title, body, and userID are required",
      });
    }

    // Verify user exists
    const user = await User.findOne({ userId: userID });
    console.log("Found user:", user);
    
    if (!user) {
      console.log("User not found with userID:", userID);
      return res.status(400).json({
        success: false,
        message: "Invalid userID",
      });
    }

    if (req.file) {
      // Create a readable stream from the uploaded file buffer
      const readableStream = require("stream").Readable.from(req.file.buffer);

      // Upload to GridFS
      const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });

      await new Promise((resolve, reject) => {
        readableStream
          .pipe(uploadStream)
          .on("error", reject)
          .on("finish", () => {
            postData.image = uploadStream.id; // Store the GridFS file ID
            postData.fileType = req.file.mimetype; // Store the file type
            resolve();
          });
      });
    }

    const newPost = new Post(postData);
    await newPost.save();
    console.log("Created new post:", newPost);

    // Add the post ID to the user's posts array
    const updatedUser = await User.findOneAndUpdate(
      { userId: userID },
      { $push: { posts: newPost._id } },
      { new: true }
    );
    console.log("Updated user:", updatedUser);

    if (!updatedUser) {
      console.log("Failed to update user's posts array");
    }

    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.error("Error saving post", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(404).json({ success: false, message: "Post not found" });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;  // Get userId from request body

    // Find the user
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find the post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Check if user has already liked the post
    if (user.likedPosts.includes(post._id)) {
      return res.status(400).json({ success: false, message: "Post already liked" });
    }

    // Add post to user's liked posts
    user.likedPosts.push(post._id);
    await user.save();

    // Increment post likes
    post.likes = (post.likes || 0) + 1;
    await post.save();

    // Fetch complete post data with user info
    const postUser = await User.findOne({ userId: post.userID });
    const postWithUser = {
      ...post.toObject(),
      user: postUser ? {
        name: postUser.name,
        username: postUser.username,
        profilePic: postUser.profilePic
      } : null,
      isLiked: true
    };

    res.status(200).json({ success: true, data: postWithUser });
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Unlike a post
const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;  // Get userId from request body

    // Find the user
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find the post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Check if user has liked the post
    if (!user.likedPosts.includes(post._id)) {
      return res.status(400).json({ success: false, message: "Post not liked yet" });
    }

    // Remove post from user's liked posts
    user.likedPosts = user.likedPosts.filter(postId => !postId.equals(post._id));
    await user.save();

    // Decrement post likes
    post.likes = Math.max(0, (post.likes || 0) - 1);
    await post.save();

    // Fetch complete post data with user info
    const postUser = await User.findOne({ userId: post.userID });
    const postWithUser = {
      ...post.toObject(),
      user: postUser ? {
        name: postUser.name,
        username: postUser.username,
        profilePic: postUser.profilePic
      } : null,
      isLiked: false
    };

    res.status(200).json({ success: true, data: postWithUser });
  } catch (err) {
    console.error("Error unliking post:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add this new route to serve files
const getFile = async (req, res) => {
  try {
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(req.params.id) })
      .toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    res.set("Content-Type", file[0].contentType);
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.id)
    );
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a post by ID
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query; // Get userId from query params

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Fetch the user information
    const postUser = await User.findOne({ userId: post.userID });
    
    // Check if the requesting user has liked this post
    let isLiked = false;
    if (userId) {
      const user = await User.findOne({ userId });
      if (user) {
        isLiked = user.likedPosts.includes(post._id);
      }
    }

    const postWithUser = {
      ...post.toObject(),
      user: postUser ? {
        name: postUser.name,
        username: postUser.username,
        profilePic: postUser.profilePic
      } : null,
      isLiked
    };

    res.status(200).json({ success: true, data: postWithUser });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get posts by user ID
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find the user first
    const user = await User.findOne({ userId }).populate('posts');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get the posts with user information
    const posts = await Post.find({ _id: { $in: user.posts } }).sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      data: {
        posts,
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
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  getFile,
  getUserPosts,
};
