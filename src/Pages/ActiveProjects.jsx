import React from "react";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { projects } from "../assets/assets.js";

const ActiveProjects = () => {
  return (
    <div className="bg-gray-50 min-h-screen mb-8 p-6 mt-6">
      <div className="max-w-6xl mx-auto">
    
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">
            Active Artificial Glacier Projects
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            These organizations are leading the development and implementation
            of artificial glacier technology to address water scarcity in
            high-altitude regions.
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="md:flex">
                {/* Project Image */}
                <div className="md:w-1/3">
                  <div className="h-full">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Project Content */}
                <div className="md:w-2/3 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {project.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Key Achievements:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-600">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out"
                  >
                    Visit Website
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3">
            Join the Movement
          </h2>
          <p className="text-blue-700 mb-4">
            These projects welcome volunteers, donations, and technical
            collaborations. Visit their websites to learn how you can contribute
            to developing artificial glacier technology and addressing water
            scarcity in mountain regions.
          </p>
          <p className="text-blue-700">
            Together, we can help mountain communities adapt to climate change
            and create sustainable water solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjects;
