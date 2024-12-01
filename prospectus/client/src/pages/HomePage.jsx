import React, { useState, useEffect } from "react";
//import Homenavbar from "../components/HomePage/Homenavbar.jsx";

import Navbar from "./Navbar.jsx";
import axios from "axios";
import { API_BASE_URL } from "../config";

import PostCard from "../components/PostCard";
import Sidebar from "./sidebar.jsx";

import Pin from "../images/pin.png"

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        if (response.data.success) {
          setPosts(response.data.data);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  const getDailyPost = (posts) => {
    const currentDate = new Date().toISOString().split('T')[0]; /* "YYYY-MM-DD" The string produced by toISOSTRING() is 2024-11-30T15:00:00.000Z. 
    So that's why we split by T and take the 0 index. */

    // get the saved date from localStorage
    const savedDate = localStorage.getItem('featuredPostDate');

    // check if the saved date is different from the current date
    if (savedDate !== currentDate) {

      // pick a random post if its a new day
      const randomPost = posts[Math.floor(Math.random() * posts.length)];

      // save the current date and the selected post's ID to localStorage
      localStorage.setItem('featuredPostDate', currentDate);
      localStorage.setItem('featuredPostId', randomPost._id);

      return randomPost;
    } else {
      // If it's the same day, get the previously saved post
      const savedPostId = localStorage.getItem('featuredPostId');
      const savedPost = posts.find(post => post._id === savedPostId);

      return savedPost;
    }
  };

  const dailyPost = getDailyPost(posts);

  return (

    <div
      style={{ userSelect: "none" }}
      className="bg-[url('../images/bea.jpg')] pt-10 overflow-x-hidden"
    >

      <div className="flex justify-between items-start px-4">

        {/* Left Post: The post generated by sidebar */}
        <div className="w-[100%] mr-80">
          <Sidebar />
        </div>

        {/* Right Post: Today's Featured Post */}


        <div className="flex justify-start items-start w-full min-h-screen">
          <div className="grid grid-cols-1 px-4">
            <h1 className="text-3xl text-center text-white font-bold drop-shadow-m animate-bounce">
              <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                Today's Featured Post 📰
              </span>
            </h1>


            <div style={{ position: 'relative', width: '100%' }}>

              <PostCard key={dailyPost._id} post={dailyPost} />

              {/* Pin image on top left*/}
              <img
                src={Pin}
                alt="Pin"
                style={{
                  position: 'absolute',
                  top: '0%',
                  left: '0%',
                  width: '15%',
                  pointerEvents: 'none'  // so the pin doesn't block interactions with the post !
                }}
              />

              {/* Pin image on top right*/}
              <img
                src={Pin}
                alt="Pin"
                style={{
                  position: 'absolute',
                  top: '1%',
                  left: '84%',
                  width: '15%',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        </div>

      </div>

      <Navbar />

    </div>
  );

}

export default HomePage;
