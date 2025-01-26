import React, { useEffect, useState } from "react";
import { FaUserAlt, FaBuilding, FaHourglassHalf } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const student = JSON.parse(sessionStorage.getItem("student"));
  const [AppliedApps, setAppliedApps] = useState([]);

  useEffect(() => {
    FetchJobApplications();
  }, []);
  // console.log(AppliedApps)

  const FetchJobApplications = async () => {
    if (!student.name) {
      alert("Student name is missing in session storage");
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/job-applications",
        {
          params: { student_name: student.name },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // console.log(response)
        setAppliedApps(response.data);
      } else {
        setAppliedApps(["no Applied Applications"]);
        alert("Some error occurred");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Failed to fetch job postings");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  // console.log(student)
  return (
    <div className="p-6 bg-white min-h-screen flex flex-col justify-center items-center space-y-6">
      <h2 className="text-6xl font-extrabold text-blue-900">
        Student Dashboard
      </h2>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white w-full p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-2 hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-blue-800 flex items-center space-x-2 mb-4">
            <FaUserAlt className="text-3xl text-blue-600" />
            <span className="text-blue-800 font-semibold">
              Personal Information
            </span>
          </h3>
          <p className="text-lg text-gray-700">Name: {student.name}</p>
          <hr className="text-gray-300 my-2" />
          <p className="text-lg text-gray-700">Email: {student.email}</p>
          <hr className="text-gray-300 my-2" />
          <p className="text-lg text-gray-700">Phone: {student.phone}</p>
          <hr className="text-gray-300 my-2" />
          <p className="text-lg text-gray-700">Rollno: {student.rollno}</p>
          <hr className="text-gray-300 my-2" />
        </div>
        <div className="bg-white w-full p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-2 hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-teal-800 flex items-center space-x-2 mb-4">
            <FaBuilding className="text-3xl text-teal-600" />
            <span className="text-teal-800 font-bold">Applied Companies</span>
          </h3>
          {AppliedApps.map((app, index) => (
            <div>
              <ul key={index} className="text-lg text-gray-700">
                <li>
                  {" "}
                  Company: {app.company} - {app.job_position}
                </li>
              </ul>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        <div className="bg-white w-full p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-2 hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-yellow-800 flex items-center space-x-2 mb-4">
            <FaHourglassHalf className="text-3xl text-yellow-600" />
            <span>Applicant Status</span>
          </h3>
          <div className="space-y-4">
            {AppliedApps.map((application, index) => (
              <div>
                <div
                  key={index}
                  className="flex items-center justify-between pb-3  mb-3"
                >
                  <p className="text-lg text-gray-800">
                    {application.company}:
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      application.status === "Accepted" ||
                      application.status == "placed"
                        ? "text-green-600"
                        : application.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {application.status}
                  </p>
                </div>
                <hr className="border-t border-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
