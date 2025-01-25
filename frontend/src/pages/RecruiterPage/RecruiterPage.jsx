import React, { useState } from "react";
import Sidebar from "../../components/Recruiter/RecuruiterOthers/RecruiterSidebar";
import Navbar from "../../components/Recruiter/RecuruiterOthers/RecruiterNavbar";
import Footer from "../../components/Others/Footer";
import Dashboard from "../../components/Recruiter/Dashboard/Dashboard";
import TopColleges from "../../components/Recruiter/Colleges/TopColleges";
import { FaChartPie } from "react-icons/fa";

// import CompanyProfile from "../components/CompanyProfile";
// import JobPosting from "../components/JobPosting";
// import Applicants from "../components/Applicants";
// import HiringWorkflow from "../components/HiringWorkflow";

const RecruiterPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  const handleLinkClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="bg-gray-100 py-8 flex">
        <Sidebar
          sidebarVisible={sidebarVisible}
          onLinkClick={handleLinkClick} // Pass the handler to Sidebar
        />
        <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="my-10 flex items-center  gap-4
"
          >
            <h2 className="text-6xl font-extrabold text-slate-700">
              Operations PowerBoard
            </h2>

            <FaChartPie className="text-slate-700 text-6xl" />
          </div>
          {/* Conditional rendering based on the selected component */}
          {selectedComponent === "Dashboard" && <Dashboard />}
          {/* {selectedComponent === "CompanyProfile" && <CompanyProfile />}
          {selectedComponent === "JobPostings" && <JobPosting />}
          {selectedComponent === "Applicants" && <Applicants />} */}
          {selectedComponent === "Colleges" && <TopColleges />}
          {/* {selectedComponent === "HiringWorkflow" && <HiringWorkflow />} */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RecruiterPage;
