import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // Get company_id from sessionStorage
        const companyId = sessionStorage.getItem("company_id");
        if (!companyId) {
          setError("No company ID found in session storage.");
          setLoading(false);
          return;
        }

        // Fetch data from the endpoint
        const response = await axios.get(
          `http://localhost:5000/job-applications?company_id=${companyId}`
        );

        // Extract the required fields and limit to the latest 2 applicants
        const formattedData = response.data
          .slice(-2) // Get the last 2 items
          .map((applicant) => ({
            name:
              applicant.form.find((field) => field.field_name === "Full Name")
                ?.value || "N/A",
            stsname: applicant.student_name,
            college: applicant.college_name || "N/A",
            appliedDate: new Date(applicant.submitted_at).toLocaleDateString(),
            status: applicant.status || "N/A",
          }));

        setApplicants(formattedData);
      } catch (error) {
        setError("No new applicants ." || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
        New Applicants
      </h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : applicants.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-left">Name</th>
                <th className="py-3 text-left">College</th>
                <th className="py-3 text-left">Applied Date</th>
                <th className="py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, index) => (
                <tr className="border-b border-gray-200" key={index}>
                  <td className="py-3">{applicant.stsname}</td>
                  <td className="py-3">{applicant.college}</td>
                  <td className="py-3">{applicant.appliedDate}</td>
                  <td className="py-3 text-right">{applicant.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applicants found.</p>
        )}
      </div>
    </div>
  );
};

export default ApplicantList;
