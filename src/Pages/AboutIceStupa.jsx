import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
const AboutIceStupa = () => {
  const { navigate } = useContext(AppContext);

  // Image paths would be imported from your assets
  const images = {
    process1: assets.image1, // Water from upper stream
    process2: assets.image2, // Sprinkler system
    process3: assets.image3, // Adding height with pipes
    process4: assets.image4, // Ice formation
    process5: assets.image5, // Melting and storage
    sonamPhoto: assets.sonam, // Sonam's photo
    videoThumbnail: assets.image6, // Video thumbnail
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-200 opacity-90"></div>
        <div
          className="w-full h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${images.iceFormation})` }}
        ></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Ice Stupa: Nature-Inspired Innovation
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Revolutionizing water conservation in high-altitude desert regions
              through artificial glaciers
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-6 py-16 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What are Ice Stupas?
          </h2>
          <p className="text-lg text-gray-700">
            Ice Stupas are artificial glaciers, a form of water conservation
            that stores winter water for use during the critical spring growing
            season. This ingenious solution addresses water scarcity in
            high-altitude desert regions that depend on glacial meltwater for
            agriculture.
          </p>
        </div>

        {/* The Process - How Ice Stupas Work */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Ice Stupa Process
          </h2>

          {/* Step 1: Water Source */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16 items-center">
            <div className="md:col-span-3 order-2 md:order-1">
              <span className="inline-block py-1 px-3 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                Step 1
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Harnessing Gravity
              </h3>
              <p className="text-gray-700 mb-4">
                Water is channeled from higher elevation streams where it
                naturally flows during winter. The system is designed to use
                gravity, eliminating the need for pumps or external energy
                sources.
              </p>
              <p className="text-gray-700">
                The natural pressure created by the elevation difference is key
                to the entire system. Water is collected from upstream sources
                when it's abundant during winter months, often when regular
                irrigation systems are frozen and unused.
              </p>
            </div>
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={images.process1}
                  alt="Water sourced from higher elevation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Sprinkler System */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16 items-center">
            <div className="md:col-span-2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={images.process2}
                  alt="Sprinkler system distributing water"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <span className="inline-block py-1 px-3 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                Step 2
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Distribution System
              </h3>
              <p className="text-gray-700 mb-4">
                The water is distributed through a sprinkler system that mimics
                natural freezing processes. When water emerges from the vertical
                pipe, it sprays and freezes mid-air in the sub-zero temperatures
                typical of winter nights.
              </p>
              <p className="text-gray-700">
                This sprinkler mechanism is crucial as it maximizes surface area
                exposure to cold air, accelerating the freezing process. The
                design ensures even distribution to create a conical ice
                formation that resembles traditional Buddhist stupas.
              </p>
            </div>
          </div>

          {/* Step 3: Height Addition */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16 items-center">
            <div className="md:col-span-3 order-2 md:order-1">
              <span className="inline-block py-1 px-3 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                Step 3
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vertical Growth
              </h3>
              <p className="text-gray-700 mb-4">
                As the ice structure grows, additional pipes are added to
                increase the height. The conical shape is intentional,
                minimizing the surface area exposed to solar radiation while
                maximizing the volume of stored water.
              </p>
              <p className="text-gray-700">
                This vertical growth allows Ice Stupas to store enormous volumes
                of water (up to millions of liters) with a relatively small
                footprint of land. The height can reach over 30-40 meters in
                optimal conditions.
              </p>
            </div>
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={images.process3}
                  alt="Adding height with additional pipes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Step 4: Ice Formation */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16 items-center">
            <div className="md:col-span-2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={images.process4}
                  alt="Complete ice formation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <span className="inline-block py-1 px-3 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                Step 4
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Complete Formation
              </h3>
              <p className="text-gray-700 mb-4">
                By mid-winter, the Ice Stupa reaches its full size. The conical
                shape minimizes melting as it presents the smallest surface area
                to direct sunlight, allowing it to last longer into the spring
                months when water is most needed.
              </p>
              <p className="text-gray-700">
                These artificial glaciers can store millions of liters of water
                that would otherwise flow away unused during winter months. The
                solidified ice remains stable even as outside temperatures begin
                to rise.
              </p>
            </div>
          </div>

          {/* Step 5: Spring Melting and Usage */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 order-2 md:order-1">
              <span className="inline-block py-1 px-3 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                Step 5
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Spring Melting and Agricultural Use
              </h3>
              <p className="text-gray-700 mb-4">
                As spring arrives and temperatures rise, the Ice Stupa begins to
                melt gradually. This slow release perfectly aligns with the
                critical early growing season when natural glacial melt hasn't
                yet begun and water is scarce.
              </p>
              <p className="text-gray-700">
                The meltwater is collected in storage tanks or directly
                channeled to fields through irrigation systems. This timely
                water supply allows farmers to start planting earlier,
                effectively extending the growing season and improving crop
                yields in these challenging environments.
              </p>
            </div>
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={images.process5}
                  alt="Spring melting and agricultural use"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Sonam Wangchuk - Completely Redesigned */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Innovator: Sonam Wangchuk
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Column */}
              <div className="lg:col-span-4 h-full">
                <div className="h-full">
                  <img
                    src={images.sonamPhoto}
                    alt="Sonam Wangchuk"
                    className="w-full h-full object-cover"
                    style={{ minHeight: "400px" }}
                  />
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-8 p-8">
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Sonam Wangchuk
                  </h3>
                  <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Engineer & Educator
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Bio Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Background
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Born and raised in Ladakh, India, Sonam Wangchuk is an
                      engineer, innovator, and education reformist who has
                      dedicated his life to solving the unique challenges faced
                      by people in high-altitude desert regions.
                    </p>
                    <p className="text-gray-700 mb-4">
                      He founded the Students' Educational and Cultural Movement
                      of Ladakh (SECMOL) in 1988 to reform the educational
                      system and help students who were considered failures by
                      the conventional education system.
                    </p>
                    <p className="text-gray-700">
                      His work on Ice Stupas earned him the prestigious Rolex
                      Award for Enterprise in 2016, and his story has inspired
                      millions around the world to think innovatively about
                      climate change adaptation.
                    </p>
                  </div>

                  {/* Video Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Watch His Story
                    </h4>
                    <div className="relative rounded-lg overflow-hidden bg-black shadow-md mb-4">
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          className="w-full h-full object-cover"
                          src="https://www.youtube.com/embed/WC_JPSIoTPc?si=ctC0gmrS1-yQ8y4i"
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerpolicy="strict-origin-when-cross-origin"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>

                    <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700">
                      "What we are doing is bringing a 2,000-year-old idea and
                      using modern science and technology to solve today's water
                      crisis. The Ice Stupa is not just about engineering—it's
                      about working with nature rather than fighting against
                      it."
                      <cite className="block text-sm font-medium text-gray-500 mt-2 not-italic">
                        — Sonam Wangchuk
                      </cite>
                    </blockquote>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Achievements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-blue-600 font-medium block mb-1">
                        2016
                      </span>
                      <p className="text-gray-800">
                        Rolex Award for Enterprise
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-blue-600 font-medium block mb-1">
                        2018
                      </span>
                      <p className="text-gray-800">
                        Global Award for Sustainable Architecture
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-blue-600 font-medium block mb-1">
                        2019
                      </span>
                      <p className="text-gray-800">Ramon Magsaysay Award</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact and Future */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Impact and Future
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Ice Stupas have already made a significant impact in regions like
            Ladakh, providing water to villages and monasteries that previously
            faced severe shortages. The technology has spread to countries like
            Switzerland, where it's being adapted to local conditions.
          </p>
          <p className="text-lg text-gray-700">
            The Ice Stupa Automation Project aims to enhance this technology
            through digital monitoring, automated controls, and data
            analysis—making these systems more efficient, scalable, and
            adaptable to the accelerating challenges of climate change.
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Join the Movement
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Whether you're an engineer, environmentalist, donor, or simply
            curious about sustainable water solutions, there are many ways to
            get involved with the Ice Stupa project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                navigate("/activeProject");
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // Smooth scroll
                  });
                }, 100); 
              }}
              className="px-6 py-3 bg-white text-blue-800 font-medium rounded-md hover:bg-blue-50 transition-colors"
            >
              Support Our Work
            </button>
            <a
              href="https://youtu.be/gvjJ39s53rk?si=q8950OXZ2Up4LIjs"
              className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-blue-800 transition-colors"
            >
              Learn More About Automation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutIceStupa;
