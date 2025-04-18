import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import {
  User,
  Save,
  ArrowLeft,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Shield,
} from "lucide-react";

const EditUser = () => {
  const { navigate, isAdmin, token, backendUrl } = useContext(AppContext);

  const { id } = useParams(); // Get user ID from URL
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    location: "",
    role: "supervisor",
    isLocal: false,
    active: true,
  });


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
      return;
    }

    // Find user in allUsers state
    if (allUsers && allUsers.length > 0) {
      loadUserFromState();
    } else {
      // If allUsers is not available, fetch all users first
      fetchAllUsers();
    }
  }, [token, isAdmin, navigate, allUsers, id]);

  const fetchAllUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(backendUrl + "/api/sites/allUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setAllUsers(data.users);
        // Find user after fetching all users
        const foundUser = data.users.find((user) => user._id === id);
        if (foundUser) {
          setUser(foundUser);
          populateFormData(foundUser);
        } else {
          toast.error("User not found");
          navigate("/users");
        }
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserFromState = () => {
    const foundUser = allUsers.find((user) => user._id === id);
    if (foundUser) {
      setUser(foundUser);
      populateFormData(foundUser);
    } else {
      toast.error("User not found");
      navigate("/users");
    }
    setIsLoading(false);
  };

  const populateFormData = (userData) => {
    setFormData({
      fullName: userData.fullName || "",
      userName: userData.userName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      location: userData.location || "",
      role: userData.role || "supervisor",
      isLocal: userData.isLocal || false,
      active: userData.active !== undefined ? userData.active : true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  const validateForm = () => {
    // Check required fields
    if (
      !formData.fullName ||
      !formData.userName ||
      !formData.phone ||
      !formData.location
    ) {
      toast.error("Please fill all required fields");
      return false;
    }

    // Validate email format if provided
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }


    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setIsSaving(true);
      let dataToSubmit = { ...formData };

      // Call API to update user
      const { data } = await axios.put(
        `${backendUrl}/api/auth/user/${id}`,
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        // Update the user in allUsers state
        const updatedUsers = allUsers.map((user) =>
          user._id === id ? { ...user, ...formData } : user
        );
        setAllUsers(updatedUsers);

        toast.success("User updated successfully");
        navigate("/all-users"); // Redirect to users list
      } else {
        toast.error(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        const { data } = await axios.delete(`${backendUrl}/api/auth/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          // Remove user from allUsers state
          const updatedUsers = allUsers.filter((user) => user._id !== id);
          setAllUsers(updatedUsers);

          toast.success("User deleted successfully");
          navigate("/all-users"); // Redirect to users list
        } else {
          toast.error(data.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/all-users")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Edit User: {user?.fullName}</h1>
        </div>

        <button
          onClick={handleDeleteUser}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Delete User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
                Basic Information
              </h2>
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            {/* <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                />
              </div>
            </div> */}

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <Phone className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                  required
                />
              </div>
            </div>

            {/* Account Settings */}
            <div className="md:col-span-2 mt-4">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
                Account Settings
              </h2>
            </div>

            {/* Role */}
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <Shield className="w-5 h-5 text-gray-500" />
                </div>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                >
                  <option value="supervisor">Supervisor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Active Status */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="active"
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Active
              </label>
            </div>

            {/* Is Local */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="isLocal"
                name="isLocal"
                checked={formData.isLocal}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isLocal"
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Is Local User
              </label>
            </div>

          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
