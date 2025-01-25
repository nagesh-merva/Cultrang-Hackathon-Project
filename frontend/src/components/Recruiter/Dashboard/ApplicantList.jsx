import React from "react";

const ApplicantList = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
        New Applicants
      </h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left">Name</th>
              <th className="py-3 text-left">College</th>
              <th className="py-3 text-left">Applied Date</th>
              <th className="py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3">John Doe</td>
              <td className="py-3">Stanford University</td>
              <td className="py-3">Sep 18, 2021</td>
              <td className="py-3 text-right">Interview</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3">Jane Smith</td>
              <td className="py-3">University of California, Berkeley</td>
              <td className="py-3">Aug 30, 2021</td>
              <td className="py-3 text-right">Offer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantList;
