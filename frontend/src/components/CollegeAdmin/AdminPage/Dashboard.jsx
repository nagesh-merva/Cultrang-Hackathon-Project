import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [jobPostings, setJobPosting] = useState([]);
  const [application, setApplications] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [loadingJobPostings, setLoadingJobPostings] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);

  const college = sessionStorage.getItem("institute");

  useEffect(() => {
    FetchPostings();
    FetchApplications();
  }, []);

  const FetchPostings = async () => {
    if (!college) {
      alert("College name is missing in session storage");
      return;
    }

    setLoadingJobPostings(true);

    try {
      const response = await axios.get(
        "https://cultrang-hackathon-project.onrender.com/job-posting/filter",
        {
          params: { college_name: college },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  const FetchApplications = async () => {
    if (!college) {
      alert("College name is missing in session storage");
      return;
    }

    setLoadingApplications(true);

    try {
      const response = await axios.get(
        "https://cultrang-hackathon-project.onrender.com/student-job-posting/filter",
        {
          params: { college_name: college },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setApplications(response.data.applications);
        filterAndSetPlacements(response.data.applications);
      } else {
        alert("Some error occurred");
      }
    } catch (error) {
      if (error.response) {
        alert(
          error.response.data.message || "Failed to fetch job applications"
        );
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setTimeout(() => {
        setLoadingApplications(false);
      }, 500);
    }
  };

  const filterAndSetPlacements = (apps) => {
    const placedApplications = apps.filter((app) => app.status === "Placed");
    setPlacements(placedApplications);
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10 mx-6">
      <h2 className="text-5xl font-extrabold text-slate-800 mb-6">
        Admin Dashboard
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
        <h3 className="text-2xl font-bold text-slate-700 mb-4">
          Recent Job Postings
        </h3>
        {loadingJobPostings ? (
          <div className="place-self-center h-20 w-20 border-4 rounded-full border-b-blue-700 border-gray-400 animate-spin"></div>
        ) : (
          <ul>
            {jobPostings.length > 0 ? (
              jobPostings.map((job, index) => (
                <li
                  key={index}
                  className="p-4 border-b last:border-b-0 hover:bg-white transition-all"
                >
                  <p className="text-lg font-medium text-slate-800">
                    {job.title} at {job.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    Posted on: {formatDateInIST(job.created_at)}
                  </p>
                </li>
              ))
            ) : (
              <p>No job postings available</p>
            )}
          </ul>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold text-slate-700 mb-4">
          Recent Placements
        </h3>
        {loadingApplications ? (
          <div className="place-self-center h-20 w-20 border-4 rounded-full border-b-blue-700 border-gray-400 animate-spin"></div>
        ) : (
          <ul>
            {placements.length > 0 ? (
              placements.map((placement, index) => (
                <li
                  key={index}
                  className="p-4 border-b last:border-b-0 hover:bg-gray-100 transition-all"
                >
                  <p className="text-lg font-medium text-slate-800">
                    {placement.student_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed at {placement.company} as {placement.job_position} on{" "}
                    {placement.updated_at}
                  </p>
                </li>
              ))
            ) : (
              <p>No placements available</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
