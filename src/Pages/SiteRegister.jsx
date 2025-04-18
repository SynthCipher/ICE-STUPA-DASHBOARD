import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { ArrowLeft, Loader, Upload } from "lucide-react";

const SiteRegister = () => {
  const { backendUrl, navigate, token, isAdmin } = useContext(AppContext);

  const [formData, setFormData] = useState({
    siteName: "",
    location: "",
    country: "",
    coordinates: {
      latitude: "",
      longitude: "",
      altitude: "",
    },
    siteDescription: "",
    beneficiaries: "",
    waterCapacity: "",
    established: "",
    contactPerson: "",
    contactPhone: "",
    siteStatus: "inactive",
    supervisorId: "",
    siteImage: "",
  });

  const [siteImage, setSiteImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [supervisors, setSupervisors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true);

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

    // Fetch supervisors list
    const fetchSupervisors = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/auth/supervisors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          // Filter to only include users with role 'supervisor'
          const supervisorUsers = data.users.filter(
            (user) => user.role === "supervisor"
          );
          setSupervisors(supervisorUsers);
        } else {
          toast.error("Failed to fetch supervisors");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching supervisors list");
      } finally {
        setFetchingUsers(false);
      }
    };

    fetchSupervisors();
  }, [token, isAdmin, navigate, backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "latitude" || name === "longitude" || name === "altitude") {
      setFormData((prev) => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: value ? parseFloat(value) : "",
        },
      }));
    } else if (name === "beneficiaries" || name === "waterCapacity") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseFloat(value) : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSiteImage(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formPayload = new FormData();

      // Append text fields
      formPayload.append("siteName", formData.siteName);
      formPayload.append("location", formData.location);
      formPayload.append("country", formData.country);
      formPayload.append("latitude", formData.coordinates.latitude || "");
      formPayload.append("longitude", formData.coordinates.longitude || "");
      formPayload.append("altitude", formData.coordinates.altitude || "");
      formPayload.append("siteDescription", formData.siteDescription);
      formPayload.append("beneficiaries", formData.beneficiaries || 0);
      formPayload.append("waterCapacity", formData.waterCapacity || 0);
      formPayload.append("established", formData.established || "");
      formPayload.append("contactPerson", formData.contactPerson);
      formPayload.append("contactPhone", formData.contactPhone);
      formPayload.append("siteStatus", formData.siteStatus);
      formPayload.append("supervisorId", formData.supervisorId || "");
      // console.log(formData.coordinates);
      if (siteImage) {
        formPayload.append("siteImage", siteImage);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/sites/register`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Site registered successfully");

        // Reset form
        setFormData({
          siteName: "",
          location: "",
          country: "",
          coordinates: {
            latitude: "",
            longitude: "",
            altitude: "",
          },
          siteDescription: "",
          beneficiaries: "",
          waterCapacity: "",
          established: "",
          contactPerson: "",
          contactPhone: "",
          siteStatus: "inactive",
          supervisorId: "",
        });
        setSiteImage(null);
        setImagePreview(null);
        navigate("/locations");
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
              required
              className="h-16 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          <h2 className="mt-4 text-center text-2xl font-medium text-cyan-800">
            Register New Site
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Create a new site for the Ice Stupa Automation Project
          </p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="siteName"
                className="block text-sm font-medium text-cyan-700"
              >
                Site Name
              </label>
              <input
                id="siteName"
                name="siteName"
                type="text"
                required
                value={formData.siteName}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Ice Stupa Site 1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-cyan-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="Leh, Ladakh"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-cyan-700"
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="India"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-cyan-700"
                >
                  Latitude
                </label>
                <input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  value={formData.coordinates.latitude}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="34.1526"
                />
              </div>
              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-cyan-700"
                >
                  Longitude
                </label>
                <input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  value={formData.coordinates.longitude}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="77.5771"
                />
              </div>
              <div>
                <label
                  htmlFor="altitude"
                  className="block text-sm font-medium text-cyan-700"
                >
                  Altitude (m)
                </label>
                <input
                  id="altitude"
                  name="altitude"
                  type="number"
                  step="any"
                  value={formData.coordinates.altitude}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="3500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="siteDescription"
                className="block text-sm font-medium text-cyan-700"
              >
                Site Description
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                rows={3}
                value={formData.siteDescription}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Provide a brief description of the site"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="beneficiaries"
                  className="block text-sm font-medium text-cyan-700"
                >
                  Beneficiaries
                </label>
                <input
                  id="beneficiaries"
                  name="beneficiaries"
                  type="number"
                  min="0"
                  value={formData.beneficiaries}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="0"
                />
              </div>
              <div>
                <label
                  htmlFor="waterCapacity"
                  className="block text-sm font-medium text-cyan-700"
                >
                  Water Capacity (L)
                </label>
                <input
                  id="waterCapacity"
                  name="waterCapacity"
                  type="number"
                  min="0"
                  value={formData.waterCapacity}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="0"
                />
              </div>
              <div>
                <label
                  htmlFor="established"
                  className="block text-sm font-medium text-cyan-700"
                >
                  Established Date
                </label>
                <input
                  id="established"
                  name="established"
                  type="date"
                  value={formData.established}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Site Image Upload */}
            <div>
              <label
                htmlFor="siteImage"
                className="block text-sm font-medium text-cyan-700"
              >
                Site Image
              </label>
              <div className="mt-1 flex items-center">
                <label
                  htmlFor="siteImage"
                  className="cursor-pointer flex items-center justify-center px-4 py-2 border border-cyan-300 rounded-md shadow-sm text-sm font-medium text-cyan-700 bg-white hover:bg-cyan-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Image
                </label>
                <input
                  id="siteImage"
                  name="siteImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                {imagePreview && (
                  <span className="ml-4 text-sm text-gray-500">
                    Image selected
                  </span>
                )}
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Site preview"
                    className="h-32 rounded-md border border-gray-300 object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="contactPerson"
                className="block text-sm font-medium text-cyan-700"
              >
                Contact Person
              </label>
              <input
                id="contactPerson"
                name="contactPerson"
                type="text"
                value={formData.contactPerson}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Local contact person name"
              />
            </div>

            <div>
              <label
                htmlFor="contactPhone"
                className="block text-sm font-medium text-cyan-700"
              >
                Contact Phone
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label
                htmlFor="siteStatus"
                className="block text-sm font-medium text-cyan-700"
              >
                Site Status
              </label>
              <select
                id="siteStatus"
                name="siteStatus"
                value={formData.siteStatus}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="supervisorId"
                className="block text-sm font-medium text-cyan-700"
              >
                Assign Supervisor
              </label>
              <select
                id="supervisorId"
                name="supervisorId"
                value={formData.supervisorId}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              >
                <option value="">-- Select Supervisor --</option>
                {fetchingUsers ? (
                  <option disabled>Loading supervisors...</option>
                ) : supervisors.length === 0 ? (
                  <option disabled>No supervisors available</option>
                ) : (
                  supervisors.map((supervisor) => (
                    <option key={supervisor._id} value={supervisor._id}>
                      {supervisor.fullName} ({supervisor.location})
                    </option>
                  ))
                )}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Only users with supervisor role are shown here
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-150 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Registering Site...
                  </span>
                ) : (
                  "Register Site"
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

export default SiteRegister;
