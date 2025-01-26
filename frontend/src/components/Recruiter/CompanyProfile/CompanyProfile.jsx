import React, { useState, useEffect } from "react";
import { FaLink, FaMailBulk, FaPen, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [company_name, setCompanyName] = useState("");
  const [description, setCompanyDescription] = useState("");
  const [logo, setCompanyLogo] = useState("");
  const [industry, setCompanyInfo] = useState("");
  const [website, setCompanyWebsite] = useState("");
  const [email, setCompanyContact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch company data
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const company_id = sessionStorage.getItem("company_id");
        if (!company_id) {
          throw new Error("Company ID not found in sessionStorage.");
        }

        const response = await axios.get(
          `http://localhost:5000/company-details?company_id=${company_id}`
        );

        console.log(response.data);
        const data = response.data;

        setCompanyName(data.company_name);
        setCompanyDescription(data.description);
        setCompanyLogo(data.logo);
        setCompanyInfo(data.industry);
        setCompanyWebsite(data.website);
        setCompanyContact(data.email);
      } catch (err) {
        setError(err.message || "Failed to fetch company data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  // Handle toggle for edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle save changes (PUT request)
  const handleSaveChanges = async () => {
    try {
      const company_id = sessionStorage.getItem("company_id");
      if (!company_id) {
        throw new Error("Company ID not found in sessionStorage.");
      }

      // Construct the updated company data
      const formData = new FormData();
      formData.append("company_id", company_id);
      formData.append("company_name", company_name);
      formData.append("description", description);
      formData.append("industry", industry);
      formData.append("website", website);
      formData.append("email", email);

      // If there's a logo, append it as well
      if (logo) {
        const logoFile = logo;
        formData.append("logo", logoFile);
      }

      // Send PUT request with form data
      const response = await axios.put(
        "http://localhost:5000/company-details",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the content type is set to multipart/form-data
          },
        }
      );

      console.log(response.data);
      setIsEditing(false);
      alert("Update was successful!");
    } catch (error) {
      console.error("Error updating company details:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="bg-gray-50 flex min-h-screen">
        <div className="flex-1 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Section for Logo Image and Company Name */}
          <div className="flex flex-col items-center justify-center mt-16">
            <input
              type="file"
              className="hidden"
              id="logo"
              onChange={(e) =>
                setCompanyLogo(URL.createObjectURL(e.target.files[0]))
              }
            />
            <img
              src={logo}
              alt="Company Logo"
              className="w-48 h-48 sm:w-64 sm:h-64 object-contain rounded-lg shadow-xl cursor-pointer"
              onClick={() =>
                isEditing && document.getElementById("logo").click()
              }
            />
            <div className="mt-6 flex justify-center items-center">
              {isEditing ? (
                <input
                  type="text"
                  value={company_name}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="text-3xl sm:text-5xl font-extrabold text-blue-600 border-b-2 border-blue-600 focus:outline-none"
                />
              ) : (
                <h2 className="text-3xl sm:text-5xl font-extrabold text-blue-600">
                  {company_name}
                </h2>
              )}
              <FaPen
                size={18}
                className="ml-3 text-gray-600 cursor-pointer hover:text-blue-600"
                onClick={handleEditToggle}
                title="Edit Info"
              />
            </div>

            {isEditing && (
              <button
                onClick={handleSaveChanges}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* Section for Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-6">
            {/* Company Info Card */}
            <div className="border border-gray-300 shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl hover:scale-105 hover:bg-blue-50">
              <div className="mt-6 flex justify-center text-blue-600">
                <FaBuilding size={40} />
              </div>
              <p className="mt-3 text-lg text-gray-700">
                {isEditing ? (
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setCompanyInfo(e.target.value)}
                    className="text-lg text-gray-700 border-b-2"
                  />
                ) : (
                  industry
                )}
              </p>
            </div>

            {/* Website Card */}
            <div className="border border-gray-300 shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl hover:scale-105 hover:bg-blue-50">
              <div className="mt-6 flex justify-center text-blue-600">
                <FaLink size={40} />
              </div>
              <p className="mt-3 text-lg text-gray-700">
                {isEditing ? (
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    className="text-lg text-gray-700 border-b-2"
                  />
                ) : (
                  <strong>{website}</strong>
                )}
              </p>
            </div>

            {/* Contact Card */}
            <div className="border border-gray-300 shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl hover:scale-105 hover:bg-blue-50">
              <div className="mt-6 flex justify-center text-blue-600">
                <FaMailBulk size={40} />
              </div>
              <p className="mt-3 text-lg text-gray-700">
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setCompanyContact(e.target.value)}
                    className="text-lg text-gray-700 border-b-2"
                  />
                ) : (
                  <strong>{email}</strong>
                )}
              </p>
            </div>
          </div>

          {/* Description Card */}
          <div className="border border-gray-300 shadow-lg rounded-lg p-6 mt-12 transition-all hover:shadow-2xl hover:scale-105 hover:bg-blue-50">
            <h3 className="text-2xl font-bold text-blue-600">Description</h3>
            <p className="mt-3 text-lg text-gray-700">
              {isEditing ? (
                <textarea
                  value={description}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  className="w-full text-lg text-gray-700 border-b-2"
                />
              ) : (
                description
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
