import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios"; // Make sure to import axios
import {
  MapPin,
  Save,
  ArrowLeft,
  Trash2,
  User,
  Phone,
  Calendar,
  Droplet,
  Users,
  Info,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";

const Edit = () => {
  const {
    locationData,
    fetchLocation,
    navigate,
    isAdmin,
    token,
    backendUrl,
    updateSite,
    deleteSite,
  } = useContext(AppContext);

  const { id } = useParams(); // Get site ID from URL
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [site, setSite] = useState(null);
  const [supervisors, setSupervisors] = useState([]);
  const [fetchingSupervisors, setFetchingSupervisors] = useState(true);
  const [formData, setFormData] = useState({
    siteName: "",
    location: "",
    country: "",
    coordinates: {
      latitude: null,
      longitude: null,
      altitude: null,
    },
    siteDescription: "",
    beneficiaries: 0,
    waterCapacity: 0,
    established: "",
    contactPerson: "",
    contactPhone: "",
    siteImage: "",
    siteStatus: "inactive",
    supervisorId: "",
    active: true,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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

    // Load site data
    loadSiteData();

    // Fetch supervisors list
    fetchSupervisors();
  }, [token, isAdmin, navigate, backendUrl, id]);

  const fetchSupervisors = async () => {
    try {
      setFetchingSupervisors(true);
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
      console.error("Error fetching supervisors:", error);
      toast.error("Error fetching supervisors list");
    } finally {
      setFetchingSupervisors(false);
    }
  };

  const loadSiteData = async () => {
    try {
      setIsLoading(true);

      // If locationData is not already loaded, fetch it
      if (!locationData || locationData.length === 0) {
        await fetchLocation();
      }

      // Find the site by ID
      const siteData = locationData.find((site) => site._id === id);

      if (!siteData) {
        toast.error("Site not found");
        navigate("/all-sites");
        return;
      }

      // Set site data
      setSite(siteData);

      // Format date for input field
      const establishedDate = siteData.established
        ? new Date(siteData.established).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      // Set form data
      setFormData({
        siteName: siteData.siteName || "",
        location: siteData.location || "",
        country: siteData.country || "",
        coordinates: {
          latitude: siteData.coordinates?.latitude || null,
          longitude: siteData.coordinates?.longitude || null,
          altitude: siteData.coordinates?.altitude || null,
        },
        siteDescription: siteData.siteDescription || "",
        beneficiaries: siteData.beneficiaries || 0,
        waterCapacity: siteData.waterCapacity || 0,
        established: establishedDate,
        contactPerson: siteData.contactPerson || "",
        contactPhone: siteData.contactPhone || "",
        siteImage: siteData.siteImage || "",
        siteStatus: siteData.siteStatus || "inactive",
        supervisorId: siteData.supervisorId || "",
        active: siteData.active !== undefined ? siteData.active : true,
      });

      // Set image preview if there's an image
      if (siteData.siteImage) {
        setImagePreview(siteData.siteImage);
      }
    } catch (error) {
      toast.error("Failed to load site data");
      console.error("Error loading site data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      // Handle nested properties like coordinates.latitude
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "number" ? parseFloat(value) || null : value,
        },
      }));
    } else {
      // Handle regular inputs
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
            ? parseFloat(value) || 0
            : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, siteImage: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      // Create a FormData object if we have an image file
      let dataToSubmit;

      if (imageFile) {
        dataToSubmit = new FormData();

        // Append all form fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "coordinates") {
            // Handle nested coordinates
            dataToSubmit.append(`${key}[latitude]`, value.latitude || null);
            dataToSubmit.append(`${key}[longitude]`, value.longitude || null);
            dataToSubmit.append(`${key}[altitude]`, value.altitude || null);
          } else {
            dataToSubmit.append(key, value);
          }
        });

        // Append image file
        dataToSubmit.append("siteImage", imageFile);
      } else {
        // Just use JSON if no image
        dataToSubmit = { ...formData };
      }

      // Call API to update site
      await updateSite(id, dataToSubmit);

      toast.success("Site updated successfully");
      navigate("/all-sites"); // Redirect to sites list
    } catch (error) {
      toast.error("Failed to update site");
      console.error("Error updating site:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSite = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this site? This action cannot be undone."
      )
    ) {
      try {
        await deleteSite(id);
        toast.success("Site deleted successfully");
        navigate("/sites"); // Redirect to sites list
      } catch (error) {
        toast.error("Failed to delete site");
        console.error("Error deleting site:", error);
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
            onClick={() => navigate("/sites")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Edit Site: {site?.siteName}</h1>
        </div>

        <button
          onClick={handleDeleteSite}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Delete Site
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

            {/* Site Name */}
            <div className="mb-4">
              <label
                htmlFor="siteName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Site Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={formData.siteName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
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

            {/* Country */}
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Site Status */}
            <div className="mb-4">
              <label
                htmlFor="siteStatus"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Site Status
              </label>
              <select
                id="siteStatus"
                name="siteStatus"
                value={formData.siteStatus}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Established Date */}
            <div className="mb-4">
              <label
                htmlFor="established"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Established Date
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <Calendar className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="date"
                  id="established"
                  name="established"
                  value={formData.established}
                  onChange={handleInputChange}
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="md:col-span-2 mt-4">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
                Additional Information
              </h2>
            </div>

            {/* Beneficiaries */}
            <div className="mb-4">
              <label
                htmlFor="beneficiaries"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Beneficiaries
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="number"
                  id="beneficiaries"
                  name="beneficiaries"
                  value={formData.beneficiaries}
                  onChange={handleInputChange}
                  min="0"
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                />
              </div>
            </div>

            {/* Water Capacity */}
            <div className="mb-4">
              <label
                htmlFor="waterCapacity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Water Capacity
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <Droplet className="w-5 h-5 text-blue-500" />
                </div>
                <input
                  type="number"
                  id="waterCapacity"
                  name="waterCapacity"
                  value={formData.waterCapacity}
                  onChange={handleInputChange}
                  min="0"
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                />
              </div>
            </div>

            {/* Contact Person */}
            <div className="mb-4">
              <label
                htmlFor="contactPerson"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Person
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                />
              </div>
            </div>

            {/* Contact Phone */}
            <div className="mb-4">
              <label
                htmlFor="contactPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Phone
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <Phone className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none"
                />
              </div>
            </div>

            {/* Supervisor Dropdown - UPDATED */}
            <div className="mb-4">
              <label
                htmlFor="supervisorId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Assign Supervisor
              </label>
              <select
                id="supervisorId"
                name="supervisorId"
                value={formData.supervisorId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select Supervisor --</option>
                {fetchingSupervisors ? (
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

            {/* Coordinates */}
            <div className="md:col-span-2 mt-4">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
                Coordinates
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Latitude */}
                <div className="mb-4">
                  <label
                    htmlFor="coordinates.latitude"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    id="coordinates.latitude"
                    name="coordinates.latitude"
                    value={formData.coordinates.latitude || ""}
                    onChange={handleInputChange}
                    step="any"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Longitude */}
                <div className="mb-4">
                  <label
                    htmlFor="coordinates.longitude"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    id="coordinates.longitude"
                    name="coordinates.longitude"
                    value={formData.coordinates.longitude || ""}
                    onChange={handleInputChange}
                    step="any"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Altitude */}
                <div className="mb-4">
                  <label
                    htmlFor="coordinates.altitude"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Altitude
                  </label>
                  <input
                    type="number"
                    id="coordinates.altitude"
                    name="coordinates.altitude"
                    value={formData.coordinates.altitude || ""}
                    onChange={handleInputChange}
                    step="any"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Site Description */}
            <div className="md:col-span-2 mb-4">
              <label
                htmlFor="siteDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Site Description
              </label>
              <div className="flex items-start border border-gray-300 rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100 h-24">
                  <Info className="w-5 h-5 text-gray-500" />
                </div>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleInputChange}
                  rows="3"
                  className="flex-grow p-2 focus:ring-blue-500 focus:border-blue-500 border-none h-24"
                ></textarea>
              </div>
            </div>

            {/* Site Image */}
            <div className="md:col-span-2 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Image
              </label>

              <div className="flex items-center gap-4">
                {/* Image Preview */}
                {imagePreview ? (
                  <div className="relative w-32 h-32">
                    <img
                      src={imagePreview}
                      alt="Site preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex-grow">
                  <label
                    htmlFor="siteImage"
                    className="flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span>Upload Image</span>
                  </label>
                  <input
                    type="file"
                    id="siteImage"
                    name="siteImage"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: JPG, PNG (max 2MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/all-sites")}
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

export default Edit;
