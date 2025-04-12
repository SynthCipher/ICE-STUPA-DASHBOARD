import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import axios from "axios";

const Login = () => {
  const {
    backendUrl,
    navigate,
    setToken,
    setUserRole,
    setUserData,
    checkAuthStatus,
  } = useContext(AppContext);

  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [loginType, setLoginType] = useState("admin"); // Default to admin login
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on component mount
  useEffect(() => {
    // If user is already logged in, redirect
    if (checkAuthStatus()) {
      // Redirect to home page or dashboard based on role
      navigate("/");
      toast.info("Already logged in");
    }
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!identifier || !password) {
      toast.error(
        loginType === "admin"
          ? "Email and password are required!"
          : "Username and password are required!"
      );
      setIsLoading(false);
      return;
    }

    try {
      // Different API endpoints based on login type
      const endpoint =
        loginType === "admin"
          ? "/api/auth/admin/login"
          : "/api/auth/user/login";

      // Different payload based on login type
      const payload =
        loginType === "admin"
          ? { email: identifier, password }
          : { userName: identifier, password };

      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        // console.log(data);
        toast.success(data.message);

        // Store token and user role
        setToken(data.token);
      
        setUserRole(loginType === "admin" ? "admin" : "supervisor"); // Set user role in context
        setUserData(data.user); // Store user data in context

        // Store in localStorage for persistence
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "userRole",
          loginType === "admin" ? "admin" : "supervisor"
        );
        localStorage.setItem("userData", JSON.stringify(data.user));

        // Redirect based on login type
        // navigate("/locations");
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset identifier field when switching login types
  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setIdentifier(""); // Clear the identifier field when switching
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 mb-12 rounded-2xl flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg rounded-lg sm:px-10 border border-cyan-200">
          <form onSubmit={onSubmitHandler}>
            <div className="flex justify-center">
              <img
                onClick={() => navigate("/")}
                src={assets.logo}
                alt="Logo"
                className="h-20 cursor-pointer"
              />
            </div>

            <p className="text-center mt-1 text-2xl font-medium text-cyan-800">
              Ice Stupa Project
            </p>

            {/* Login Type Selector */}
            <div className="flex mt-4 border rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => handleLoginTypeChange("admin")}
                className={`flex-1 py-2 cursor-pointer text-sm font-medium ${
                  loginType === "admin"
                    ? "bg-cyan-600 text-white"
                    : "bg-white text-cyan-700 hover:bg-cyan-50"
                } transition-colors duration-150`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleLoginTypeChange("supervisor")}
                className={`flex-1 py-2 text-sm  cursor-pointer font-medium ${
                  loginType === "supervisor"
                    ? "bg-cyan-600 text-white"
                    : "bg-white text-cyan-700 hover:bg-cyan-50"
                } transition-colors duration-150`}
              >
                Local Supervisor
              </button>
            </div>

            <div className="mt-6">
              <input
                name="identifier"
                type={loginType === "admin" ? "email" : "text"}
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder={
                  loginType === "admin" ? "admin@example.com" : "username"
                }
              />
            </div>

            <div className="mt-4">
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex cursor-pointer mt-6 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-150 disabled:opacity-70"
            >
              {isLoading
                ? "Signing in..."
                : loginType === "admin"
                ? "Sign in as Admin"
                : "Sign in as Local Supervisor"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {loginType === "admin"
                    ? "Admin Access"
                    : "Local Supervisor Access"}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Ice Stupa Automation Project © {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
