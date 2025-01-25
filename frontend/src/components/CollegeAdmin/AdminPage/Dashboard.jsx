import React from "react";

const Dashboard = () => {
  // Mock data for job postings and placements
  const jobPostings = [
    { company: "TechCorp", position: "Software Engineer", postedOn: "Jan 10, 2025" },
    { company: "DevInc", position: "Frontend Developer", postedOn: "Jan 12, 2025" },
  ];

  const placements = [
    { studentName: "John Doe", company: "TechCorp", position: "Software Engineer", placementDate: "Jan 15, 2025" },
    { studentName: "Jane Smith", company: "DevInc", position: "Frontend Developer", placementDate: "Jan 17, 2025" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10 mx-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h2>
      
      {/* Recent Job Postings */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Recent Job Postings</h3>
        <ul>
          {jobPostings.map((job, index) => (
            <li key={index} className="p-4 border-b last:border-b-0 hover:bg-white transition-all">
              <p className="text-lg font-medium text-slate-800">{job.position} at {job.company}</p>
              <p className="text-sm text-gray-500">Posted on: {job.postedOn}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Placements */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Recent Placements</h3>
        <ul>
          {placements.map((placement, index) => (
            <li key={index} className="p-4 border-b last:border-b-0 hover:bg-gray-100 transition-all">
              <p className="text-lg font-medium text-slate-800">{placement.studentName}</p>
              <p className="text-sm text-gray-500">
                Placed at {placement.company} as {placement.position} on {placement.placementDate}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
