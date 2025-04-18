import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext"; // Adjust path as needed
import {
  User,
  Search,
  Filter,
  RefreshCw,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  X,
  Eye,
  Edit,
  Mail,
  Phone,
  Shield,
  Check,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const AllUsers = () => {
  const { isAdmin, token, backendUrl } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]); // Original data
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered data for display
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "fullName",
    direction: "ascending",
  });

  const navigate = useNavigate();

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
  }, [token, isAdmin, navigate]);

  useEffect(() => {
    fetchAllUsers();
  }, [token, backendUrl]);

  // Filter and sort users whenever source data or filters change
  useEffect(() => {
    if (allUsers.length > 0) {
      let filtered = [...allUsers];

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (user) =>
            user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.phone && user.phone.includes(searchTerm))
        );
      }

      // Apply role filter
      if (filterRole !== "all") {
        filtered = filtered.filter((user) => user.role === filterRole);
      }

      // Apply sorting
      if (sortConfig.key) {
        filtered.sort((a, b) => {
          // Handle undefined values
          const valueA = a[sortConfig.key] || "";
          const valueB = b[sortConfig.key] || "";
          
          if (valueA < valueB) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (valueA > valueB) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }

      setFilteredUsers(filtered);
    }
  }, [searchTerm, filterRole, sortConfig, allUsers]);

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
        setFilteredUsers(data.users);
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

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      user: "bg-blue-100 text-blue-800 border-blue-200",
      manager: "bg-green-100 text-green-800 border-green-200",
      guest: "bg-gray-100 text-gray-800 border-gray-200",
      supervisor: "bg-green-100 text-green-800 border-green-200",  // Added support for supervisor
    };

    const icons = {
      admin: <Shield className="w-4 h-4 mr-1" />,
      supervisor: <User className="w-4 h-4 mr-1" />,
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center justify-center ${
          colors[role] || colors.user
        }`}
      >
        {icons[role] || <User className="w-4 h-4 mr-1" />}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto mb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <div className="flex sm:flex-row flex-col gap-2 text-xs md:text-sm">
          <button
            onClick={fetchAllUsers}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md flex items-center gap-1"
          >
            <RefreshCw className="sm:w-4 sm:h-4 w-3 h-3" />
            Refresh
          </button>
          <button
            onClick={() => navigate("/registerUser")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <PlusCircle className="sm:w-5 sm:h-5 w-4 h-4" />
            New User
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by name, email, phone..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm("")}
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="w-full md:w-64">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full appearance-none"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No users found</p>
          <button
            onClick={() => navigate("/registerUser")}
            className="mt-4 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
          >
            <PlusCircle className="w-5 h-5" />
            Create Your First User
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("fullName")}
                >
                  <div className="flex items-center">
                    User Name {getSortIcon("fullName")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center">
                    Email {getSortIcon("email")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("phone")}
                >
                  <div className="flex items-center">
                    Phone {getSortIcon("phone")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("role")}
                >
                  <div className="flex items-center">
                    Role {getSortIcon("role")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-600 font-medium">
                          {user.fullName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                      }
                      <div className="text-sm font-medium text-gray-900">
                        {user.fullName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-gray-500" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-gray-500" />
                      {user.phone || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role || "user")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/user/${user._id}/view`)}
                        className="text-blue-600 cursor-pointer
                        hover:text-blue-900 flex items-center" >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/user/${user._id}/edit`)}
                        className="text-indigo-600 cursor-pointer hover:text-indigo-900 flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;