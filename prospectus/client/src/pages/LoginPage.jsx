import React, { useState } from "react";
import Button from "../components/LoginPage/Button.jsx";
import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    accountType: "candidate",
    university: "",
    name: "",
    username: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError("");
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      accountType: "candidate",
      university: "",
      name: "",
      username: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (!isLoginMode) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!formData.agreeToTerms) {
        setError("Please agree to the terms and conditions");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            email: formData.email,
            password: formData.password,
            accountType: formData.accountType,
            university: formData.university,
            name: formData.name,
            username: formData.username,
          }
        );

        if (response.data.token) {
          console.log("User data from registration:", response.data.user);
          // Store the token
          localStorage.setItem("token", response.data.token);
          // Update auth context
          login(response.data.user);
          // Redirect to home page
          navigate("/");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.token) {
          console.log("User data from login:", response.data.user);
          // Store the token
          localStorage.setItem("token", response.data.token);
          // Update auth context
          login(response.data.user);
          // Redirect to home page
          navigate("/");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="font-sans">
        <div className="bg-[url('../images/homebg.png')] h-screen w-full bg-cover bg-no-repeat bg-center">
          <div className="font-bold italic text-8xl tracking-wide pt-12 text-center">
            prospectus
          </div>
          <div className="pt-8 text-2xl italic text-center">
            your resume's new best friend.
          </div>

          {error && (
            <div className="max-w-sm mx-auto mt-4 text-red-600 text-center">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto mt-12 bg-local"
          >
            <div className="mb-9">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your Email:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@ucla.com"
                required
              />
            </div>
            <div className="mb-9">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your Password:
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>

            {!isLoginMode && (
              <>
                <div className="mb-9">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Repeat Password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>

                <div className="mb-9">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Your Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="mb-9">
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

                <div className="mb-9">
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
                  <div className="mb-9">
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

                <div className="flex items-start mb-9">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-white-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="agreeToTerms"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                  </label>
                </div>
              </>
            )}

            <div className="flex-auto">
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isLoginMode ? "Login" : "Register"}
              </button>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                >
                  {isLoginMode
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
