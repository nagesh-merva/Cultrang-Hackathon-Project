import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobApplications = () => {
  const [AppliedApps, setAppliedApps] = useState([])
  const student = JSON.parse(sessionStorage.getItem('student'))

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

  useEffect(() => {
    FetchJobApplications()
  }, [])

  const FetchJobApplications = async () => {
    if (!student.name) {
      alert("Student name is missing in session storage")
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:5000/job-applications", {
        params: { student_name: student.name },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // console.log(response)
        setAppliedApps(response.data)
      } else {
        setAppliedApps(["no Applied Applications"])
        alert("Some error occurred")
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Failed to fetch job postings")
      } else {
        alert("An unexpected error occurred")
      }
    }
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Job Applications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {AppliedApps.map((application, index) => (
          <div key={index} className="border border-gray-100 p-6 rounded-md shadow-lg w-full max-w-xs mx-auto">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{application.company}</h3>
            <p className="text-gray-600">Role: {application.job_position}</p>
            <div className="text-gray-600 flex flex-col">
              <p>form filled :</p>
              {application.form.map((field, index) => (
                <label className='border-b border-gray-200 py-1' key={index} htmlFor={field.field_name}>{field.field_name} : <span> {field.value}</span></label>
              ))}
            </div>
            <p className="text-gray-600">Applied on: {formatDateInIST(application.submitted_at)}</p>

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
