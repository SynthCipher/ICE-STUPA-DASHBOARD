import React, { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { assets } from "../assets/assets";

export default function IceStupaDashboard() {
  const [currentComparison, setCurrentComparison] = useState(0);

  // Example comparison data - you would replace these with your actual images
  const comparisons = [
    {
      title: "Ice Stupa Formation Progress",
      before: assets.image1,
      after: assets.image2,
      beforeLabel: "Before Automation",
      afterLabel: "After Automation",
      description:
        "Comparison showing the significant improvement in ice stupa formation efficiency after implementing the automated system.",
    },
    {
      title: "Water Distribution System",
      before: assets.image3,
      after: assets.image4,
      beforeLabel: "Manual Process",
      afterLabel: "Automated Process",
      description:
        "The new automated water distribution system optimizes water usage and ensures consistent ice formation.",
    },
    {
      title: "Temperature Management",
      before: assets.image5,
      after: assets.image6,
      beforeLabel: "Without Sensors",
      afterLabel: "With IoT Sensors",
      description:
        "IoT temperature sensors now provide real-time data to optimize the freezing process.",
    },
  ];

  const handlePrevious = () => {
    setCurrentComparison((prev) =>
      prev === 0 ? comparisons.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentComparison((prev) =>
      prev === comparisons.length - 1 ? 0 : prev + 1
    );
  };

  const current = comparisons[currentComparison];

  return (
    <div className="bg-gray-100  mb-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-blue-800 text-white">
            <h2 className="text-2xl font-semibold">
              Before & After Comparison
            </h2>
            <p className="opacity-80">
              See the impact of our automated systems
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {current.title}
            </h3>

            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <ReactCompareSlider
                position={50}
                handle={
                  <ReactCompareSliderHandle
                    buttonStyle={{
                      backdropFilter: "none",
                      border: "none",
                      boxShadow: "0 0 0 2px #fff",
                      color: "#fff",
                      backgroundColor: "#007bff",
                      height: "34px",
                      width: "34px",
                      transform: "scale(0.7)"  // This scales the entire handle including arrows
                    }}
                    linesStyle={{ 
                      display: "block", 
                      height: "12px",  // Reduced height
                      width: "0.5px"     // Thinner lines
                    }}
                  />
                }
                itemOne={
                  <div className="relative">
                    <ReactCompareSliderImage
                      src={current.before}
                      alt={current.beforeLabel}
                    />
                    <div className="absolute sm:top-4 sm:left-4 top-2 left-2 bg-black bg-opacity-60 text-white sm:px-4 sm:py-2 px-3 py-1 rounded">
                      {current.beforeLabel}
                    </div>
                  </div>
                }
                itemTwo={
                  <div className="relative">
                    <ReactCompareSliderImage
                      src={current.after}
                      alt={current.afterLabel}
                    />
                    
                    <div className="absolute  sm:top-4 sm:right-4 top-2 right-2 bg-blue-600 text-white  sm:px-4 sm:py-2 px-3 py-1 rounded">
                      {current.afterLabel}
                    </div>
                  </div>
                }
              />
            </div>

            <p className="text-gray-700 mb-6">{current.description}</p>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 sm:px-6 rounded-lg flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Previous
              </button>

              <div className="flex space-x-2">
                {comparisons.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentComparison(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentComparison === index
                        ? "bg-blue-800"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 sm:px-6 rounded-lg flex items-center"
              >
                Next
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Key Benefits of Automation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-semibold text-blue-800">
                Improved Efficiency
              </h3>
              <p className="text-gray-700 mt-2">
                Water usage reduced by 30% while achieving larger ice formations
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-semibold text-blue-800">24/7 Monitoring</h3>
              <p className="text-gray-700 mt-2">
                Real-time data collection allows for immediate adjustments to
                changing conditions
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-semibold text-blue-800">
                Maintenance Alerts
              </h3>
              <p className="text-gray-700 mt-2">
                Predictive maintenance reduces downtime and ensures continuous
                operation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
