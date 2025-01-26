import React, { useState, useRef, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function JobForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([""]);
  const [form, setApplicationFields] = useState([
    { id: "1", label: "", type: "text", required: true },
  ]);

  const [selected_collages, setColleges] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [application_deadline, setDeadline] = useState(""); // New state for deadline
  const [job_type, setJobType] = useState(""); // New state for job type
  const dropdownRef = useRef(null);

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch company_id from session storage
    const companyId = sessionStorage.getItem("company_id");

    if (!companyId) {
      alert("Company ID is missing in session storage.");
      return;
    }

    // Prepare job data
    const jobData = {
      title,
      company,
      location,
      description,
      requirements: requirements.filter((req) => req.trim() !== ""),
      form: form.filter((form) => form.label.trim() !== ""),
      selected_collages,
      application_deadline, // Add deadline
      job_type,
      status: "open",
      company_id: companyId, // Send company_id from session storage
    };
    console.log(jobData);
    // Send POST request
    try {
      const response = await fetch("http://localhost:5000/job-posting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Job posted successfully!");
        onSubmit(); // You can trigger any callback or reset the form here
      } else {
        alert(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      alert("Error posting job: " + error.message);
    }
  };

  const toggleCollegeSelection = (college) => {
    if (selected_collages.includes(college)) {
      setColleges(selected_collages.filter((c) => c !== college));
    } else {
      setColleges([...selected_collages, college]); // Add selected college
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg border border-gray-200 my-4"
    >
      <h1 className="text-2xl font-bold flex justify-center text-gray-900">
        Create Job Posting
      </h1>
      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Type
        </label>
        <select
          value={job_type}
          onChange={(e) => setJobType(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        >
          <option value="">Select Job Type</option>
          <option value="full-time">Full-time</option>
          <option value="intern">Intern</option>
          <option value="part-time">Part-time</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Requirements
        </label>
        {requirements.map((req, index) => (
          <div key={index} className="flex mt-2 items-center space-x-2">
            <input
              type="text"
              value={req}
              onChange={(e) => {
                const newReqs = [...requirements];
                newReqs[index] = e.target.value;
                setRequirements(newReqs);
              }}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <button
              type="button"
              onClick={() => removeRequirement(index)}
              className="text-red-600"
            >
              <FaMinusCircle size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setRequirements([...requirements, ""])}
          className="mt-2 flex items-center text-blue-600"
        >
          <FaPlusCircle size={20} className="mr-1" /> Add Requirement
        </button>
      </div>

      {/* Application Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Application Fields
        </label>
        {form.map((field, index) => (
          <div key={field.id} className="flex mt-2 items-center space-x-2">
            <input
              type="text"
              placeholder="Field Label"
              value={form.label} // Corrected from form.label
              onChange={(e) => {
                const newFields = [...form];
                newFields[index].label = e.target.value;
                setApplicationFields(newFields);
              }}
            />

            <select
              value={form.type}
              onChange={(e) => {
                const newFields = [...form];
                newFields[index].type = e.target.value;
                setApplicationFields(newFields);
              }}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="file">File</option>
              <option value="select">Select</option>
            </select>
            <button
              type="button"
              onClick={() =>
                setApplicationFields(form.filter((_, i) => i !== index))
              }
              className="text-red-600"
            >
              <FaMinusCircle size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setApplicationFields([
              // Add new application field logic
              ...form,
              {
                id: Date.now().toString(),
                label: "",
                type: "text",
                required: true,
              },
            ])
          }
          className="mt-2 flex items-center text-blue-600"
        >
          <FaPlusCircle size={20} className="mr-1" /> Add Field
        </button>
      </div>

      {/* Colleges */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          College
        </label>
        <div className="relative">
          <input
            type="text"
            value={selected_collages.join(", ")}
            onClick={() => setShowDropdown(!showDropdown)}
            readOnly
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          />
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg"
            >
              {["GEC", "PCCE", "DBCE"].map((college) => (
                <div
                  key={college}
                  onClick={() => toggleCollegeSelection(college)}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {college}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deadline
        </label>
        <input
          type="date"
          value={application_deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>

      {/* Submit */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
