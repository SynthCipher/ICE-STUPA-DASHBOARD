import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";

const Login = () => {
  const { backendUrl, navigate, token, setToken } = useContext(AppContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      //   const { data } = await axios.post(backendUrl + "/api/user/login", {
      //     email,
      //     password,
      //   });

      //   if (data.success) {
      //     toast.success(data.message);
      //     setToken(data.token);
      //     localStorage.setItem("token", data.token);
      //     navigate('/')
      //   } else {
      //     toast.error(data.message);
      //   }
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className=" bg-gradient-to-br from-blue-50 mb-12 rounded-2xl to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg  rounded-lg sm:px-10 border border-blue-100">
          <form  onSubmit={onSubmitHandler}>
            <div className="flex justify-center">
              <img
                onClick={() => navigate("/")}
                src={assets.logo}
                alt="Logo"
                className="h-20 cursor-pointer"
              />
            </div>

            <p className=" text-center mt-1 text-2xl font-medium text-gray-600">
              Admin Access Portal
            </p>

            <div className="mt-8">
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="admin@example.com"
              />
            </div>

            <div className="mt-4">
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full flex mt-6 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Secure Access
                </span>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Ice Stupa Automation Project © {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
