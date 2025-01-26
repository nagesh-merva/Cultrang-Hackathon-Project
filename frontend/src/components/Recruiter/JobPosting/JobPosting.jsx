import React, { useState, useEffect } from "react";
import ApplicationForm from "./ApplicationForm";
import JobPostCard from "./JobPostCard";

const JobPosting = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [jobPosts, setJobPosts] = useState([]); // To store fetched job posts
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To store any errors

  // Function to toggle the ApplicationForm visibility
  const toggleApplicationForm = () => {
    setShowApplicationForm(!showApplicationForm);
  };

  // Function to close the ApplicationForm
  const closeApplicationForm = () => {
    setShowApplicationForm(false);
  };

  // Fetch job posts based on company_id from session storage
  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const companyId = sessionStorage.getItem("company_id");
        if (!companyId) {
          setError("No company ID found in session storage.");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/job-posting?company_id=${companyId}`
        );
        const data = await response.json();

        // Set job posts received from backend
        setJobPosts(data);
      } catch (err) {
        setError("Failed to fetch job postings.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

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
          {loading ? (
            <p>Loading job posts...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            jobPosts.map((job) => <JobPostCard key={job.id} job={job} />)
          )}
        </div>
      )}
    </div>
  );
};

export default JobPosting;
