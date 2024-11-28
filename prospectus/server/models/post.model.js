const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "uploads.files",
      required: false,
    },
    fileType: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      default: 0,
      required: false,
    },
    userID: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
