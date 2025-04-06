import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Droplet, Calendar } from 'lucide-react';
import {locationData} from '../assets/assets'
const Locations = () => {
  const navigate = useNavigate();
  
 

  // Handle click on a location card
  const handleLocationClick = (locationId) => {
    navigate(`/locations/${locationId}`);
  };

  return (
    <div className="bg-[#f0f4f8] min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ice Stupa Project Locations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our artificial glacier installations across 8 high-altitude regions around the world, 
            helping communities conserve water and adapt to climate change.
          </p>
        </div>

        {/* Locations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locationData.map((location) => (
            <div 
              key={location.id}
              onClick={() => handleLocationClick(location.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                {/* If you have images, use them here. Otherwise using background colors as placeholders */}
                <div 
                  className="w-full h-full bg-cyan-700" 
                  style={{
                    backgroundImage: `url(${location.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-3 text-white">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{location.country}</span>
                      </div>
                      <h3 className="text-xl font-semibold">{location.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={14} className="mr-2 text-cyan-600" />
                    <span>Est: {location.established}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-cyan-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{location.elevation}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Droplet size={14} className="mr-2 text-cyan-600" />
                    <span>{location.waterCapacity}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={14} className="mr-2 text-cyan-600" />
                    <span>{location.beneficiaries}</span>
                  </div>
                </div>
                <button 
                  className="w-full mt-4 py-2 bg-cyan-50 text-cyan-700 rounded-md hover:bg-cyan-100 transition duration-200 text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocationClick(location.id);
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