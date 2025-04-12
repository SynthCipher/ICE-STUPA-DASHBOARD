import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Users,
  Droplet,
  Calendar,
  ArrowLeft,
  ThermometerSnowflake,
  Wifi,
  Battery,
  ToggleLeft,
  ToggleRight,
  Layers,
  Lock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import { locationData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const LocationDetail = () => {
  const { token, navigate, userRole, backendUrl, userData } =
    useContext(AppContext);
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [sensorStatuses, setSensorStatuses] = useState({
    temperature: true,
    waterFlow: true,
    solarPanel: false,
  });
  const { fetchLocation, locationData } = useContext(AppContext);

  // Dummy sensor data for charts
  const temperatureData = [
    { date: "2025-03-01", value: -8 },
    { date: "2025-03-02", value: -10 },
    { date: "2025-03-03", value: -5 },
    { date: "2025-03-04", value: -7 },
    { date: "2025-03-05", value: -11 },
    { date: "2025-03-06", value: -9 },
    { date: "2025-03-07", value: -6 },
  ];

  const waterVolumeData = [
    { date: "2025-03-01", value: 1200 },
    { date: "2025-03-02", value: 1350 },
    { date: "2025-03-03", value: 1500 },
    { date: "2025-03-04", value: 1620 },
    { date: "2025-03-05", value: 1780 },
    { date: "2025-03-06", value: 1850 },
    { date: "2025-03-07", value: 1920 },
  ];

  const solarPowerData = [
    { date: "2025-03-01", value: 4.2 },
    { date: "2025-03-02", value: 4.8 },
    { date: "2025-03-03", value: 3.9 },
    { date: "2025-03-04", value: 5.1 },
    { date: "2025-03-05", value: 4.5 },
    { date: "2025-03-06", value: 4.7 },
    { date: "2025-03-07", value: 5.2 },
  ];

  const printRole = () => {
    console.log(userRole);
    console.log("userId", userData._id);
    // console.log("locatinID", location._id);
    console.log(location);
  };

  const controlPanelAcess = async () => {
    if (!location || !location.supervisorId || !userData) {
      // toast.error("Location or user data not available.");
      return false;
    }
    if (location.supervisorId === userData._id) {
      // toast.success("it ture");
      return true;
    }
    // toast.error("it false");

    return false;
  };
  // useEffect(()=>{
  //   controlPanelAcess()
  // },[location])

  const [hasControlPanelAccess, setHasControlPanelAccess] = useState(false);

  // useEffect(() => {
    
  // }, [userRole, userData._id]);

  useEffect(() => {
    fetchLocation();
    const checkAccess = async () => {
      if (userRole === "admin") {
        setHasControlPanelAccess(true);
        return;
      }
      if (userRole === "supervisor") {
        const result = await controlPanelAcess();
        setHasControlPanelAccess(result);
      }
    };

    checkAccess();

    // Find the location data based on the locationId
    const foundLocation = locationData.find(
      (loc) => loc.siteName === locationId
    );
    if (foundLocation) {
      setLocation(foundLocation);
    }
    // printRole();
    // controlPanelAcess()

    // console.log(locationId);
  }, [token,locationId, locationData]);

  const toggleSensor = (sensorName) => {
    setSensorStatuses((prev) => ({
      ...prev,
      [sensorName]: !prev[sensorName],
    }));
  };

  if (!location) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f0f4f8]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f4f8] min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          to="/locations"
          className="inline-flex items-center text-cyan-700 hover:text-cyan-800 mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to all locations
        </Link>

        {/* Header section with location image */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-8 bg-white">
          <div className="h-64 md:h-80 relative">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${location.siteImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <div className="flex items-center mb-2">
                    <MapPin size={18} className="mr-2" />
                    <span>{location.country}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    <span className="text-2xl md:text-3xl ">
                      {location.siteName}
                    </span>
                    <br />
                    {location.location}
                  </h1>
                  <p className="mt-2 max-w-2xl">
                    {location.description ||
                      "A pioneering Ice Stupa installation helping the local community conserve water during dry seasons."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm flex items-center">
                <Calendar size={16} className="mr-2 text-cyan-600" />
                Established
              </span>
              <span className="font-medium">
                {new Date(location.established).getFullYear()}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-cyan-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Elevation
              </span>
              <span className="font-medium">
                {location.coordinates.altitude}m
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm flex items-center">
                <Droplet size={16} className="mr-2 text-cyan-600" />
                Water Capacity
              </span>
              <span className="font-medium">
                {(location.waterCapacity / 1_000_000).toFixed(1)}M L
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm flex items-center">
                <Users size={16} className="mr-2 text-cyan-600" />
                Beneficiaries
              </span>
              <span className="font-medium">{location.beneficiaries}+ </span>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 cursor-pointer py-2 font-medium text-sm ${
              activeTab === "overview"
                ? "text-cyan-700 border-b-2 border-cyan-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4  cursor-pointer py-2 font-medium text-sm ${
              activeTab === "sensors"
                ? "text-cyan-700 border-b-2 border-cyan-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("sensors")}
          >
            Sensor Data
          </button>
          <button
            className={`px-4 cursor-pointer py-2 font-medium text-sm ${
              activeTab === "control"
                ? "text-cyan-700 border-b-2 border-cyan-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("control")}
          >
            Control Panel
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  About This Location
                </h2>
                <p className="text-gray-700 mb-4">
                  {location.siteDescription ||
                    `The Ice Stupa project at ${location.name} was established in ${location.established} 
                  to address seasonal water scarcity in this high-altitude region. Using innovative passive freezing 
                  technology, this artificial glacier stores winter water for use during spring planting season.`}
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3">Impact</h3>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-cyan-700 text-2xl font-bold">
                          ~
                          {(
                            (location.waterCapacity -
                              (location.waterCapacity * 20) / 100) /
                            1_000_000
                          ).toFixed(2)}
                          M L
                        </p>
                        <p className="text-gray-600">Water Stored</p>
                      </div>
                      <div>
                        <p className="text-cyan-700 text-2xl font-bold">
                          {location.beneficiaries}+
                        </p>
                        <p className="text-gray-600">People Benefited</p>
                      </div>
                      <div>
                        <p className="text-cyan-700 text-2xl font-bold">
                          {location.farmlandIrrigated ||
                            `${(
                              (location.waterCapacity / 16_000_000) *
                              24.71
                            ).toFixed(1)}+ Acres`}
                        </p>
                        <p className="text-gray-600">Land Irrigated</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "sensors" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-semibold mb-6">Sensor Data</h2>

                {/* Temperature Chart */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <ThermometerSnowflake
                        size={18}
                        className="mr-2 text-cyan-600"
                      />
                      Temperature (°C)
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        sensorStatuses.temperature
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {sensorStatuses.temperature ? "Online" : "Offline"}
                    </span>
                  </div>
                  <div className="h-64 border border-gray-200 rounded-lg bg-gray-50 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0891b2"
                          activeDot={{ r: 8 }}
                          name="Temperature (°C)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Water Volume Chart */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Droplet size={18} className="mr-2 text-cyan-600" />
                      Water Volume (m³)
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        sensorStatuses.waterFlow
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {sensorStatuses.waterFlow ? "Online" : "Offline"}
                    </span>
                  </div>
                  <div className="h-64 border border-gray-200 rounded-lg bg-gray-50 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={waterVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0e7490"
                          activeDot={{ r: 8 }}
                          name="Volume (m³)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Solar Power Chart */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Battery size={18} className="mr-2 text-cyan-600" />
                      Solar Power (kW)
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        sensorStatuses.solarPanel
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {sensorStatuses.solarPanel ? "Online" : "Offline"}
                    </span>
                  </div>
                  <div className="h-64 border border-gray-200 rounded-lg bg-gray-50 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={solarPowerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#155e75"
                          activeDot={{ r: 8 }}
                          name="Power (kW)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "control" ? (
              token && hasControlPanelAccess ? (
                // (userRole === "admin" ||
                //   (userRole === "supervisor" && controlPanelAcess)) ?
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-2xl font-semibold mb-6">
                    Sensor Control Panel
                  </h2>
                  <div className="text-sm text-gray-500 mb-6">
                    Toggle sensors on/off and configure monitoring settings
                  </div>

                  <div className="space-y-6">
                    {/* Temperature Sensor Control */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-cyan-100 rounded-lg mr-4">
                            <ThermometerSnowflake
                              size={24}
                              className="text-cyan-700"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">Temperature Sensor</h3>
                            <p className="text-sm text-gray-500">
                              Monitors ice formation and ambient conditions
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSensor("temperature")}
                          className="flex items-center"
                        >
                          {sensorStatuses.temperature ? (
                            <ToggleRight size={32} className="text-green-600" />
                          ) : (
                            <ToggleLeft size={32} className="text-gray-400" />
                          )}
                        </button>
                      </div>

                      {sensorStatuses.temperature && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">
                                Sampling Rate
                              </label>
                              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option>Every 30 minutes</option>
                                <option>Every hour</option>
                                <option>Every 3 hours</option>
                                <option>Every 6 hours</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">
                                Alert Threshold (°C)
                              </label>
                              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option>Below -15°C</option>
                                <option>Below -10°C</option>
                                <option>Above 0°C</option>
                                <option>Above 5°C</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Water Flow Sensor Control */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-cyan-100 rounded-lg mr-4">
                            <Droplet size={24} className="text-cyan-700" />
                          </div>
                          <div>
                            <h3 className="font-medium">Water Flow Sensor</h3>
                            <p className="text-sm text-gray-500">
                              Tracks water volume and flow rates
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSensor("waterFlow")}
                          className="flex items-center"
                        >
                          {sensorStatuses.waterFlow ? (
                            <ToggleRight size={32} className="text-green-600" />
                          ) : (
                            <ToggleLeft size={32} className="text-gray-400" />
                          )}
                        </button>
                      </div>

                      {sensorStatuses.waterFlow && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">
                                Measurement Interval
                              </label>
                              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option>Every hour</option>
                                <option>Every 2 hours</option>
                                <option>Every 6 hours</option>
                                <option>Every 12 hours</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">
                                Flow Rate Alert
                              </label>
                              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option>Below 10 L/min</option>
                                <option>Below 5 L/min</option>
                                <option>Above 50 L/min</option>
                                <option>Above 100 L/min</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Solar Panel Sensor Control */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-cyan-100 rounded-lg mr-4">
                            <Battery size={24} className="text-cyan-700" />
                          </div>
                          <div>
                            <h3 className="font-medium">Solar Power Sensor</h3>
                            <p className="text-sm text-gray-500">
                              Monitors energy generation and battery status
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSensor("solarPanel")}
                          className="flex items-center"
                        >
                          {sensorStatuses.solarPanel ? (
                            <ToggleRight size={32} className="text-green-600" />
                          ) : (
                            <ToggleLeft size={32} className="text-gray-400" />
                          )}
                        </button>
                      </div>

                      {sensorStatuses.solarPanel && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">
                                Data Collection
                              </label>
                              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option>Every 15 minutes</option>
                                <option>Every 30 minutes</option>
                                <option>Every hour</option>
                                <option>Every 2 hours</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">
                                Battery Level Alert
                              </label>
                              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option>Below 20%</option>
                                <option>Below 10%</option>
                                <option>Below 5%</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                      Reset to Defaults
                    </button>
                    <button className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
                      Save Configuration
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow p-6 mt-12 text-center">
                  <div className="flex justify-center mb-6">
                    <Lock size={48} className="text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    You are not authorized to view this page. Please contact
                    your administrator for access permissions.
                  </p>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setTimeout(() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth", // Smooth scroll
                        });
                      }, 100);
                    }}
                    className="px-12 py-2 cursor-pointer bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
                  >
                    Login
                  </button>
                </div>
              )
            ) : (
              <></>
            )}
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            {/* Location Info Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Location Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin size={18} className="mr-3 text-cyan-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{`${location.siteName}, ${location.location}`}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Layers size={18} className="mr-3 text-cyan-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Terrain Type</p>
                    <p>
                      {(() => {
                        const countryTerrainMap = {
                          India: "Cold Mountain Desert",
                          Nepal: "High Himalayan Region",
                          Pakistan: "Karakoram Mountain Region",
                          Chile: "Andes Mountains",
                          Switzerland: "Alpine Region",
                          Bhutan: "Eastern Himalayan Region",
                          Peru: "High Andes",
                          China: "Tibetan Plateau",
                          Mongolia: "Cold Desert Steppe",
                          Afghanistan: "Hindu Kush Region",
                        };

                        return (
                          countryTerrainMap[location.country] ||
                          "Mountain Desert"
                        );
                      })()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar size={18} className="mr-3 text-cyan-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Active Season</p>
                    <p>
                      {(() => {
                        const activeSeasonMap = {
                          India: "November to May",
                          Nepal: "November to April",
                          Pakistan: "November to March",
                          Chile: "June to October",
                          Switzerland: "December to April",
                          Bhutan: "November to March",
                          Peru: "May to September",
                          China: "October to March",
                          Mongolia: "November to March",
                          Afghanistan: "November to March",
                        };

                        return (
                          activeSeasonMap[location.country] ||
                          "Season varies by region"
                        );
                      })()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Wifi size={18} className="mr-3 text-cyan-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Connection Status</p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Online
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Stats Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Current Status</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Water Volume</span>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-cyan-600 h-2 rounded-full"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">System Health</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Battery Level</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Last Update</span>
                  <span>Today, 14:35</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-500">Next Maintenance</span>
                  <span>In 18 days</span>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 font-medium">
                  Download Data Report
                </button>
                <button className="w-full py-2 bg-white border border-cyan-600 text-cyan-600 rounded-md hover:bg-cyan-50 font-medium">
                  Schedule Maintenance
                </button>
                <button
                  // onClick={() => (window.location.href = `tel:+919682574824`)}
                  onClick={() =>
                    (window.location.href = `tel:${location.contactPhone}`)
                  }
                  className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
                >
                  Contact Local Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
