import React from "react";
import ApplicationCard from "./ApplicantCard";

const ApplicantList = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Applicants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
        {/* Here, we are using 1 column on small screens, 2 columns on medium screens, and 3 columns on large screens */}
        <ApplicationCard />

        {/* Add more ApplicationCard components as needed */}
      </div>
    </div>
  );
};

export default ApplicantList;
