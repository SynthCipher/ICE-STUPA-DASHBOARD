import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token, setToken } = useContext(AppContext);

  const handleAuthAction = () => {
    if (token) {
      // If a token exists, log out the user
      setToken("");
      localStorage.removeItem("token");
      // navigate("/"); // Redirect to login page after logout
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-between py-5 pb-2 font-medium text-gray-700">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="h-20 cursor-pointer"
      />

      <div className="flex flex-col items-end md:gap-2 gap-0">
        <button
          onClick={handleAuthAction}
          className="text-[12px] cursor-pointer text-right mb-2 border border-gray-400 px-3 py-1 rounded-2xl whitespace-nowrap"
        >
          {token ? "Logout" : "Admin Login"} {/* Conditional text based on token */}
        </button>
        <p className="text-lg md:text-2xl text-right md:self-end md:m-0 font-semibold">
          <span className="block md:inline">ICE STUPA </span>
          <span className="block md:inline">AUTOMATION </span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
