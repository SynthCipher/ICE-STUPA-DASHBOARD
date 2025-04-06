import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 mt-10 md:mt-10">
      <div className="flex flex-col sm:flex-row">
        {/* Content side */}
        <div className="w-full sm:w-1/2 p-6">
          <div className="flex items-center mb-2">
            <div className="w-2 h-10 bg-cyan-500 mr-3"></div>
            <h2 className="font-medium text-gray-600 text-sm">
              Dashboard Overview
            </h2>
          </div>

          <h1 className="prata-regular text-3xl text-gray-800 mb-4">
            ICE STUPA Project
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-xs text-gray-500">Water Stored</p>
              <p className="text-xl font-bold text-blue-700">14.2M Gallons</p>
            </div>
            <div className="bg-cyan-50 p-3 rounded-md border hover:bg-cyan-100 border-gray-300">
              <p className="text-xs text-gray-500">Active Sites</p>
              <button
                onClick={() => navigate("/locations")} // Redirect to locations page
                className="text-xl font-bold text-cyan-700  cursor-pointer"
              >
                8 Locations
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Monitor water conservation metrics and project status of our
            artificial glacier installations across high-altitude regions.
          </p>

          <button
            onClick={() => navigate("/about")}
            className="py-2 px-6 bg-cyan-500 text-white text-sm font-medium rounded-md hover:bg-cyan-600 transition duration-200"
          >
            More About Ice Stupa
          </button>
        </div>

        {/* Image side */}
        <div className="w-full sm:w-1/2 relative">
          <img
            src={assets.iceStupa1}
            className="w-full h-full object-cover"
            alt="Ice Stupa installation"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm">
              Ladakh Region, Himalayan Mountains
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
