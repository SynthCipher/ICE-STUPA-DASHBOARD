import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { Globe, House, List } from "lucide-react";

const Navbar = () => {
  const { navigate, token, setToken } = useContext(AppContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRoleText, setUserRoleText] = useState("");

  // Inside your component:
  const location = useLocation();

  // Get the current path
  const currentPath = location.pathname;

  useEffect(() => {
    // Check if the user has admin role
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin" || userRole === "admin-env");

    // Set the user role text to display
    if (userRole === "admin" || userRole === "admin-env") {
      setUserRoleText("Admin");
    } else if (userRole === "supervisor") {
      setUserRoleText("Supervisor");
    } else {
      setUserRoleText("");
    }
  }, [token]); // Re-check when token changes

  const handleAuthAction = () => {
    if (token) {
      // If a token exists, log out the user
      setToken("");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");
      navigate('/login'); // Redirect to login page after logout
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 pb-2 font-medium text-gray-700">
        <div className="flex items-center">
          <img
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // Smooth scroll
                });
              }, 100);
            }}
            src={assets.logo}
            alt="Logo"
            className="h-20 cursor-pointer"
          />
          {userRoleText && (
            <span className="ml-1 md:ml-2 text-sm font-semibold bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
              {userRoleText}
            </span>
          )}
        </div>

        <div className="flex flex-col items-end md:gap-2 gap-0">
          <button
            onClick={handleAuthAction}
            className="text-[12px] cursor-pointer text-right mb-2 border border-gray-400 px-3 py-1 rounded-2xl whitespace-nowrap hover:bg-gray-50 transition-colors"
          >
            {token ? "Logout" : " Login"}
          </button>
          <p className="text-lg md:text-2xl text-right md:self-end md:m-0 font-semibold">
            <span className="block md:inline">ICE STUPA </span>
            <span className="block md:inline">AUTOMATION </span>
          </p>
        </div>
      </div>

      <>
        {!token && (
          <div className="fixed  transform -translate-x-1/2 bottom-[3%] right-0 z-50 ">
            <div className="flex items-center bg-white shadow-lg rounded-full border w-12 h-12 border-blue-200  transition-all duration-300 hover:shadow-xl justify-center">
              <button
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // Smooth scroll
                    });
                  }, 100);
                }}
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium  py-1.5 rounded-full transition-all mx-1 text-center"
              >
                <House />
              </button>
            </div>
          </div>
        )}
      </>

      {isAdmin &&
        currentPath !== "/all-sites" &&
        !/^\/site\/[^/]+\/(view|edit)$/.test(currentPath) && (
          <div className="fixed  transform -translate-x-1/2 bottom-[13%] md:bottom-[5%] right-0 md:right-[10%] z-50 ">
            <div className="flex items-center bg-white shadow-lg rounded-full border w-12 h-12 border-blue-200  transition-all duration-300 hover:shadow-xl justify-center">
              <div className="flex items-center bg-white shadow-lg rounded-full border w-12 h-12 border-blue-200 transition-all duration-300 hover:shadow-xl justify-center">
                <button
                  onClick={() => navigate("/all-sites")}
                  className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium py-1.5 rounded-full transition-all mx-1 text-center"
                >
                  <List />
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Floating Admin Menu */}
      {isAdmin &&
        currentPath !== "/registerUser" &&
        currentPath !== "/registerSite" &&
        currentPath !== "/all-sites" &&
        // currentPath !== "/site/:id/view" &&
        // currentPath !== "/site/:id/edit" &&
        !/^\/site\/[^/]+\/(view|edit)$/.test(currentPath) && (
          <div className="fixed left-1/2 transform -translate-x-1/2 bottom-[5%] z-50 w-[380px] sm:w-[380px] max-w-[90%]">
            <div className="flex items-center bg-white shadow-lg rounded-full border border-blue-200 py-2 px-4 transition-all duration-300 hover:shadow-xl justify-center">
              <button
                onClick={() => {
                  navigate("/registerUser");
                  setTimeout(() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // Smooth scroll
                    });
                  }, 100);
                }}
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium px-4 py-1.5 rounded-full transition-all mx-1 text-center"
              >
                Register User
              </button>
              <div className="h-6 w-px bg-gray-500 mx-2"></div>
              <button
                onClick={() => {
                  navigate("/registerSite");
                  setTimeout(() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // Smooth scroll
                    });
                  }, 100);
                }}
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium px-4 py-1.5 rounded-full transition-all mx-1 text-center"
              >
                Register Site
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default Navbar;
