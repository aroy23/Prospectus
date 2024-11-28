const Comment = require("../models/comment.model.js");
const Post = require("../models/post.model.js");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    console.error("Error fetching comments", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get comments for a specific post
const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postID: postId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    console.error("Error fetching comments", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const createComment = async (req, res) => {
  const { text, postId, userId } = req.body;

  if (!text || !postId || !userId) {
    return res.status(400).json({
      success: false,
      message: "Text, postId, and userId are required",
    });
  }

  try {
    const newComment = new Comment({
      text,
      postID: postId,
      userID: userId,
    });

    const savedComment = await newComment.save();

    // Add comment to post's comments array
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json({ success: true, data: savedComment });
  } catch (err) {
    console.error("Error saving comment", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (err) {
    res.status(404).json({ success: false, message: "Comment not found" });
  }
};

module.exports = {
  getComments,
  getPostComments,
  createComment,
  deleteComment,
};
