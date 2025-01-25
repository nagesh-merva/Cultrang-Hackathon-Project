import React, { useState, useRef, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function JobForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([""]);
  const [applicationFields, setApplicationFields] = useState([
    { id: "1", label: "", type: "text", required: true },
  ]);
  const [colleges, setColleges] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [deadline, setDeadline] = useState(""); // New state for deadline
  const [jobType, setJobType] = useState(""); // New state for job type
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      company,
      location,
      description,
      requirements: requirements.filter((req) => req.trim() !== ""),
      applicationFields: applicationFields.filter(
        (field) => field.label.trim() !== ""
      ),
      colleges,
      deadline, // Add deadline
      jobType, // Add jobType
      status: "open",
    });
  };

  const toggleCollegeSelection = (college) => {
    if (colleges.includes(college)) {
      setColleges(colleges.filter((c) => c !== college));
    } else {
      setColleges([...colleges, college]);
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
          value={jobType}
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
        {applicationFields.map((field, index) => (
          <div key={field.id} className="flex mt-2 items-center space-x-2">
            <input
              type="text"
              placeholder="Field Label"
              value={field.label}
              onChange={(e) => {
                const newFields = [...applicationFields];
                newFields[index].label = e.target.value;
                setApplicationFields(newFields);
              }}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <select
              value={field.type}
              onChange={(e) => {
                const newFields = [...applicationFields];
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
                setApplicationFields(
                  applicationFields.filter((_, i) => i !== index)
                )
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
              ...applicationFields,
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
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full mt-2 bg-white border border-gray-300 rounded-md shadow-sm p-2 text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {colleges.length > 0
              ? `Selected: ${colleges.join(", ")}`
              : "Select Colleges"}
          </button>

          {showDropdown && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg p-4">
              <div className="space-y-2">
                {["GEC", "IIT", "NIT", "PCCE"].map((college) => (
                  <div key={college} className="flex items-center">
                    <input
                      type="checkbox"
                      id={college}
                      checked={colleges.includes(college)}
                      onChange={() => toggleCollegeSelection(college)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={college}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {college}
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowDropdown(false)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Done
              </button>
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
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Job Posting
      </button>
    </form>
  );
}
