import React, { useState } from 'react';

const JobApplications = () => {
  const [applications, setApplications] = useState([
    {
      companyName: 'Company ABC',
      role: 'Software Engineer',
      location: 'New York, NY',
      deadline: '2025-02-28',
      status: 'Pending', // Status can be 'Pending', 'Accepted', or 'Rejected'
    },
    {
      companyName: 'Company XYZ',
      role: 'Data Analyst',
      location: 'San Francisco, CA',
      deadline: '2025-03-15',
      status: 'Accepted',
    },
    {
      companyName: 'Company LMN',
      role: 'Product Manager',
      location: 'Los Angeles, CA',
      deadline: '2025-04-01',
      status: 'Rejected',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Pending':
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Job Applications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((application, index) => (
          <div key={index} className="border border-gray-100 p-6 rounded-md shadow-lg w-full max-w-xs mx-auto">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{application.companyName}</h3>
            <p className="text-gray-600">Role: {application.role}</p>
            <p className="text-gray-600">Location: {application.location}</p>
            <p className="text-gray-600">Deadline: {application.deadline}</p>

            {/* Status */}
            <div className={`mt-4 inline-block py-1 px-4 rounded-full text-white ${getStatusColor(application.status)}`}>
              {application.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplications;
