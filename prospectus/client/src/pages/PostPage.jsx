import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import {
  tags,
  getAverageRating,
  getStars,
  randomInt,
  generateReview,
  allProfiles,
  allPosts,
  allReviews,
} from "../utility.jsx";
import { Heart, MessageCircle, Plus, X } from "lucide-react";
import { formatDistance } from "date-fns";
import Review from "../components/PostPage/Review";
import DropdownMenu from "../components/PostPage/DropdownMenu";
import axios from "axios";

export default function PostPage() {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [reviewFormShown, setReviewFormShown] = useState(false);
  const [inputText, setInputText] = useState("");
  const [dropdownShown, setDropdownShown] = useState(false);
  const [sortBy, setSortBy] = useState("Most recent");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/posts/${postID}`
        );
        if (response.data.success) {
          setPost(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postID]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/comments/post/${postID}`
        );
        if (response.data.success) {
          setComments(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [postID]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await axios.post("http://localhost:8080/api/comments", {
        text: commentText,
        postId: postID,
        userId: "user123", // Replace with actual user ID from auth
      });

      if (response.data.success) {
        setComments([response.data.data, ...comments]);
        setCommentText("");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!inputText) return;

    try {
      const response = await axios.post("http://localhost:8080/api/comments", {
        text: inputText,
        postId: postID,
        userId: "user123", // Replace with actual user ID from auth
      });

      if (response.data.success) {
        setComments([response.data.data, ...comments]);
        setInputText("");
        setReviewFormShown(false);
      }
    } catch (err) {
      console.error("Error posting review:", err);
    }
  };

  const renderComments = () => (
    <div className="mt-8">
      <div className="mb-4">
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="p-4 border rounded-lg">
            <p className="text-sm text-gray-600">@{comment.userID}</p>
            <p>{comment.text}</p>
            <p className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading || !post) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  // Temporary mock data for profile and reviews until we implement those features
  const profile = {
    name: "User",
    username: post.userID,
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
  };

  return (
    <div>
      <Navbar />
      <div className="flex gap-8 m-8 justify-center">
        <div className="flex flex-col items-center">
          <div className="avatar mb-2 cursor-pointer">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src={profile.avatar} alt="Profile" />
            </div>
          </div>
          {profile.name}
          <p className="text-gray-500">@{profile.username}</p>
          <div>
            <p className="text-gray-500 mb-4">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Heart
                size={36}
                absoluteStrokeWidth
                className={`cursor-pointer marker:hover:text-red-400 ${
                  liked && "text-red-500"
                }`}
                onClick={() => {
                  setPost((prevPost) => ({
                    ...prevPost,
                    likes: prevPost.likes + (liked ? -1 : 1),
                  }));
                  setLiked(!liked);
                }}
              />
              {post.likes}
            </div>
            <div className="flex gap-2 items-center">
              <MessageCircle
                size={36}
                absoluteStrokeWidth
                className="cursor-pointer"
              />
              {comments.length}
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <h1 className="text-3xl mb-2">{post.title}</h1>
          <div className="mb-2">{post.body}</div>
          {post.image && (
            <div className="bg-gray-200 min-h-64 flex justify-center items-center">
              {post.fileType === "application/pdf" ? (
                <embed
                  src={`http://localhost:8080/api/posts/file/${post.image}`}
                  type="application/pdf"
                  className="w-full h-[600px]"
                />
              ) : (
                <img
                  src={`http://localhost:8080/api/posts/file/${post.image}`}
                  alt={post.title}
                  className="max-w-full"
                />
              )}
            </div>
          )}
          {renderComments()}
        </div>
      </div>
      <div className="w-11/12 mx-auto h-px bg-gray-500"></div>
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center">
          <div className={reviewFormShown && "invisible"}>
            <DropdownMenu
              sortBy={sortBy}
              setSortBy={setSortBy}
              dropdownShown={dropdownShown}
              setDropdownShown={setDropdownShown}
            />
          </div>
          <button
            className="btn"
            onClick={() => {
              setReviewFormShown(!reviewFormShown);
              setInputText("");
            }}
          >
            {reviewFormShown ? (
              <div className="flex items-center gap-2">
                Cancel
                <X />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Add a review
                <Plus />
              </div>
            )}
          </button>
        </div>
        {reviewFormShown && (
          <div>
            <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow">
              <form onSubmit={handleReviewSubmit}>
                <h1 className="text-2xl mb-2">Add a review</h1>
                <div className="rating rating-md mb-4">
                  {[1, 2, 3, 4].map((value) => (
                    <input
                      key={value}
                      type="radio"
                      name="rating-8"
                      value={value}
                      className="mask mask-star-2"
                    />
                  ))}
                  <input
                    type="radio"
                    name="rating-8"
                    value={5}
                    className="mask mask-star-2"
                    defaultChecked
                  />
                </div>
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="p-2 border rounded-lg w-full mb-4"
                  placeholder="Review"
                />
                <button type="submit" className="btn">
                  Post
                </button>
              </form>
            </div>
            <div>
              <DropdownMenu
                sortBy={sortBy}
                setSortBy={setSortBy}
                dropdownShown={dropdownShown}
                setDropdownShown={setDropdownShown}
              />
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="w-64 h-auto border-2 p-4 rounded-lg"
            >
              <p className="mb-2">{comment.text}</p>
              <div className="text-sm text-gray-600">
                <p>@{comment.userID}</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
