import React, { useState, useEffect } from "react";
import axios from "axios";
import JobApplicationForm from "./JobApplicationForm";

const JobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [availJobPostings, setAvailJobPostings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const student = JSON.parse(sessionStorage.getItem("student"));

  useEffect(() => {
    fetchPostings();
  }, []);

  const fetchPostings = async () => {
    if (!student || !student.college) {
      alert("College name is missing in session storage");
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/job-posting/filter",
        {
          params: { college_name: student.college },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const jobs = response.data.jobs;
        const filteredJobs = jobs.filter(
          (job) => job.eligibility && job.eligibility.length > 0
        );
        setAvailJobPostings(filteredJobs);
      } else {
        alert("Some error occurred");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch job postings");
    }
  };

  const formatDateInIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
    });
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseForm = () => {
    setSelectedJob(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-5xl font-extrabold mb-6 text-left ml-8">
        All Job Postings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {availJobPostings.map((job, index) => (
          <div
            key={index}
            className="border ml-8 border-gray-200 p-8 rounded-xl shadow-lg w-full max-w-sm hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {job.company}
            </h3>
            <p className="text-gray-600 mb-2">
              Role: <span className="font-semibold">{job.title}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Location: <span className="font-semibold">{job.location}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Deadline:{" "}
              <span className="font-semibold">
                {formatDateInIST(job.application_deadline)}
              </span>
            </p>
            <button
              onClick={() => handleApplyClick(job)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out cursor-pointer"
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      {selectedJob && (
        <JobApplicationForm job={selectedJob} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default JobPostings;
