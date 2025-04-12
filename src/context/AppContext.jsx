import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// password Admin@123
// password Supervisor@123
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const waterStored = 14090000;

  const navigate = useNavigate();

  // Initialize token and userRole from localStorage immediately
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );
  const [userData, setUserData] = useState({});

  // Set token from localStorage on initial mount
  useEffect(() => {
    // console.log(backendUrl);
    const storedToken = localStorage.getItem("token");
    const storedUserRole = localStorage.getItem("userRole");

    if (storedToken && !token) {
      setToken(storedToken);
    }

    if (storedUserRole && !userRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  // Logout function to clear tokens and redirect to login
  const logout = () => {
    setToken("");
    setUserRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // Check if user has admin permissions
  const isAdmin = () => {
    return userRole === "admin";
  };

  // Check if user has local supervisor permissions
  const isLocalSupervisor = () => {
    return userRole === "supervisor";
  };

  const [locationData, setLocationData] = useState([]);

  const fetchLocation = async () => {
    // console.log("Help from fetch location")
    try {
      // Added 'await' here - this was the main issue
      const { data } = await axios.get(backendUrl + "/api/sites/info");

      if (data.success) {
        // console.log(data.locationData);

        setLocationData(data.locationData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Location data state

  // const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
    
  }, []);

  // Authentication check function
  const checkAuthStatus = () => {
    const storedToken = localStorage.getItem("token");
    const storedUserRole = localStorage.getItem("userRole");
    const storedUserData = localStorage.getItem("userData");

    if (storedToken && storedUserRole) {
      setToken(storedToken);
      setUserRole(storedUserRole);
      setIsAuthenticated(true);

      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (error) {
          console.error("Error parsing stored user data:", error);
        }
      }
      return true;
    }
    return false;
  };

  function totalWater() {
    let total = 0;
    for (let i = 0; i < locationData.length; i++) {
      total += locationData[i].waterCapacity || 0;
    }
    return total;
  }

  // Update site function
  const updateSite = async (id, data) => {
    try {
      // Determine if we're sending FormData or JSON
      const isFormData = data instanceof FormData;

      const response = await fetch(`${backendUrl}/api/sites/${id}`, {
        method: "PUT",
        headers: isFormData
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        body: isFormData ? data : JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update site");
      }

      // Update the locationData state with the updated site
      setLocationData((prevData) =>
        prevData.map((site) => (site._id === id ? result.site : site))
      );

      return result.site;
    } catch (error) {
      console.error("Error updating site:", error);
      throw error;
    }
  };


  // Delete site function
  const deleteSite = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/sites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete site");
      }

      // Remove the deleted site from locationData
      setLocationData((prevData) => prevData.filter((site) => site._id !== id));

      return true;
    } catch (error) {
      console.error("Error deleting site:", error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    checkAuthStatus,
    navigate,
    backendUrl,
    token,
    setToken,
    userRole,
    setUserRole,
    waterStored,
    logout,
    isAdmin,
    isLocalSupervisor,
    userData,
    setUserData,
    fetchLocation,
    locationData,
    setLocationData,
    setIsAuthenticated,
    totalWater,
    updateSite,
    deleteSite,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

// import { createContext, useEffect, useState } from "react";
// // import { toast } from "react-toastify";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const waterStored = 14090000;
//   // Initialize token from localStorage immediately

//   const navigate = useNavigate();
//   const [token, setToken] =
//   // useState("");
//     useState(localStorage.getItem("token") || "");

//   // Set token from localStorage on initial mount
//   useEffect(() => {
//     console.log(backendUrl)
//     const storedToken = localStorage.getItem("token");
//     if (storedToken && !token) {
//       setToken(storedToken);
//     }
//   }, []);

//   const value = {
//     navigate,
//     backendUrl,
//     token,
//     setToken,
//     waterStored,
//   };

//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };

// export default AppContextProvider;
