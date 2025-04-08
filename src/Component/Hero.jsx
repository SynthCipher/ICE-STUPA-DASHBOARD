import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  // const navigate = useNavigate();
  const { waterStored, navigate } = useContext(AppContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 mt-10 md:mt-10">
      <div className="flex flex-col md:flex-row">
        {/* Content side */}
        <div className="w-full md:w-1/2 p-6">
          <div className="flex items-center mb-2 2xl:mb-20 xl:mb-10">
            <div className="w-2 h-10 bg-cyan-500 mr-3"></div>
            <h2 className="font-medium text-gray-600 text-sm">
              Dashboard Overview
            </h2>
          </div>

          <h1 className="prata-regular text-3xl text-gray-800 mb-4">
            ICE STUPA Project
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div
              onClick={() => {
                navigate("/stored");
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // Smooth scroll
                  });
                }, 100);
              }}
              className="bg-blue-100 border border-gray-300 cursor-pointer hover:bg-blue-200 p-3 rounded-md"
            >
              <p className="text-xs text-gray-500">Water Stored</p>
              <p className="text-xl font-bold text-blue-700">
                {waterStored >= 1000000
                  ? (waterStored / 1000000).toFixed(1) + "M L"
                  : waterStored + " L"}
              </p>
            </div>
            <div
              onClick={() => {
                navigate("/locations");
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // Smooth scroll
                  });
                }, 100);
              }}
              className="bg-cyan-50 p-3 cursor-pointer rounded-md border hover:bg-cyan-100 border-gray-300"
            >
              <p className="text-xs text-gray-500">Active Sites</p>
              <button
                // Redirect to locations page
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
            onClick={() => {
              navigate("/aboutIceStupa");
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // Smooth scroll
                });
              }, 100);
            }}
            className="py-2 px-6 bg-cyan-500 text-white cursor-pointer text-sm font-medium rounded-md hover:bg-cyan-600 transition duration-200"
          >
            More About Ice Stupa
          </button>
        </div>

        {/* Image side */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={assets.iceStupa1}
            className="w-full h-full object-cover"
            alt="Ice Stupa installation"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm">Ice Stupa, Ladakh Region</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
