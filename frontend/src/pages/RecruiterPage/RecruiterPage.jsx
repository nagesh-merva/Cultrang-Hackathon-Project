import React, { useState } from "react";
import Sidebar from "../../components/Recruiter/RecuruiterOthers/RecruiterSidebar";
import Navbar from "../../components/Recruiter/RecuruiterOthers/RecruiterNavbar";
import Footer from "../../components/Others/Footer";
import Dashboard from "../../components/Recruiter/Dashboard/Dashboard";
import TopColleges from "../../components/Recruiter/Colleges/TopColleges";
import { FaChartPie } from "react-icons/fa";
import CompanyProfile from "../Recruiter/CompanyProfile";
import JobPosting from "../../components/Recruiter/JobPosting/JobPosting";
import ApplicantList from "../../components/Recruiter/Applicants/ApplicantList";
import Rounds from "../../components/Recruiter/Rounds/Rounds";

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
          <hr className="mb-16 text-gray-300 " />

          {/* Conditional rendering based on the selected component */}
          {selectedComponent === "Dashboard" && <Dashboard />}
          {selectedComponent === "CompanyProfile" && <CompanyProfile />}
          {selectedComponent === "JobPostings" && <JobPosting />}
          {selectedComponent === "Applicants" && <ApplicantList />}
          {selectedComponent === "Colleges" && <TopColleges />}
          {selectedComponent === "HiringWorkflow" && <Rounds />}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RecruiterPage;
