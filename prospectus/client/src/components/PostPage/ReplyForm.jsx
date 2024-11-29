import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function ReplyForm({ postID, parentCommentID, onReply }) {
  const [replyText, setReplyText] = useState("");
  const { user } = useAuth();

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !user) return;

    try {
      const response = await axios.post("http://localhost:8080/api/comments", {
        text: replyText,
        postID: postID,
        username: user.username,
        parentCommentID: parentCommentID,
      });

      if (response.data.success) {
        onReply(response.data.data);
        setReplyText("");
      }
    } catch (err) {
      console.error("Error posting reply:", err.response?.data || err);
      alert(
        "Error posting reply: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <form onSubmit={handleReplySubmit} className="mt-4">
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write a reply..."
        className="w-full p-2 border rounded-lg mb-2"
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!replyText.trim()}
      >
        Post Reply
      </button>
    </form>
  );
}
