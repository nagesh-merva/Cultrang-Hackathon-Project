import React from "react";
import HiringOverview from "./HiringOverview";
import RecentJobPostings from "./RecentJobPostings";
import ApplicantList from "./ApplicantList";
const Dashboard = () => {
  return (
    <div>
      <HiringOverview />
      <hr className="my-12 text-gray-300 " />
      <RecentJobPostings />
      <hr className="my-12 text-gray-300" />
      <ApplicantList />
    </div>
  );
};

export default Dashboard;
