import React from 'react';
import { FaMailBulk, FaPhoneAlt } from 'react-icons/fa';

const Contact = ({ collegeEmail, setCollegeEmail, collegePhone, setCollegePhone, isEditing }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
      {/* Email Card */}
      <div className="border border-gray-300 shadow-lg rounded-lg p-4 transition-all hover:shadow-xl hover:scale-105 min-h-[150px]">
        <div className="mt-6 flex justify-center text-blue-600">
          <FaMailBulk size={30} />
        </div>
        {isEditing ? (
          <input
            type="email"
            className="mt-3 text-lg text-gray-700 border-2 border-gray-300 p-2 rounded-lg focus:outline-none w-full"
            value={collegeEmail}
            onChange={(e) => setCollegeEmail(e.target.value)}
          />
        ) : (
          <p className="mt-3 text-lg text-gray-700">
            Contact us at <strong>{collegeEmail}</strong>
          </p>
        )}
      </div>

      {/* Phone Card */}
      <div className="border border-gray-300 shadow-lg rounded-lg p-4 transition-all hover:shadow-xl hover:scale-105 min-h-[150px]">
        <div className="mt-6 flex justify-center text-blue-600">
          <FaPhoneAlt size={30} />
        </div>
        {isEditing ? (
          <input
            type="text"
            className="mt-3 text-lg text-gray-700 border-2 border-gray-300 p-2 rounded-lg focus:outline-none w-full"
            value={collegePhone}
            onChange={(e) => setCollegePhone(e.target.value)}
          />
        ) : (
          <p className="mt-3 text-lg text-gray-700">
            Call us at <strong>{collegePhone}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
