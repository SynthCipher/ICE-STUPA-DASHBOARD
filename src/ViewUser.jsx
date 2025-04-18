import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  Clock,
  AlertCircle,
  Edit,
  Activity
} from "lucide-react";
import { AppContext } from "./context/AppContext";

const ViewUser = () => {
  const { navigate, token, backendUrl } = useContext(AppContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (allUsers && allUsers.length > 0) {
      loadUserFromState();
    } else {
      fetchAllUsers();
    }
  }, [token, navigate, allUsers, id]);

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
        const foundUser = data.users.find((user) => user._id === id);
        if (foundUser) {
          setUser(foundUser);
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
    } else {
      toast.error("User not found");
      navigate("/users");
    }
    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Calculate account age
  const calculateAccountAge = (createdAt) => {
    if (!createdAt) return "Unknown";
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years, ${Math.floor((diffDays % 365) / 30)} months`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-4 h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-6">The user you're looking for doesn't exist or may have been removed</p>
            <button
              onClick={() => navigate("/all-users")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 mb-8 mt-6 animate-fadeIn">
      {/* Header with breadcrumb navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <button
              onClick={() => navigate("/all-users")}
              className="mr-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-sm breadcrumbs text-gray-500">
              <span>Users</span> / <span className="font-medium">{user.userName}</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{user.fullName}'s Profile</h1>
        </div>

        <button
          onClick={() => navigate(`/user/${id}/edit`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Main content card */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* User Profile Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-8 text-white">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold">{user.fullName}</h2>
            <p className="text-blue-100 text-lg mb-4">@{user.userName}</p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-purple-200 text-purple-900"
                    : "bg-green-200 text-green-900"
                }`}
              >
                {user.role === "admin" ? "Administrator" : "Supervisor"}
              </span>

              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  user.active
                    ? "bg-green-200 text-green-900"
                    : "bg-red-200 text-red-900"
                }`}
              >
                {user.active ? "Active Account" : "Inactive Account"}
              </span>

              {user.isLocal && (
                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-200 text-blue-900">
                  Local User
                </span>
              )}
            </div>
          </div>
        </div>

        {/* User Details Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="mr-2 p-2 bg-blue-100 rounded-md">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                  <Mail className="w-5 h-5 text-gray-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium text-gray-800">{user.email || "Not provided"}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                  <Phone className="w-5 h-5 text-gray-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="font-medium text-gray-800">{user.phone || "Not provided"}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium text-gray-800">{user.location || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-gray-50 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="mr-2 p-2 bg-blue-100 rounded-md">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                Account Details
              </h3>

              <div className="space-y-6">
                {/* Role */}
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                  <Shield className="w-5 h-5 text-gray-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">User Role</p>
                    <p className="font-medium text-gray-800 capitalize">{user.role}</p>
                  </div>
                </div>

                {/* Account Age */}
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                  <Activity className="w-5 h-5 text-gray-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account Age</p>
                    <p className="font-medium text-gray-800">{calculateAccountAge(user.createdAt)}</p>
                  </div>
                </div>

                {/* Last Login */}
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                  <Clock className="w-5 h-5 text-gray-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Login</p>
                    <p className="font-medium text-gray-800">
                      {user.lastLogin
                        ? formatDate(user.lastLogin)
                        : "Never logged in"}
                    </p>
                  </div>
                </div>

                {/* Account Created */}
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account Created</p>
                    <p className="font-medium text-gray-800">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;