import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Logo1 from "../images/logo1.png";

export default function Navbar() {
  const { isAuthenticated, logout , user} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 z-10 ">
      <div className="flex-1">

        <img className="w-16" src = {Logo1} draggable="false"/>
        <Link className="btn btn-ghost text-amber-500 font-bold italic text-2xl tracking-wide" to="/">
          prospectus
        </Link>
      </div>
      <div className="flex-none gap-2 ">
        {isAuthenticated && (
          <Link to="/upload" className="btn btn-ghost btn-sm">
            Upload Post
          </Link>
        )}
        <div className="form-control ">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto border-gray-600"
          />
        </div>
        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ">
              <img 
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                to={`/profile/${user?.username}`}
                className="justify-between"
              >
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/upload">Upload Post</Link>
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        
        {isAuthenticated ? (
          <button onClick={handleLogout} className="btn btn-primary bg-blue-300 hover:bg-sky-500 border-gray-600 ">
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary bg-sky-300 hover:bg-sky-500 border-gray-800">
            Login
          </Link>
        )}
      </div>
    </div>
  );
  
}
