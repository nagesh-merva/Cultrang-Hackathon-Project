import React, { useState, useEffect } from "react";
import axios from "axios";

function RoundForm({ onCancel, onRoundAdded }) {
  const companyId = sessionStorage.getItem("company_id");
  const [formData, setFormData] = useState({
    company_id: companyId,
    name: "",
    description: "",
    type: "",
    status: "pending",
    order_number: "",
    job_id: "",
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch company_id from sessionStorage

    if (!companyId) {
      setError("Company ID not found in session storage");
      setLoading(false);
      return;
    }

    // Fetch jobs from the API
    axios
      .get("https://cultrang-hackathon-project.onrender.com/job-posting", {
        params: { company_id: companyId },
      })
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://cultrang-hackathon-project.onrender.com/recruitment-rounds",
        {
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Recruitment round added successfully!");
      onRoundAdded(response.data);
    } catch (err) {
      console.error("Error adding recruitment round:", err);
      window.location.reload();
    }
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white rounded-lg shadow p-6 w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-3/4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Job
            </label>
            <select
              name="job_id"
              value={formData.job_id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2"
              required
            >
              <option value="" disabled>
                Select a Job
              </option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Round Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order Number
            </label>
            <input
              type="number"
              name="order_number"
              value={formData.order_number}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Add Round
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoundForm;
