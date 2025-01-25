import React, { useState } from "react";
import {
  FaHome,
  FaUserAlt,
  FaClipboardList,
  FaChartLine,
  FaUserCheck,
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ sidebarVisible, onLinkClick }) => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    onLinkClick(link); // Call the parent function to change the selected component
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div
      className={`${
        sidebarVisible ? "block" : "hidden"
      } sm:block bg-white h-screen sticky w-64 z-20 shadow-lg transition-all ease-in-out duration-300`}
    >
      <div className="p-6">
        <div className="flex items-center mb-6 mt-7">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcCAMAAABIzV/hAAAAgVBMVEX8xEH+xT/8wjb8wC38xUD/xj78wTL8yVP+4aj+893/+e//68Tzv0P/xjv////vz4dUZZPqu0n93Zj/+ez/9tR4doIAPbL914j//PfHqnAAOLSRh4H8y1r+8dTy0H9NYp7/yjj/6aQARqRDW6X/7781VpabjXz/6a0hUZr903nRqljhnbcPAAAAfklEQVR4AdxP0wGAUADM9mO29h8wuybofs/Mz8FyPCeIkvTByIqqTdANk31QkmqtsB1XfHKyB2YKIuzefSKxKKUz5weh+ZwhRiSeqASn2SNRpmtZXpRPivNWqqpfLkYiG9WYzIuT5662Y4SP33yv03FyWqzYg4uNkQEoM7wBAKKJB/ikihlkAAAAAElFTkSuQmCC"
            alt="Company Logo"
            className="h-10 w-10 mr-4"
          />
          <h2 className="text-2xl text-slate-600 font-bold">One Shield</h2>
        </div>

        <nav>
          <ul>
            <li
              className={`flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                activeLink === "Dashboard" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleLinkClick("Dashboard")}
            >
              <FaHome className="mr-4" />
              Dashboard
            </li>
            <li
              className={`flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                activeLink === "CompanyProfile" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleLinkClick("CompanyProfile")}
            >
              <FaUserAlt className="mr-4" />
              Company Profile
            </li>
            <li
              className={`flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                activeLink === "JobPostings" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleLinkClick("JobPostings")}
            >
              <FaClipboardList className="mr-3" />
              Job Postings
            </li>
            <li
              className={`flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                activeLink === "Applicants" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleLinkClick("Applicants")}
            >
              <FaUserCheck className="mr-3" />
              Applicants
            </li>
            <li
              className={`flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                activeLink === "Colleges" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleLinkClick("Colleges")}
            >
              <FaBuilding className="mr-4" />
              Colleges
            </li>
            <li
              className={`flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                activeLink === "HiringWorkflow" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleLinkClick("HiringWorkflow")}
            >
              <FaChartLine className="mr-4" />
              Hiring Workflow
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button
            className="flex items-center w-full px-4 py-2 text-black cursor-pointer hover:bg-gray-200 rounded-md"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-3" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
