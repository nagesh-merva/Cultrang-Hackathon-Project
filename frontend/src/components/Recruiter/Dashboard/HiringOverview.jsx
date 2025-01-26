import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaChartLine,
  FaUserCheck,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";

const HiringOverview = () => {
  const [jobPostingsCount, setJobPostingsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0); // Added state for applications count
  const [collegesCount, setCollegesCount] = useState(0); // Added state for colleges count
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const companyId = sessionStorage.getItem("company_id");

    if (companyId) {
      // Fetch job postings count for the company
      axios
        .get("http://localhost:5000/job-posting", {
          params: { company_id: companyId },
        })
        .then((response) => {
          if (response.status === 200) {
            setJobPostingsCount(response.data.length); // Assuming the response returns a list of jobs
          }
        })
        .catch((error) => {
          console.error(
            "Error fetching job postings:",
            error.response || error.message
          );
          setJobPostingsCount(0); // Fallback to 0 if error occurs
        });

      // Fetch applications count for the company
      axios
        .get("http://localhost:5000/job-applications", {
          params: { company_id: companyId },
        })
        .then((response) => {
          if (response.status === 200) {
            setApplicationsCount(response.data.length); // Assuming the response returns a list of applications
          }
        })
        .catch((error) => {
          console.error(
            "Error fetching job applicants:",
            error.response || error.message
          );
          setApplicationsCount(0); // Fallback to 0 if error occurs
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // Fetch colleges count
    axios
      .get("http://localhost:5000/allcollages")
      .then((response) => {
        if (response.status === 200) {
          setCollegesCount(response.data.length); // Get the number of colleges
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching colleges:",
          error.response || error.message
        );
        setCollegesCount(0); // Fallback to 0 if error occurs
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Hiring Overview
      </h1>
      {/* Grid Layout for Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Job Postings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaClipboardList className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              Job Postings
            </h3>
          </div>
          <p className="text-4xl font-bold text-gray-900">
            {isLoading ? "Loading..." : jobPostingsCount}
          </p>
        </div>
        {/* Applicants */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaUserCheck className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Applicants</h3>
          </div>
          <p className="text-4xl font-bold text-gray-900">
            {isLoading ? "Loading..." : applicationsCount}
          </p>
        </div>
        {/* Top Colleges */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaBuilding className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              Top Colleges
            </h3>
          </div>
          <p className="text-4xl font-bold text-gray-900">
            {isLoading ? "Loading..." : collegesCount}
          </p>
        </div>
        {/* Job Progress */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaChartLine className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              Hiring Progress
            </h3>
          </div>
          <p className="text-4xl font-bold text-gray-900">82%</p>
        </div>
      </div>
    </div>
  );
};

export default HiringOverview;
