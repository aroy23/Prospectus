import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// change the character limit of title and body here
const TITLELIMIT = 75;
const BODYLIMIT = 500;

const formDataToObject = (formData) => {
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [titleCount, setTitleCount] = useState(0);
  const [bodyCount, setBodyCount] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setTitleCount(newTitle.length);
  };

  const handleBodyChange = (event) => {
    const newBody = event.target.value;
    setBody(newBody);
    setBodyCount(newBody.length);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const isTitleLimitReached = titleCount >= TITLELIMIT;
  const isBodyLimitReached = bodyCount >= BODYLIMIT;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.error("No user logged in");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("userID", user.userId);  // Make sure we're using the correct case
    if (file) {
      formData.append("file", file);
    }

    try {
      console.log("Uploading post with userID:", user.userId);
      const response = await axios.post(
        "http://localhost:8080/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        console.log("Post created successfully:", response.data);
        // Reset form
        setTitle("");
        setBody("");
        setFile(null);
        setTitleCount(0);
        setBodyCount(0);
        // Redirect to posts page
        navigate("/posts");
      }
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      // You might want to show an error message to the user here
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-[url('../images/homebg.png')] bg-cover bg-no-repeat bg-center h-screen w-full px-4">
        <div className="font-sans">
          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto mt-12 bg-local"
          >
            <div className="text-2xl font-bold pb-4">Create Post</div>
            <div className="mb-7">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Title"
                maxLength={TITLELIMIT}
                value={title}
                onChange={handleTitleChange}
                required
              />
              <p
                className={`text-sm ${isTitleLimitReached ? "text-red-500" : "text-gray-500"} mt-1`}
              >
                {titleCount}/{TITLELIMIT} characters
              </p>
            </div>
            <div className="mb-7">
              <label
                htmlFor="body"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Body
              </label>
              <textarea
                id="body"
                className="shadow-sm h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                maxLength={BODYLIMIT}
                value={body}
                onChange={handleBodyChange}
                placeholder="Description"
              />
              <p
                className={`text-sm ${isBodyLimitReached ? "text-red-500" : "text-gray-500"} mt-1`}
              >
                {bodyCount}/{BODYLIMIT} characters
              </p>
            </div>
            <div className="mb-9">
              <label
                htmlFor="resume"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required={bodyCount === 0}
                onChange={handleFileChange}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
