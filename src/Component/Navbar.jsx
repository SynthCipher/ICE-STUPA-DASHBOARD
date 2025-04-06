import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-5 pb-2 font-medium text-gray-700">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="h-20 cursor-pointer"
      />
      <p className="text-lg md:text-2xl text-right md:self-end   md:m-0 mt-5 font-semibold">
        <span className="block md:inline">ICE STUPA </span>
        <span className="block md:inline">AUTOMATION DASHBOARD</span>
      </p>
    </div>
  );
};

export default Navbar;
