import React, { useState } from "react";
import ApplicationForm from "./ApplicationForm";
import JobPostCard from "./JobPostCard";

const JobPosting = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Function to toggle the ApplicationForm visibility
  const toggleApplicationForm = () => {
    setShowApplicationForm(!showApplicationForm);
  };

  // Function to close the ApplicationForm
  const closeApplicationForm = () => {
    setShowApplicationForm(false);
  };

  return (
    <div>
      {/* Create Job Post Button */}
      <button
        onClick={toggleApplicationForm}
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Create Job Post
      </button>

      {/* Conditionally render the ApplicationForm or JobPostCard */}
      {showApplicationForm ? (
        <div>
          <ApplicationForm />
          {/* Close Button */}
          <button
            onClick={closeApplicationForm}
            className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-4"
          >
            Close
          </button>
        </div>
      ) : (
        // Job Cards Section with Flexbox for two cards in one row
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
          {/* First Job Post Card */}
          <JobPostCard />
        </div>
      )}
    </div>
  );
};

export default JobPosting;
