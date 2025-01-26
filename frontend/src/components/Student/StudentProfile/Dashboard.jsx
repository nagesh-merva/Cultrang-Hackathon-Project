import React from 'react';
import { FaUserAlt, FaBuilding, FaHourglassHalf } from 'react-icons/fa';

const applicationStatus = [
  { company: 'Company ABC', status: 'Accepted' },
  { company: 'Company XYZ', status: 'Pending' },
  { company: 'Company LMN', status: 'Rejected' },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-white min-h-screen flex flex-col justify-center items-center space-y-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <div className="bg-white w-full p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-2 hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-blue-800 flex items-center space-x-2 mb-4">
            <FaUserAlt className="text-3xl text-blue-600" />
            <span>Personal Information</span>
          </h3>
          <p className="text-lg text-gray-700">Name: John Doe</p>
          <p className="text-lg text-gray-700">Email: john.doe@example.com</p>
          <p className="text-lg text-gray-700">Phone: +1 123 456 7890</p>
          <p className="text-lg text-gray-700">Address: 123 Main St, City, Country</p>
        </div>

        {/* Applied Companies Card */}
        <div className="bg-white w-full p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-2 hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-teal-800 flex items-center space-x-2 mb-4">
            <FaBuilding className="text-3xl text-teal-600" />
            <span>Applied Companies</span>
          </h3>
          <p className="text-lg text-gray-700">Company ABC - Software Engineer</p>
          <p className="text-lg text-gray-700">Company XYZ - Data Analyst</p>
          <p className="text-lg text-gray-700">Company LMN - Frontend Developer</p>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {/* Applicant Status Card */}
        <div className="bg-white w-full p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-2 hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-yellow-800 flex items-center space-x-2 mb-4">
            <FaHourglassHalf className="text-3xl text-yellow-600" />
            <span>Applicant Status</span>
          </h3>
          <div className="space-y-4">
            {applicationStatus.map((application, index) => (
              <div key={index} className="flex items-center justify-between pb-3 mb-3">
                <p className="text-lg text-gray-800">{application.company}:</p>
                <p
                  className={`text-lg font-semibold ${
                    application.status === 'Accepted'
                      ? 'text-green-600'
                      : application.status === 'Rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {application.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
