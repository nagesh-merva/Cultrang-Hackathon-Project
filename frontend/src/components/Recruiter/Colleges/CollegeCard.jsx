import React from "react";

const CollegeCard = ({ college }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-lg bg-white overflow-hidden">
      {/* College Logo */}
      <img
        src={college.logo}
        alt={`${college.name} Logo`}
        className="w-full h-32 object-cover"
      />
      <div className="p-6">
        {/* College Name */}
        <h2 className="text-xl font-semibold text-gray-800">{college.name}</h2>

        {/* College Location */}
        <p className="text-sm text-gray-600">{college.location}</p>

        {/* Contact Info */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <strong>Email: </strong>
            {college.contactEmail}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Phone: </strong>
            {college.contactPhone}
          </p>
        </div>

        {/* Action Button (optional) */}
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
