const express = require("express");
const router = express.Router();
const {
  getComments,
  getPostComments,
  createComment,
  deleteComment,
} = require("../controllers/comment.controller.js");

router.get("/", getComments);

router.get("/post/:postId", getPostComments);

router.post("/", createComment);

router.delete("/:id", deleteComment);

module.exports = router;
