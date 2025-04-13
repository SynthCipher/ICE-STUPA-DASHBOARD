import React, { useState, useEffect } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { assets } from "../assets/assets";

export default function IceStupaDashboard() {
  const [currentDescription, setCurrentDescription] = useState(0);

  // We'll keep only the first image comparison but all descriptions
  const firstComparison = {
    title: "Ice Stupa Formation Progress",
    before: assets.before,
    after: assets.after,
    beforeLabel: "Before Automation",
    afterLabel: "After Automation",
  };

  // All descriptions that will rotate
  const descriptions = [
    "Comparison showing the significant improvement in ice stupa formation efficiency after implementing the automated system.",
    "The new automated water distribution system optimizes water usage and ensures consistent ice formation.",
    "IoT temperature sensors now provide real-time data to optimize the freezing process.",
  ];

  // Auto-rotate descriptions every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDescription((prev) => (prev + 1) % descriptions.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="bg-gray-100 mb-8">
        <div className="max-w-2xl  mx-auto">
          <div className="bg-white rounded-lg  shadow-lg overflow-hidden">
            <div className="p-6 bg-blue-800 text-white">
              <h2 className="text-2xl font-semibold">
                Transformation Showcase
              </h2>
              <p className="opacity-80">
                See the impact of our automated systems
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {firstComparison.title}
              </h3>

              <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                <div className="aspect-w-16 aspect-h-9">
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
                          transform: "scale(0.7)",
                        }}
                        linesStyle={{
                          display: "block",
                          height: "12px",
                          width: "0.5px",
                        }}
                      />
                    }
                    itemOne={
                      <div className="relative w-full h-full">
                        <ReactCompareSliderImage
                          src={firstComparison.before}
                          alt={firstComparison.beforeLabel}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div className="absolute sm:top-4 sm:left-4 top-2 left-2 bg-black bg-opacity-60 text-white sm:px-4 sm:py-2 px-3 py-1 rounded">
                          {firstComparison.beforeLabel}
                        </div>
                      </div>
                    }
                    itemTwo={
                      <div className="relative w-full h-full">
                        <ReactCompareSliderImage
                          src={firstComparison.after}
                          alt={firstComparison.afterLabel}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div className="absolute sm:top-4 sm:right-4 top-2 right-2 bg-blue-600 text-white sm:px-4 sm:py-2 px-3 py-1 rounded">
                          {firstComparison.afterLabel}
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>

              <div className="text-gray-700 mb-6 min-h-16">
                <p className="transition-opacity duration-500">
                  {descriptions[currentDescription]}
                </p>
              </div>

              <div className="flex justify-center space-x-2">
                {descriptions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDescription(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentDescription === index
                        ? "bg-blue-800"
                        : "bg-gray-300"
                    }`}
                    aria-label={`View description ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 mb-8">
        <div className=" mx-auto">
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
                  Water usage reduced  while achieving larger ice
                  formations
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

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-semibold text-blue-800">
                  Community Impact
                </h3>
                <p className="text-gray-700 mt-2">
                  Extended water availability during spring months has increased
                  agricultural yield in surrounding communities
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-semibold text-blue-800">
                  Remote Management
                </h3>
                <p className="text-gray-700 mt-2">
                  Mobile application provides control from anywhere, reducing
                  the need for constant on-site presence
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-semibold text-blue-800">
                  Energy Sustainability
                </h3>
                <p className="text-gray-700 mt-2">
                  Solar-powered pumping systems reduce carbon footprint
                  while providing reliable energy even in remote mountain
                  locations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
