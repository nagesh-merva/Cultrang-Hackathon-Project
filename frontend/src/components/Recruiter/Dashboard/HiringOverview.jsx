import React from "react";
import {
  FaChartLine,
  FaUserCheck,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";

const HiringOverview = () => {
  return (
    <div>
      <h1 className="text-2xl  font-extrabold text-gray-900 mb-6">
        Hiring Overview
      </h1>
      {/* Grid Layout for Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Job Postings */}
        <div className="bg-white  rounded-lg  shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaClipboardList className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              Job Postings
            </h3>
          </div>
          <p className="text-4xl  font-bold text-gray-900">58</p>
        </div>
        {/* Applicants */}
        <div className="bg-white  rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaUserCheck className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Applicants</h3>
          </div>
          <p className="text-4xl font-bold text-gray-900">2,397</p>
        </div>
        {/* Top Colleges */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaBuilding className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              Top Colleges
            </h3>
          </div>
          <p className="text-4xl font-bold text-gray-900">31</p>
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
