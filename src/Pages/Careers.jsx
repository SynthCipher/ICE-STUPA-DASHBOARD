import React from "react";
import { ExternalLink } from "lucide-react";
import { jobOpenings } from "../assets/assets.js";
import { assets } from "../assets/assets.js";

const Careers = () => {
  return (
    <div className="min-h-screen bg-gray-50 my-6 ">
      {/* Hero section */}
      <div
        className="relative bg-cyan-700 text-white py-24 md:py-32  pb-4 md:pb-4   rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${assets.village1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-cyan-800/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Join Our <span className="text-cyan-300">Growing Team</span>
            </h1>
            <p className="text-xl md:text-2xl mb-2 font-light text-cyan-50 max-w-2xl">
              We're looking for passionate individuals to help us build the
              future. Explore our open positions and find your next opportunity.
            </p>
          </div>
        </div>
      </div>

      {/* Job listings */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">
          Open Positions
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {jobOpenings.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {job.title}
                  </h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="mr-4">{job.department}</span>
                  <span className="mr-4">{job.location}</span>
                  <span>{job.mode}</span>
                </div>

                <p className="text-gray-600 mb-6">{job.description}</p>

                <a
                  href={job.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Apply Now
                  <ExternalLink className="ml-2" size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company culture section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">
            Why Work With Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                Growth & Development
              </h3>
              <p className="text-gray-600">
                We invest in your professional growth with learning stipends,
                mentorship programs, and career advancement opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                Work-Life Balance
              </h3>
              <p className="text-gray-600">
                Flexible working hours, generous PTO, and remote work options to
                help you maintain a healthy balance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                Innovative Environment
              </h3>
              <p className="text-gray-600">
                Work on challenging problems with cutting-edge technology in a
                collaborative and supportive atmosphere.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Don't see the right role?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send
            us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a
            href="https://forms.gle/j18nRMMXCEWtzjUb9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Submit General Application
            <ExternalLink className="ml-2" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Careers;
