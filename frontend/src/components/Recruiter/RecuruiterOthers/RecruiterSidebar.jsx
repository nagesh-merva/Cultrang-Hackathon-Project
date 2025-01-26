import {
  FaHome,
  FaUserAlt,
  FaClipboardList,
  FaChartLine,
  FaUserCheck,
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = ({ sidebarVisible, onLinkClick }) => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const companyName = sessionStorage.getItem("company_name");
    setCompanyName(companyName);
  }, []);

  const [activeLink, setActiveLink] = useState("Dashboard");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    onLinkClick(link); // Call the parent function to change the selected component
  };

  const handleLogout = () => {
    // Log out message
    console.log("Logged out");

    // Remove company_name and company_id from sessionStorage
    sessionStorage.removeItem("company_name");
    sessionStorage.removeItem("company_id");
    navigate("/recruiters/auth");
  };

  return (
    <div
      className={`${
        sidebarVisible ? "block" : "hidden"
      } sm:block bg-white h-screen sticky w-64 z-20 shadow-lg transition-all ease-in-out duration-300`}
    >
      <div className="p-6">
        <div className="flex items-center mb-6 mt-7">
          <img src="#" alt="Company Logo" className="h-10 w-10 mr-4" />
          <h2 className="text-2xl text-slate-600 font-bold">{companyName}</h2>
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
