import React from "react";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Locations from "./Pages/Locations.jsx";
import Location from "./Pages/Location.jsx";
import Login from "./Pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import AboutIceStupa from "./Pages/AboutIceStupa.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import Stored from "./Pages/Stored.jsx";
import ActiveProjects from "./Pages/ActiveProjects.jsx";
import Contact from "./Pages/Contact.jsx";
import Careers from "./Pages/Careers.jsx";
import Research from "./Pages/Research.jsx";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vh] bg-[#f0f4f8] min-h-screen mb-4">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/aboutIceStupa" element={<AboutIceStupa />}></Route>

        <Route path="/locations" element={<Locations />}></Route>
        <Route path="/locations/:locationId" element={<Location />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/stored" element={<Stored/>}></Route>

        <Route path="/aboutUs" element={<AboutUs />}></Route>

        <Route path="/activeProject" element={<ActiveProjects/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/careers" element={<Careers/>}></Route>
        <Route path="/research" element={<Research/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
