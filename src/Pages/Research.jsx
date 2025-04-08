import React, { useState } from "react";
import { papers } from "../assets/assets.js";


const Research = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter papers based on selected category
  const filteredPapers =
    selectedCategory === "all"
      ? papers
      : papers.filter((paper) => paper.category === selectedCategory);


  return (
    <div className="bg-gray-50 min-h-screen pb-16 mb-6">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Research Publications</h1>
          <p className="text-xl max-w-3xl">
            Explore our collection of academic research papers on Ice Stupas and
            Artificial Glaciers, contributing to sustainable water management
            solutions in high-altitude regions.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="container mx-auto px-4 my-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === "all"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } transition`}
          >
            All Papers
          </button>
          <button
            onClick={() => setSelectedCategory("ice-stupa")}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === "ice-stupa"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } transition`}
          >
            Ice Stupa
          </button>
          <button
            onClick={() => setSelectedCategory("artificial-glacier")}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === "artificial-glacier"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } transition`}
          >
            Artificial Glaciers
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Showing {filteredPapers.length} research papers
        </p>
      </div>

      {/* Research Papers Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={paper.image || "/api/placeholder/600/300"}
                  alt={paper.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-blue-600 font-medium mb-2">
                  {paper.journal} · {paper.year}
                </p>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {paper.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">By {paper.authors}</p>
                <p className="text-gray-700 text-sm mb-6 line-clamp-3">
                  {paper.abstract}
                </p>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
                >
                  Read Paper
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No Results Message */}
      {filteredPapers.length === 0 && (
        <div className="container mx-auto px-4 text-center py-12">
          <p className="text-gray-600 text-lg">
            No research papers found for this category.
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            Conducting research on Ice Stupas or Artificial Glaciers?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We welcome contributions from researchers and academics. Share your
            findings with our community.
          </p>
          <a
            href="/submit-research"
            className="inline-flex items-center bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition"
          >
            Submit Your Research
          </a>
        </div>
      </div>
    </div>
  );
};

export default Research;
