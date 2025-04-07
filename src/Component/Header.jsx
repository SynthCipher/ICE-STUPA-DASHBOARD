import React, { useState, useEffect } from "react";
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
import { locationData } from "../assets/assets";

const Header = () => {

     const { locationId } = useParams();
      const [location, setLocation] = useState(null);

     useEffect(() => {
        // Find the location data based on the locationId
        const foundLocation = locationData.find((loc) => loc.id === locationId);
        if (foundLocation) {
          setLocation(foundLocation);
        }
      }, [locationId]);
  return (
    <>
      {/* Header section with location image */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-8 bg-white">
        <div className="h-64 md:h-80 relative">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${location.imageUrl})`,
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
                  {location.name}
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
            <span className="font-medium">{location.established}</span>
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
            <span className="font-medium">{location.elevation}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm flex items-center">
              <Droplet size={16} className="mr-2 text-cyan-600" />
              Water Capacity
            </span>
            <span className="font-medium">{location.waterCapacity}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm flex items-center">
              <Users size={16} className="mr-2 text-cyan-600" />
              Beneficiaries
            </span>
            <span className="font-medium">{location.beneficiaries}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
