import React, { useEffect, useState } from "react";
import { FaPlus, FaPaperPlane } from "react-icons/fa";
import axios from "axios";

const Company = () => {
  const college = sessionStorage.getItem("institute");
  const [jobPostings, setJobPosting] = useState([]);
  const [loadingJobPostings, setLoadingJobPostings] = useState(false);
  const [newEligibilityInputs, setNewEligibilityInputs] = useState({}); // State to store eligibility inputs by job ID

  useEffect(() => {
    FetchPostings();
  }, []);

  const FetchPostings = async () => {
    if (!college) {
      alert("College name is missing in session storage");
      return;
    }

    setLoadingJobPostings(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/job-posting/filter", {
        params: { college_name: college },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setJobPosting(response.data.jobs);
      } else {
        setJobPosting(["no jobs"]);
        alert("Some error occurred");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Failed to fetch job postings");
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setTimeout(() => {
        setLoadingJobPostings(false);
      }, 500);
    }
  };

  const handleEligibilityChange = (jobId, value) => {
    setNewEligibilityInputs((prev) => ({
      ...prev,
      [jobId]: value,
    }));
  };

  const handlePostData = async (jobId, existingEligibility) => {
    const newEligibility = newEligibilityInputs[jobId]?.trim();

    if (!newEligibility) {
      alert("Please enter valid eligibility criteria");
      return;
    }

    const updatedEligibility = [...existingEligibility, newEligibility];

    try {
      const response = await axios.put(
        "http://127.0.0.1:5000/job-posting",
        {
          job_id: jobId,
          eligibility: updatedEligibility,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Eligibility updated successfully!");
        setNewEligibilityInputs((prev) => ({
          ...prev,
          [jobId]: "", // Reset input for this job after successful update
        }));
        FetchPostings(); // Refresh job postings
      } else {
        alert(response.data.error || "Failed to update eligibility");
      }
    } catch (error) {
      alert("An error occurred while updating eligibility");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Company</h2>
      {loadingJobPostings ? (
        <div className="place-self-center h-20 w-20 border-4 rounded-full border-b-blue-700 border-gray-400 animate-spin"></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobPostings.map((job, index) => (
            <div
              key={index}
              className="relative bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-start"
            >
              <div className="w-full">
                <h3 className="text-xl font-semibold">{job.company}</h3>
                <p className="text-sm text-gray-500">Job: {job.title}</p>
                <p className="text-sm text-gray-500">Type: {job.job_type}</p>
                <p className="text-sm text-gray-500">Package: {job.package}</p>
                <ul className="mt-2 text-sm text-gray-700">
                  {job.eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex w-10/12 justify-between">
                  <input
                    type="text"
                    value={newEligibilityInputs[job.id] || ""}
                    onChange={(e) => handleEligibilityChange(job.id, e.target.value)}
                    placeholder="Add new eligibility criteria"
                    className="p-2 border rounded-md w-5/6"
                  />
                  <button
                    onClick={() => handlePostData(job.id, job.eligibility)}
                    className="w-10 h-10 bg-green-500 text-white rounded-full"
                  >
                    <FaPlus className="place-self-center" />
                  </button>
                </div>
              </div>

              {/* Icons */}
              <div className="flex flex-col items-center space-y-2">
                {/* Post Button */}
                <button
                  onClick={() => ""}
                  className="absolute top-2 right-4 px-4 py-2 flex items-center bg-green-500 text-white rounded-md"
                >
                  <FaPaperPlane className="inline mr-2" />
                  Post
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Company;
