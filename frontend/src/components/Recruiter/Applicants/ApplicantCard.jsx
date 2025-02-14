import React, { useState } from "react";
import axios from "axios";

const ApplicantCard = ({ form }) => {
  const { jobPosition, collegeName, formFields, id, status, name } = form;
  const [loading, setLoading] = useState(false);
  console.log(form);

  const UpdateAppStatus = async (Status) => {
    setLoading(true);
    try {
      const response = await axios.put(
        "https://cultrang-hackathon-project.onrender.com/job-applications",
        {
          id: id,
          status: Status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Applicant Hired Sucessfully");
      } else {
        alert("Some error occurred");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Failed to fetch job postings");
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-500 flex flex-col min-w-96 mx-4">
      {" "}
      {/* Added mx-4 for margin between cards */}
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Applicant Details
        </h3>
        {loading ? (
          <div className="place-self-center h-20 w-20 border-4 rounded-full border-b-blue-700 border-gray-400 animate-spin"></div>
        ) : (
          <ul className="space-y-3">
            <li className="flex justify-between text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Applicant name:</span>
              <span className="text-blue-600 font-semibold">{name}</span>
            </li>
            <li className="flex justify-between text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Applied For:</span>
              <span className="text-blue-600 font-semibold">{jobPosition}</span>
            </li>

            <li className="flex justify-between text-gray-700 text-lg">
              <span className="font-medium text-gray-900">College Name:</span>
              <span className="text-green-600 font-semibold">
                {collegeName}
              </span>
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
        )}
      </div>
      {/* Flex container for buttons */}
      <div className="flex mt-auto">
        {/* Shortlist button */}
        {status === "Placed" || status === "Rejected" ? (
          <div className="w-full">
            {status === "Placed" ? (
              <div className="flex-1 py-4 px-4 bg-green-600 text-white font-semibold shadow-md focus:outline-none cursor-pointer">
                <p className="place-self-center">Hired</p>
              </div>
            ) : (
              <div className="flex-1 py-4 px-4  bg-red-500 cursor-pointer text-white font-semibold shadow-md  focus:outline-none">
                <p className="place-self-center">Rejected</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => UpdateAppStatus("Placed")}
              className="flex-1 py-4 px-4 bg-green-600 text-white font-semibold shadow-md hover:bg-green-400 focus:outline-none cursor-pointer"
            >
              Hire
            </button>
            <button
              onClick={() => UpdateAppStatus("Rejected")}
              className="flex-1 py-4 px-4 bg-red-500 cursor-pointer text-white font-semibold shadow-md hover:bg-red-600 focus:outline-none"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicantCard;
