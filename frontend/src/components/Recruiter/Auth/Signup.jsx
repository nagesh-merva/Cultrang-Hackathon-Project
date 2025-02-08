import React from "react";
import { useState } from "react";
import axios from "axios";

const Signup = ({ toggleAuthView }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Debugging form data
    console.log("Form Data:", formData);

    if (!formData.company_name || !formData.password) {
      alert("Company Name and Password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/recruiter/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setIsLoading(false);
        alert("Account created successfully");
        console.log(response.data);
        toggleAuthView();
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Something went wrong. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-0">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <img src="#" alt="Internspirit" className="h-10 w-10" />
        <span className="text-xl font-semibold text-gray-800">RecruitEase</span>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md min-h-[470px] flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="company_name" className="block text-gray-700 mb-2">
              Company Name:
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password:
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.password}
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Create Account
          </button>
          <p className="text-center text-gray-600 mt-4">
            Have an account?{" "}
            <button
              type="button"
              onClick={toggleAuthView}
              className="text-blue-500 hover:underline"
              isLoading={isLoading}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
