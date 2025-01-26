import React from "react";
import { FaBuilding } from "react-icons/fa";

export default function JobPostCard({ job }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 my-4 max-w-xl mx-auto">
      <div className="flex items-center mb-2">
        {/* Display company logo if available */}
        <FaBuilding className="text-blue-500 text-4xl" />
        <h1 className="text-lg font-semibold text-gray-800">{job.company}</h1>
      </div>
      <h3 className="text-md font-medium text-gray-800 mt-2">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p className="text-sm text-gray-700 mt-2">{job.description}</p>

      <div className="mt-3 grid grid-cols-1 gap-3">
        {/* Job Type */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">Job Type:</h3>
          <p className="text-sm text-gray-700">{job.job_type}</p>
        </div>

        {/* Requirements section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">Requirements:</h3>
          <ul className="list-disc list-inside text-sm">
            {job.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Application Fields section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">
            Application Fields:
          </h3>
          <ul className="list-disc list-inside text-sm">
            {job.form.map((field, index) => (
              <li key={index} className="text-gray-700">
                {field.field_name} ({field.field_type})
              </li>
            ))}
          </ul>
        </div>

        {/* Deadline section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">Deadline:</h3>
          <p className="text-sm text-gray-700">{job.application_deadline}</p>
        </div>

        {/* Selected Colleges section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800">
            Selected Colleges:
          </h3>
          <p className="text-sm text-gray-700">
            {job.selected_collages.length > 0
              ? job.selected_collages.join(", ")
              : "None selected"}
          </p>
        </div>
      </div>
    </div>
  );
}
