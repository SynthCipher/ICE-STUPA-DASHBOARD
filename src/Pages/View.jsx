import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Droplet,
  Users,
  Mountain,
  Calendar,
  Phone,
  User,
  NotepadText,
} from "lucide-react";

const View = () => {
  const { locationData, fetchLocation, token, isAdmin, deleteSite, navigate } =
    useContext(AppContext);
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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

    // Load site data from context or fetch if needed
    const loadSiteData = async () => {
      try {
        // If locationData is not already loaded, fetch it
        if (!locationData || locationData.length === 0) {
          await fetchLocation();
          return; // The component will re-render when context updates
        }

        // Find the site by ID
        const foundSite = locationData.find((site) => site._id === id);

        if (foundSite) {
          setSite(foundSite);
        } else {
          toast.error("Site not found");
          navigate("/sites");
        }
      } catch (error) {
        toast.error("Failed to load site data");
        console.error("Error loading site data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSiteData();
  }, [id, token, isAdmin, navigate, locationData, fetchLocation]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this site? This action cannot be undone."
      )
    ) {
      try {
        await deleteSite(id);
        toast.success("Site deleted successfully");
        navigate("/sites"); // Navigate back to all sites page
      } catch (error) {
        toast.error("Failed to delete site");
        console.error("Error deleting site:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      console.log(error);

      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">
          Loading ice stupa details...
        </h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="container mx-auto p-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="bg-red-50 p-6 rounded-lg shadow-md border border-red-100">
          <h1 className="text-xl font-bold text-red-700">
            Ice Stupa Site Not Found
          </h1>
          <p className="mt-2 text-gray-700">
            The ice stupa site you're looking for doesn't exist or has been
            removed.
          </p>
          <button
            onClick={() => navigate("/sites")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to All Ice Stupa Sites
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white rounded-b-2xl mb-8">
      <div className="container mx-auto p-4">
        <div className="mb-6 flex items-center">
          {/* <button
            onClick={() => navigate("/all-sites")}
            className="mr-4 bg-white cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md shadow-sm flex items-center text-blue-700 transition duration-300"
          > */}
          <button
            onClick={() => navigate("/all-sites")}
            className="mr-4 cursor-pointer  flex items-center text-blue-700 hover:text-blue-900 transition duration-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-blue-800">{site.siteName}</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          {site.siteImage ? (
            <div className="h-80 overflow-hidden relative">
              <img
                src={site.siteImage}
                alt={site.siteName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/800/400";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              <h2 className="absolute bottom-4 left-6 text-white text-3xl font-bold drop-shadow-lg">
                {site.siteName}
              </h2>
            </div>
          ) : (
            <div className="h-80 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <Mountain size={64} className="mx-auto text-blue-400 mb-2" />
                <span className="text-blue-700 font-medium">
                  No image available
                </span>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 border-b border-blue-100 pb-4">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium flex items-center
                  ${
                    site.siteStatus === "active"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : site.siteStatus === "maintenance"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      : site.siteStatus === "completed"
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-gray-100 text-gray-800 border border-gray-200"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full mr-2 bg-current"></span>
                  {site.siteStatus}
                </span>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium flex items-center
                  ${
                    site.active
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full mr-2 bg-current"></span>
                  {site.active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/site/${id}/edit`)}
                  className="bg-blue-600 cursor-pointer  hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition duration-300 flex items-center"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Site
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm transition duration-300 flex items-center"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Site
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                  <Mountain size={20} className="mr-2 text-blue-600" />
                  Location Information
                </h2>
                <div className="space-y-3">
                  <p className="flex items-start">
                    <span className="font-medium text-gray-700 min-w-24">
                      Location:
                    </span>
                    <span className="text-gray-900 ml-2">{site.location}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-medium text-gray-700 min-w-24">
                      Country:
                    </span>
                    <span className="text-gray-900 ml-2">{site.country}</span>
                  </p>
                  {site.coordinates && (
                    <>
                      <p className="flex items-start">
                        <span className="font-medium text-gray-700 min-w-24">
                          Latitude:
                        </span>
                        <span className="text-gray-900 ml-2">
                          {site.coordinates.latitude || "N/A"}
                        </span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-medium text-gray-700 min-w-24">
                          Longitude:
                        </span>
                        <span className="text-gray-900 ml-2">
                          {site.coordinates.longitude || "N/A"}
                        </span>
                      </p>
                      {site.coordinates.altitude && (
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 min-w-24">
                            Altitude:
                          </span>
                          <span className="text-gray-900 ml-2">
                            {site.coordinates.altitude}m
                          </span>
                        </p>
                      )}
                    </>
                  )}
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4 text-blue-800 flex items-center">
                  <Droplet size={20} className="mr-2 text-blue-600" />
                  Capacity & Impact
                </h2>
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <Users size={16} className="text-blue-600 mr-2" />
                      <span className="font-medium text-gray-700">
                        Beneficiaries:
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100 shadow-sm">
                      <span className="text-2xl font-bold text-blue-800">
                        {site.beneficiaries || 0}
                      </span>
                      <span className="text-gray-600 ml-2">people served</span>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <div className="flex items-center mb-1">
                      <Droplet size={16} className="text-blue-600 mr-2" />
                      <span className="font-medium text-gray-700">
                        Water Capacity:
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100 shadow-sm">
                      <span className="text-2xl font-bold text-blue-800">
                        {site.waterCapacity || 0}
                      </span>
                      <span className="text-gray-600 ml-2">Liters</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                    <User size={20} className="mr-2 text-blue-600" />
                    Contact Information
                  </h2>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <User size={16} className="text-blue-600 mr-2" />
                      <span className="font-medium text-gray-700 min-w-32">
                        Contact Person:
                      </span>
                      <span className="text-gray-900 ml-2">
                        {site.contactPerson || "N/A"}
                      </span>
                    </p>
                    <p className="flex items-center">
                      <Phone size={16} className="text-blue-600 mr-2" />
                      <span className="font-medium text-gray-700 min-w-32">
                        Contact Phone:
                      </span>
                      <span className="text-gray-900 ml-2">
                        {site.contactPhone || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                    <Calendar size={20} className="mr-2 text-blue-600" />
                    Administrative Details
                  </h2>
                  <div className="space-y-3">
                    <p className="flex items-start">
                      <span className="font-medium text-gray-700 min-w-32">
                        Established:
                      </span>
                      <span className="text-gray-900 ml-2">
                        {formatDate(site.established)}
                      </span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-medium text-gray-700 min-w-32">
                        Created By:
                      </span>
                      <span className="text-gray-900 ml-2">
                        {typeof site.createdBy === "object"
                          ? site.createdBy.name || "Unknown"
                          : site.createdBy || "Unknown"}
                      </span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-medium text-gray-700 min-w-32">
                        Supervisor:
                      </span>
                      <span className="text-gray-900 ml-2">
                        {typeof site.supervisorId === "object"
                          ? site.supervisorId.name || "Unknown"
                          : site.supervisorId || "Unknown"}
                      </span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-medium text-gray-700 min-w-32">
                        Last Updated:
                      </span>
                      <span className="text-gray-900 ml-2">
                        {formatDate(site.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {site.siteDescription && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                  {/* <span className="mr-2">📝</span> */}
                  <NotepadText className="mr-2" />
                  Description
                </h2>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <p className="text-gray-800 leading-relaxed">
                    {site.siteDescription}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
