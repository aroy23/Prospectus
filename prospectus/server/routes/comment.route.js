const express = require("express");
const router = express.Router();
const {
  getComments,
  createComment,
  deleteComment,
  getCommentByID,
  patchCommentReplies,
} = require("../controllers/comment.controller.js");

router.get("/", getComments);
router.get("/:id", getCommentByID);
router.post("/", createComment);
router.delete("/:id", deleteComment);
router.patch("/:id/replies", patchCommentReplies);

module.exports = router;
