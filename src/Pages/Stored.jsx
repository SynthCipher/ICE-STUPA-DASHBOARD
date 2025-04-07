import React, { useContext } from "react";
import { ArrowLeft, Droplet, Award, Home, TreePine } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Stored = () => {
  const { waterStored } = useContext(AppContext);
  // Constants for calculations

  const totalLiters = waterStored; // 14.2M gallons = 53,755,398 liters
  const olympicPoolLiters = 2500000; // Olympic swimming pool holds about 2,500,000 liters
  const olympicPoolCount = (totalLiters / olympicPoolLiters).toFixed(1);

  const waterTankCapacityLiters = 3785; // Standard water tank (Sintex) in liters (1000 gallons)
  const waterTankCount = Math.round(totalLiters / waterTankCapacityLiters);

  const litersPerAcreInch = 102800; // Liters needed to cover 1 acre with 1 inch of water
  const acresCovered = Math.round(totalLiters / litersPerAcreInch);

  const avgHomeWaterUsagePerDayLiters = 1135; // Average household water usage per day
  const homesDaysSupplied = Math.round(
    totalLiters / avgHomeWaterUsagePerDayLiters
  );

  return (
    <div className="bg-blue-50 mb-8 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Main Title */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Water Stored</h1>
          <div className="text-5xl font-bold text-center text-blue-600">
            53.8M Liters
          </div>
        </div>

        {/* Infographic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Olympic Pools Comparison */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <Droplet size={32} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Olympic Swimming Pools</h2>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {olympicPoolCount}
            </p>
            <p className="text-center text-gray-600">
              Our stored water equals {olympicPoolCount} Olympic-sized swimming
              pools
            </p>
          </div>

          {/* Water Tanks Comparison */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <Award size={32} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Water Tanks</h2>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {waterTankCount.toLocaleString()}
            </p>
            <p className="text-center text-gray-600">
              Equivalent to {waterTankCount.toLocaleString()} standard water
              tanks
            </p>
          </div>

          {/* Acres Coverage */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <TreePine size={32} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Land Coverage</h2>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {acresCovered}
            </p>
            <p className="text-center text-gray-600">
              Can irrigate {acresCovered} acres with 1 inch of water
            </p>
          </div>

          {/* Household Supply */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <Home size={32} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Household Supply</h2>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {homesDaysSupplied.toLocaleString()}
            </p>
            <p className="text-center text-gray-600">
              Can supply {homesDaysSupplied.toLocaleString()} homes for one day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stored;
