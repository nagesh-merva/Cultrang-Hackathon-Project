import React from "react";

const RecentJobPostings = () => {
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
              <th className="py-3 text-right text-sm md:text-base">
                Applicants
              </th>
              <th className="py-3 text-right text-sm md:text-base">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 text-sm md:text-base">Software Engineer</td>
              <td className="py-3 text-sm md:text-base">Google</td>
              <td className="py-3 text-sm md:text-base">San Francisco, CA</td>
              <td className="py-3 text-sm md:text-base">Sep 16, 2021</td>
              <td className="py-3 text-right text-sm md:text-base">214</td>
              <td className="py-3 text-right text-sm md:text-base">Open</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 text-sm md:text-base">Product Manager</td>
              <td className="py-3 text-sm md:text-base">Google</td>
              <td className="py-3 text-sm md:text-base">New York, NY</td>
              <td className="py-3 text-sm md:text-base">Aug 22, 2021</td>
              <td className="py-3 text-right text-sm md:text-base">137</td>
              <td className="py-3 text-right text-sm md:text-base">Closed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentJobPostings;
