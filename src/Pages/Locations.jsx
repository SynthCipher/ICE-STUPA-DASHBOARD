import React, { useContext, useEffect, useState } from "react";
import { MapPin, Users, Droplet, Calendar, Thermometer } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Locations = () => {
  const { navigate, locationData, fetchLocation } = useContext(AppContext);
  const [weatherData, setWeatherData] = useState({});
  const API_KEY = "397bb54eb4827c690295a4ece1a58a5e";

  // Handle click on a location card
  const handleLocationClick = (siteName) => {
    navigate(`/locations/${siteName}`);
    scrollTo(0, 0);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // Fetch weather data when locationData is loaded
  useEffect(() => {
    if (locationData && locationData.length > 0) {
      fetchWeatherForLocations();
    }
  }, [locationData]);

  // Fetch weather data for all locations
  const fetchWeatherForLocations = async () => {
    const weatherResults = {};

    for (const location of locationData) {
      if (
        location.coordinates &&
        location.coordinates.latitude &&
        location.coordinates.longitude
      ) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.coordinates.latitude}&lon=${location.coordinates.longitude}&units=metric&appid=${API_KEY}`
          );

          weatherResults[location._id] = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
          };
        } catch (error) {
          console.error(
            `Error fetching weather for ${location.siteName}:`,
            error
          );
        }
      }
    }

    setWeatherData(weatherResults);
  };

  // Loading state when no data is available
  if (!locationData || locationData.length === 0) {
    return (
      <div className="bg-[#f0f4f8] my-24 py-8 px-4 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading locations...</p>
          <button
            onClick={fetchLocation}
            className="mt-4 px-4 py-2 bg-cyan-700 text-white rounded cursor-pointer hover:bg-cyan-800"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Main content when data is available
  return (
    <div className="bg-[#f0f4f8] min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ice Stupa Project Locations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our artificial glacier installations across high-altitude
            regions around the world, helping communities conserve water and
            adapt to climate change.
          </p>
        </div>

        {/* Locations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
          {locationData.map((location) => (
            <div
              key={location._id}
              onClick={(e) => {
                e.stopPropagation();
                handleLocationClick(location.siteName);
              }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                {/* If you have images, use them here. Otherwise using background colors as placeholders */}
                <div
                  className="w-full h-full bg-cyan-700"
                  style={{
                    backgroundImage: `url(${location.siteImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Temperature display in the bottom right corner */}
                  {weatherData[location._id] && (
                    <div className="absolute bottom-3 right-3 bg-black/40 px-2 py-1 rounded flex items-center z-10">
                      <div className="flex flex-col items-end">
                        <span className="text-white flex justify-center items-center gap-1 font-medium">
                          <Thermometer size={16} className="ml-1 text-white" />
                          {Math.round(weatherData[location._id].temperature)}°C
                        </span>
                        <p className="text-[7px]  text-right text-white/70">
                          from OpenWeather
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-3 text-white">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{location.country}</span>
                      </div>
                      <h3 className="text-xl font-semibold">
                        {location.siteName} <br />
                        {location.location}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={14} className="mr-2 text-cyan-600" />
                    <span>{new Date(location.established).getFullYear()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
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
                    <span>{location.coordinates.altitude} m</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Droplet size={14} className="mr-2 text-cyan-600" />
                    <span>
                      {(location.waterCapacity / 1_000_000).toFixed(1)}M L
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={14} className="mr-2 text-cyan-600" />
                    <span>{location.beneficiaries}</span>
                  </div>
                </div>
                <button
                  className="w-full mt-4 py-2 bg-cyan-50 cursor-pointer text-cyan-700 rounded-md hover:bg-cyan-100 transition duration-200 text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocationClick(location.siteName);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;
