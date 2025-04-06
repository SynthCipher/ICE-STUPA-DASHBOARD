import React from "react";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Locations from "./Pages/Locations.jsx";
import Location from "./Pages/Location.jsx";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vh] bg-[#f0f4f8] min-h-screen mb-4">
      <Navbar />
      {/* <hr className="text-gray-300"/> */}
      <Routes>
        
          <Route path="/" element={<Home />} ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/locations" element={<Locations />}></Route>
          <Route path="/locations/:locationId" element={<Location />}></Route>
     
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
