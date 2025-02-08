import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ toggleAuthView }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/recruiter/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        alert("Login successful");
        console.log(response.data);
        const companyId = response.data.company_id;
        const companyName = formData.company_name;
        sessionStorage.setItem("company_id", companyId);
        sessionStorage.setItem("company_name", companyName);

        navigate("/recruiters/dashboard");
      }
    } catch (error) {
      console.error(error);
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
        <span className="text-3xl font-bold text-gray-800">RecruitEase</span>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md min-h-[470px] flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
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
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`cursor-pointer w-full py-2 text-white rounded-md ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={toggleAuthView}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
