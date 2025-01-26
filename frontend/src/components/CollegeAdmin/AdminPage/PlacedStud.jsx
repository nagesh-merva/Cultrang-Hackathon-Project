import React, { useState, useEffect } from "react";
import axios from "axios";

// // Mock data for placed students
// const placedStudents = [
//   {
//     name: "John Doe",
//     rollNo: "12345",
//     email: "john.doe@example.com",
//     company: "TechCorp",
//   },
//   {
//     name: "Jane Smith",
//     rollNo: "67890",
//     email: "jane.smith@example.com",
//     company: "InnovateX",
//   },
//   // Add more student objects as needed
// ]

const PlacedStud = () => {
  const [application, setApplications] = useState([])
  const [placements, setPlacements] = useState([])
  const [loadingApplications, setLoadingApplications] = useState(false)

  const college = sessionStorage.getItem("institute")

  useEffect(() => {
    FetchApplications()
  }, [])

  const FetchApplications = async () => {
    if (!college) {
      alert("College name is missing in session storage")
      return
    }

    setLoadingApplications(true)

    try {
      const response = await axios.get("http://127.0.0.1:5000/student-job-posting/filter", {
        params: { college_name: college },
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.status === 200) {
        setApplications(response.data.applications)
        filterAndSetPlacements(response.data.applications)
      } else {
        alert("Some error occurred")
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Failed to fetch job applications")
      } else {
        alert("An unexpected error occurred")
      }
    } finally {
      setTimeout(() => {
        setLoadingApplications(false)
      }, 500)

    }
  }

  const filterAndSetPlacements = (apps) => {
    const placedApplications = apps.filter((app) => app.status === "Placed")
    setPlacements(placedApplications);
  }

  const formatDateInIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Placed Students</h2>

      {/* Student Cards: Responsive Grid */}
      {loadingApplications ? (
        <div className="place-self-center h-20 w-20 border-4 rounded-full border-b-blue-700 border-gray-400 animate-spin"></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {placements.map((student, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 min-h-[120px] max-w-full"
            >
              {/* Student Details */}
              <div className="flex flex-col space-y-2 w-full text-left">
                <h3 className="text-sm font-semibold text-gray-800">{student.student_name}</h3>
                <p className="text-xs text-gray-600">Position: {student.job_position}</p>
                <p className="text-xs text-gray-600">Company: {student.company}</p>
                <p className="text-xs text-gray-600">Placed on : {formatDateInIST(student.updated_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacedStud;
