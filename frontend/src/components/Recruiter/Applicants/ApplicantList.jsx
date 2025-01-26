import React, { useEffect, useState } from "react";
import ApplicantCard from "./ApplicantCard";
import axios from "axios";

const ApplicantList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const companyId = sessionStorage.getItem("company_id");
    if (!companyId) {
      setError("No company_id found in session storage.");
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/job-applications?company_id=${companyId}`
        );

        const formattedData = response.data.map((application) => {
          const formFields = {};
          const jobPosition = application.job_position;
          const collegeName = application.college_name;
          const studentName = application.student_name;

          console.log(response.data);
          console.log(jobPosition);

          console.log(application.form);
          application.form.forEach((field) => {
            formFields[field.field_name] = field.value;
          });
          return {
            jobPosition,
            collegeName,
            formFields,
            studentName,
            id: application.id,
          };
        });

        setApplications(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError(
          error.response?.data?.message || "Failed to fetch applications."
        );
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p className="text-2xl font-semibold p-5 bg-gray-200">
        {" "}
        No applicaitons yet
      </p>
    );

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Applicants</h2>
      <div className="applicant-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {applications.map((application) => (
          <ApplicantCard key={application.id} form={application} />
        ))}
      </div>
    </div>
  );
};

export default ApplicantList;
