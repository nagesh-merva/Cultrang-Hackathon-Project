import React from 'react';

export default function JobPostCard() {
  const jobPost = {
    title: 'Frontend Developer',
    company: 'TechCorp',
    companyLogo: '', // Placeholder logo URL (replace with actual logo)
    location: 'San Francisco, CA',
    description:
      'We are looking for a passionate frontend developer to join our dynamic team. You will be responsible for building user interfaces and working closely with backend developers.',
    requirements: [
      'Proficiency in HTML, CSS, and JavaScript',
      'Experience with React or other frontend frameworks',
      'Good understanding of responsive design',
    ],
    applicationFields: [
      { label: 'Resume', type: 'file', required: true },
      { label: 'Portfolio', type: 'url', required: false },
    ],
    colleges: ['IIT', 'NIT'],
    deadline: '2025-12-31', // Example deadline
    jobType: 'Full-time', // Example job type
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 my-4 max-w-xl mx-auto"> {/* Slightly wider */}
      <div className="flex items-center mb-2">
        <img src={jobPost.companyLogo} alt="Logo" className="w-12 h-12 mr-4" />
        <h1 className="text-lg font-semibold text-gray-800">{jobPost.company}</h1>
      </div>
      <h3 className="text-md font-medium text-gray-800 mt-2">{jobPost.title}</h3>
      <p className="text-sm text-gray-600">{jobPost.location}</p>
      <p className="text-sm text-gray-700 mt-2">{jobPost.description}</p>

      <div className="mt-3 grid grid-cols-1 gap-3">
        {/* Job Type */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">Job Type:</h3>
          <p className="text-sm text-gray-700">{jobPost.jobType}</p>
        </div>

        {/* Requirements section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">Requirements:</h3>
          <ul className="list-disc list-inside text-sm">
            {jobPost.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))}
          </ul>
        </div>

        {/* Application Fields section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">Application Fields:</h3>
          <ul className="list-disc list-inside text-sm">
            {jobPost.applicationFields.map((field, index) => (
              <li key={index} className="text-gray-700">
                {field.label} ({field.type})
              </li>
            ))}
          </ul>
        </div>

        {/* Deadline moved below to align with colleges */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">Deadline:</h3>
          <p className="text-sm text-gray-700">{jobPost.deadline}</p>
        </div>

        {/* Selected Colleges section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">Selected Colleges:</h3>
          <p className="text-sm text-gray-700">{jobPost.colleges.length > 0 ? jobPost.colleges.join(', ') : 'None selected'}</p>
        </div>
      </div>
    </div>
  );
}
