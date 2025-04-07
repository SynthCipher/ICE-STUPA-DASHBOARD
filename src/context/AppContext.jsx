import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const waterStored = 14090000;
  // Initialize token from localStorage immediately

  const navigate = useNavigate();
  const [token, setToken] = useState("324213423");
  //   useState(localStorage.getItem("token") || "");

  // Set token from localStorage on initial mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, []);

  const value = {
    navigate,
    backendUrl,
    token,
    setToken,
    waterStored,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
