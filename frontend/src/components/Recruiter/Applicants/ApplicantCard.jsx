import React from 'react';

export default function ApplicantCard() {
  // Mock data for a single applicant
  const applicant = {
    name: 'John Doe',
    collegeName: 'IIT',
    degree: 'B.Tech',
    specialization: 'Computer Science',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-sm h-72 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Applicant Details
        </h3>

        {/* Student Name and College Name */}
        <div className="flex justify-between mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <p className="text-base text-gray-800">{applicant.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              College:
            </label>
            <p className="text-base text-gray-800">{applicant.collegeName}</p>
          </div>
        </div>

        {/* Degree and Specialization */}
        <div className="flex justify-between mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Degree:
            </label>
            <p className="text-base text-gray-800">{applicant.degree}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Specialization:
            </label>
            <p className="text-base text-gray-800">
              {applicant.specialization}
            </p>
          </div>
        </div>

        {/* Action Buttons (with hover animations and cursor changes) */}
        <div className="mt-auto flex justify-between space-x-2">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transform hover:scale-105 transition duration-200 focus:outline-none focus:ring-0 cursor-pointer">
            Shortlist
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-200 focus:outline-none focus:ring-0 cursor-pointer">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
