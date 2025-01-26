import React from "react";

const ApplicantCard = ({ form }) => {
  const { jobPosition, collegeName, formFields, studentName } = form;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-500 flex flex-col min-w-96 mx-4">
      {" "}
      {/* Added mx-4 for margin between cards */}
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Applicant Details
        </h3>

        <ul className="space-y-3">
          <li className="flex justify-between text-gray-700 text-lg">
            <span className="font-medium text-gray-900">Name:</span>
            <span className="text-black font-semibold">{studentName}</span>
          </li>

          <li className="flex justify-between text-gray-700 text-lg">
            <span className="font-medium text-gray-900">Applied For:</span>
            <span className="text-blue-600 font-semibold">{jobPosition}</span>
          </li>

          <li className="flex justify-between text-gray-700 text-lg">
            <span className="font-medium text-gray-900">College Name:</span>
            <span className="text-green-600 font-semibold">{collegeName}</span>
          </li>

          {Object.entries(formFields).map(([key, value], index) => (
            <li
              key={index}
              className="flex justify-between text-gray-700 text-lg"
            >
              <span className="font-medium text-gray-900">{key}:</span>
              <span className="text-gray-700">{value}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Flex container for buttons */}
      <div className="flex mt-auto">
        {/* Shortlist button */}
        <button className="flex-1 py-4 px-4 bg-green-600 text-white font-semibold shadow-md hover:bg-green-400 focus:outline-none cursor-pointer">
          Shortlist
        </button>

        {/* Reject button */}
        <button className="flex-1 py-4 px-4 bg-red-500 cursor-pointer text-white font-semibold shadow-md hover:bg-red-600 focus:outline-none">
          Reject
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;
