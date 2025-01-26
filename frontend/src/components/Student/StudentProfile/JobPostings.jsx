import React from 'react';

const JobPostings = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-left">Job Postings</h2> {/* Title aligned left */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Job Posting Card 1 */}
        <div className="border ml-8 border-gray-200 p-8 rounded-xl shadow-lg w-full max-w-sm hover:shadow-2xl transition-all duration-300 ease-in-out">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Company ABC</h3>
          <p className="text-gray-600 mb-2">Role: <span className="font-semibold">Software Engineer</span></p>
          <p className="text-gray-600 mb-2">Location: <span className="font-semibold">New York, NY</span></p>
          <p className="text-gray-600 mb-4">Deadline: <span className="font-semibold">2025-02-28</span></p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out cursor-pointer">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostings;
