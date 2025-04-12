import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext"; // Adjust path as needed
import {
  MapPin,
  User,
  Calendar,
  Droplet,
  Users,
  Info,
  CheckCircle,
  AlertTriangle,
  Clock,
  PlusCircle,
  Eye,
  Edit,
  Search,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  X,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const AllSite = () => {
  const { locationData, fetchLocation, isAdmin, token, backendUrl } =
    useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "siteName",
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
  }, [token, isAdmin, navigate, backendUrl]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Filter and sort data whenever source data or filters change
    if (locationData) {
      let filteredData = [...locationData];

      // Apply search filter
      if (searchTerm) {
        filteredData = filteredData.filter(
          (site) =>
            site.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            site.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            site.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (filterStatus !== "all") {
        filteredData = filteredData.filter(
          (site) => site.siteStatus === filterStatus
        );
      }

      // Apply sorting
      if (sortConfig.key) {
        filteredData.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }

      setSites(filteredData);
    }
  }, [locationData, searchTerm, filterStatus, sortConfig]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchLocation();
    } catch (error) {
      toast.error("Failed to load site locations");
      console.error("Error fetching locations:", error);
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

  const getStatusBadge = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200",
    };

    const icons = {
      active: <CheckCircle className="w-4 h-4 mr-1" />,
      inactive: <Clock className="w-4 h-4 mr-1" />,
      maintenance: <AlertTriangle className="w-4 h-4 mr-1" />,
      completed: <CheckCircle className="w-4 h-4 mr-1" />,
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center justify-center ${
          colors[status] || colors.inactive
        }`}
      >
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getActiveStatus = (active) => {
    return active ? (
      <div className="flex items-center text-green-600">
        <ToggleRight className="w-5 h-5 mr-1" />
        <span>Active</span>
      </div>
    ) : (
      <div className="flex items-center text-gray-500">
        <ToggleLeft className="w-5 h-5 mr-1" />
        <span>Inactive</span>
      </div>
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
        <h1 className="text-2xl font-bold">Location Dashboard</h1>
        <div className="flex sm:flex-row flex-col gap-2 text-xs md:text-sm md:g">
          <button
            onClick={loadData}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md flex items-center gap-1"
          >
            <RefreshCw className="sm:w-4 sm:h-4 w-3 h-3" />
            Refresh
          </button>
          <button
            onClick={() => navigate("/registerSite")}
            className="bg-blue-600 hover:bg-blue-700 text-white  px-4 py-2 rounded-md flex items-center gap-2"
          >
            <PlusCircle className="sm:w-5 sm:h-5 w-4 h-4" />
            New Site
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
            placeholder="Search sites by name, location, country..."
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
              <option value="completed">Completed</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {sites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No site locations found</p>
          <button
            onClick={() => navigate("/registerSite")}
            className="mt-4 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
          >
            <PlusCircle className="w-5 h-5" />
            Create Your First Site
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
                  onClick={() => handleSort("siteName")}
                >
                  <div className="flex items-center">
                    Site Name {getSortIcon("siteName")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  <div className="flex items-center">
                    Location {getSortIcon("location")}
                  </div>
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("waterCapacity")}
                >
                  <div className="flex items-center">
                    Water Capacity {getSortIcon("waterCapacity")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("siteStatus")}
                >
                  <div className="flex items-center">
                    Status {getSortIcon("siteStatus")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("active")}
                >
                  <div className="flex items-center">
                    Active {getSortIcon("active")}
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
              {sites.map((site) => (
                <tr key={site._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {site.siteImage ? (
                        <img
                          src={site.siteImage}
                          alt={site.siteName}
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      {/* <div className="text-sm font-medium text-gray-900">
                        {site.siteName}
                      </div> */}
                      <div className="text-sm font-medium text-gray-900">
                        {site.siteName.length > 15
                          ? site.siteName.slice(0, 15) + "..."
                          : site.siteName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                      {site.location}, {site.country}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Droplet className="w-4 h-4 mr-1 text-blue-500" />
                      {(site.waterCapacity / 1000000).toFixed(2)}M L
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(site.siteStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getActiveStatus(site.active)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          console.log(`/site/${site._id}`);
                          navigate(`/site/${site._id}/view`);
                        }}
                        className="text-blue-600 cursor-pointer hover:text-blue-900 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/site/${site._id}/edit`)}
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

export default AllSite;
