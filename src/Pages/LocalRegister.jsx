import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { ArrowLeft, Loader } from "lucide-react";

const LocalRegister = () => {
  const { backendUrl, navigate, token, isAdmin } = useContext(AppContext);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    createdBy: "ADMIN JIGMAT",
    role: "supervisor", // Default to supervisor
  });

  const [isLoading, setIsLoading] = useState(false);

  // Check if user has token and is admin, redirect if not
  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!isAdmin()) {
      toast.error("Only admins can access this page");
      navigate("/");
    }
  }, [token, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/register`,
        {
          fullName: formData.fullName,
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          location: formData.location,
          role: formData.role,
          createdBy: formData.createdBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(
          `${
            formData.role === "admin" ? "Admin" : "Local supervisor"
          } registered successfully`
        );
        // Reset form
        setFormData({
          fullName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          location: "",
          role: "supervisor",
        });
        // Optionally redirect to users list
        navigate("/");
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scroll
          });
        }, 100);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Registration failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl flex flex-col py-10 px-6 lg:px-8 mb-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg rounded-lg sm:px-10 border border-cyan-200">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer text-cyan-600 hover:text-cyan-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>

          <div className="flex justify-center">
            <img
              src={assets.logo}
              alt="Logo"
              className="h-16 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          <h2 className="mt-4 text-center text-2xl font-medium text-cyan-800">
            Register New User
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Create a new account for an admin or local site supervisor
          </p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-cyan-700"
              >
                User Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              >
                <option value="supervisor">Local Supervisor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-cyan-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-cyan-700"
              >
                Username
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                value={formData.userName}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="johndoe123"
              />
              <p className="mt-1 text-xs text-gray-500">
                Username must be unique and will be used for login
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-cyan-700"
              >
                Email Address (Optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-cyan-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-cyan-700"
              >
                {formData.role === "admin"
                  ? "Office Location"
                  : "Site Location"}
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder={
                  formData.role === "admin"
                    ? "Enter office location"
                    : "Enter site location"
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-cyan-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-cyan-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex cursor-pointer justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-150 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Registering...
                  </span>
                ) : (
                  `Register ${
                    formData.role === "admin" ? "Admin" : "Local Supervisor"
                  }`
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Admin Only Access
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

export default LocalRegister;
