import React from "react";
import { useState } from "react";
import Swal from 'sweetalert2'

import LoginButton from "../components/RegisterPage/LoginButton.jsx";
import Registernavbar from "../components/RegisterPage/Registernavbar.jsx"
import Terms from "../components/RegisterPage/Terms.jsx"

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

import Logo1 from "../images/logo1.png"
import Logo2 from "../images/logo2.png"
import { ClipboardPenLine } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { BicepsFlexed } from 'lucide-react';
import { BadgeDollarSign } from 'lucide-react';


function RegisterPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    agreeToTerms: false,
    accountType: "candidate",
    university: "",
    username: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setError(""); // Clear any previous errors

    // Logic for registration
    if (formData.password !== formData.repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        text: "Please check your password entries.",
      });
      setError("Passwords do not match!");
      return;
    }
    else {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Redirecting you...'
      })

    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        email: formData.email,
        password: formData.password,
        repeatPassword: formData.repeatPassword,
        agreeToTerms: formData.agreeToTerms,
        accountType: formData.accountType,
        university: formData.university,
        username: formData.username,

      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        login(response.data.user);
        navigate("/");  // Redirect to home page!
      }
    } catch (err) {
      setError("Registration failed");
    }

  };


  return (
    <div style={{ userSelect: "none" }}>
      <Registernavbar />

      <div className="font-sans">


        <div class="bg-[url('../images/homebg.png')]  w-full bg-cover bg-no-repeat bg-center">


          <div className="  text-amber-500 font-bold italic text-8xl tracking-wide pt-12 text-center ">
            prospectus
          </div>
          <div className="animate-pulse pt-8 text-2xl italic text-center">
            {" "}
            your resume's new best friend.
          </div>


          {/* email and password form */}


          <img src={Logo1} className="absolute animate-bounce  p-0 border-0 left-0  mt-12 max-w-full h-auto" alt="Positioned Image" draggable="false" />
          <img src={Logo2} className="absolute animate-bounce  p-0 border-0 right-0  mt-12 max-w-full h-auto" alt="Positioned Image" draggable="false" />


          <form onSubmit={handleSubmit} class=" relative max-w-sm mx-auto mt-12 bg-local">

            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your Email:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email} // The value of the user's email
                onChange={handleInputChange} // Capture input


                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@ucla.com"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your Password:
              </label>


              <input
                type="password"
                id="password"
                value={formData.password} // The value of the user's password.
                onChange={handleInputChange} // Capture input


                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="repeat-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Repeat Password:
              </label>
              <input
                type="password"
                id="repeatPassword"
                value={formData.repeatPassword} // The value of the user's repeated password.
                onChange={handleInputChange} // Capture input


                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />


            </div>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="johndoe123"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="accountType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Account Type:
              </label>
              <select
                id="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              >
                <option value="candidate">Candidate</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>


            {formData.accountType === "candidate" && (
              <div className="mb-6">
                <label
                  htmlFor="university"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  University:
                </label>
                <input
                  type="text"
                  id="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="e.g., UCLA"
                />
              </div>
            )}


            <div class="right-30 flex items-start mb-6">
              <div class="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  type="checkbox"


                  checked={formData.agreeToTerms} // Whether or not the user checked the box
                  onChange={handleInputChange} // Capture checkbox state
                  class="w-4 h-4  border border-gray-300 rounded bg-white focus:ring-3 focus:ring-cyan-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-white-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>


              <label
                htmlFor="terms"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                <Terms />
              </label>
            </div>


            <div className="flex">
              
              <button   // REGISTER BUTTON
                type="submit"
                className="btn btn-primary w-50 h-10 text-white ml-15 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-500 dark:hover:bg-cyan-600 ">
                Register new account
              </button>


              {/* This button allows users to navigate to the login page, if they already have an account and don't want to register a new one. */}
              <LoginButton />
            </div>
          </form>


        </div>


        <div className="mt-12 bg-white text-black">


          <h1 className=" text-center mt-8 text-7xl text-cyan-600 font-semibold"> Not a member yet?</h1>
          <p className="text-center mt-8 mb-10 text-2xl font-semibold ">Boost your career search with Prospectus!</p>




          <div className="flex justify-left p-8" alt="Reasons">


            <div className="mb-10 " alt="Reason1">
              <ClipboardPenLine size={64} color="#1ed5f6" />
              <p className="ml-4 text-2xl font-medium "> Tailored Suggestions:  <br /> <p className="mt-1 text-xl font-normal">  Learn how to customize your resume for particular job applications, increasing your chances of standing out. </p> </p>
            </div>


            <div alt="Reason2">
              <UserCheck size={64} color="#b456e9" />
              <p className="ml-4 text-2xl font-medium "> Expert Feedback: <br /> <p className="mt-1 text-xl font-normal">  Receive guidance from professionals, and get insights on formatting, grammar, and tailoring your resume for specific industries. </p> </p>
            </div>


            <div alt="Reason3">
              <BadgeDollarSign size={64} color="#43e654" />
              <p className="ml-4 text-2xl font-medium "> Affordable and Accessible: <br /> <p className="mt-1 text-xl font-normal"> Our resume reviewer app provide cost-effective options compared to hiring a professional resume writer. </p> </p>
            </div>


            <div alt="Reason4">
              <BicepsFlexed size={64} color="#f7be4c" />
              <p className="ml-4 text-2xl font-medium "> Stay Competitive: <br /> <p className="mt-1 text-xl font-normal">  Learn about trends in resume writing to stay up-to-date in an ever-evolving job market. </p> </p>
            </div>

          </div>
        </div>

      </div>


    </div>


  );
}


export default RegisterPage;



