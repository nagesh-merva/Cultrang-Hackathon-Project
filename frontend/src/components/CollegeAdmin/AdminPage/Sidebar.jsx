import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaUserCheck,
  FaSignOutAlt,
  FaHotel,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarVisible, onLinkClick }) => {
  const storedActiveLink = sessionStorage.getItem("activeLink") || "Dashboard";
  const [activeLink, setActiveLink] = useState(storedActiveLink);
  const navigate = useNavigate();

  console.log(activeLink);
  const handleLinkClick = (link) => {
    setActiveLink(link);
    sessionStorage.setItem("activeLink", link);
    onLinkClick(link); // Call the parent function to change the selected component
  };

  useEffect(() => {
    const storedActiveLink = sessionStorage.getItem("activeLink");
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }
  }, []);

  const logout = () => {
    console.log("logged out");
    sessionStorage.setItem("institute", null);
    navigate("/college/auth");
  };

  return (
    <div
      className={`${
        sidebarVisible ? "block" : "hidden"
      } sm:block bg-gray-800 w-64 h-full sticky top-0 z-10 shadow-lg transition-all ease-in-out duration-300 flex flex-col`}
    >
      {/* Sidebar Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center mb-6 mt-7">
          <h2 className="text-2xl text-white font-bold ml-10">GEC</h2>
        </div>

        <nav>
          <ul className="space-y-2">
            <li
              className={`flex items-center px-4 py-3 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-200 ${
                activeLink === "Dashboard" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleLinkClick("Dashboard")}
            >
              <FaHome className="mr-4 text-white" />
              <span className="text-white">Dashboard</span>
            </li>
            <li
              className={`flex items-center px-4 py-3 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-200 ${
                activeLink === "Company" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleLinkClick("Company")}
            >
              <FaBuilding className="mr-4 text-white" />
              <span className="text-white">Company</span>
            </li>
            <li
              className={`flex items-center px-4 py-3 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-200 ${
                activeLink === "Registered Students" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleLinkClick("Registered Students")}
            >
              <FaUsers className="mr-4 text-white" />
              <span className="text-white">Registered Students</span>
            </li>
            <li
              className={`flex items-center px-4 py-3 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-200 ${
                activeLink === "Placed Students" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleLinkClick("Placed Students")}
            >
              <FaUserCheck className="mr-4 text-white" />
              <span className="text-white">Placed Students</span>
            </li>
            <li
              className={`flex items-center px-4 py-3 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-200 ${
                activeLink === "College Profile" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleLinkClick("College Profile")}
            >
              <FaHotel className="mr-4 text-white" />
              <span className="text-white">College Profile</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-6 mt-auto">
        <button
          className="flex items-center px-4 py-3 w-full text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-md transition-all duration-200"
          onClick={logout}
        >
          <FaSignOutAlt className="mr-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
