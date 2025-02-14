import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const RegStud = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const college = sessionStorage.getItem("institute");

  useEffect(() => {
    FetchAllSts();
  }, []);
  const FetchAllSts = async () => {
    if (!college) {
      alert("College name is missing in session storage");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        "https://cultrang-hackathon-project.onrender.com/allstudents-details",
        {
          params: { college_name: college },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAllStudents(response.data);
      } else {
        setAllStudents(["no jobs"]);
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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Registered Students
      </h2>

      {loading ? (
        <div className="place-self-center h-20 w-20 border-4 rounded-full border-b-blue-700 border-gray-400 animate-spin"></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {allStudents.map((student, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-x-4 min-h-[180px] max-w-full"
            >
              {/* Profile Picture */}
              <FaUserCircle className="text-gray-500 text-6xl" />

              {/* Student Details */}
              <div className="flex flex-col sm:flex-row w-full text-left space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col justify-between flex-grow min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-600">{student.college}</p>
                </div>
                <div className="flex flex-col justify-between flex-grow min-w-0">
                  <p className="text-sm text-gray-600">
                    Roll No: {student.rollNo}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {student.email}
                  </p>
                </div>
                <div className="flex flex-col justify-between flex-grow min-w-0">
                  <p className="text-sm text-gray-600">
                    Phone: {student.phone}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegStud;
