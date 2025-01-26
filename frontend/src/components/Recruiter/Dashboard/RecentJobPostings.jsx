import React, { useState, useEffect } from "react";

const RecentJobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const companyId = sessionStorage.getItem("company_id"); // Retrieve company_id from sessionStorage

  useEffect(() => {
    // Fetch latest job postings based on the company_id
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/job-posting?company_id=${companyId}`
        );
        const data = await response.json();

        console.log(data);
        // Sort jobs by created_at to get the latest ones and slice the first 2
        const latestJobs = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by date
          .slice(0, 2); // Select the first two

        setJobs(latestJobs); // Store the latest two job postings in state
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
    };

    if (companyId) {
      fetchJobs(); // Call fetch function if company_id is available
    }
  }, [companyId]); // Re-run the effect if company_id changes

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
        Recent Job Postings
      </h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left text-sm md:text-base">Job Title</th>
              <th className="py-3 text-left text-sm md:text-base">Company</th>
              <th className="py-3 text-left text-sm md:text-base">Location</th>
              <th className="py-3 text-left text-sm md:text-base">
                Date Posted
              </th>
              <th className="py-3 text-right text-sm md:text-base">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.job_id} className="border-b border-gray-200">
                <td className="py-3 text-sm md:text-base">{job.title}</td>
                <td className="py-3 text-sm md:text-base">{job.company}</td>
                <td className="py-3 text-sm md:text-base">{job.location}</td>
                <td className="py-3 text-sm md:text-base">
                  {new Date(job.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 text-right text-sm md:text-base">
                  {job.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentJobPostings;
