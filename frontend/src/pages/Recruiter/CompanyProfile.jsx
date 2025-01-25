import React, { useState } from 'react';
import { FaLink, FaMailBulk, FaPen, FaBuilding } from 'react-icons/fa';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("Internspirit");
  const [companyDescription, setCompanyDescription] = useState(
    "Specializing in high-performing mobile and web applications with a focus on user experience and performance."
  );
  const [companyLogo, setCompanyLogo] = useState("#");
  const [companyInfo, setCompanyInfo] = useState(
    "Internspirit is in the domain of providing job opportunities and internships, connecting talent with top companies."
  );
  const [companyWebsite, setCompanyWebsite] = useState("www.internspirit.com");
  const [companyContact, setCompanyContact] = useState("internspirit@gmail.com");

  // Handle toggle for edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 flex min-h-screen">
      <div className="flex-1 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Section for Logo Image and Company Name */}
        <div className="flex flex-col items-center justify-center mt-16">
          <input
            type="file"
            className="hidden"
            id="companyLogo"
            onChange={(e) => setCompanyLogo(URL.createObjectURL(e.target.files[0]))}
          />
          <img
            src={companyLogo}
            alt="Company Logo"
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain rounded-lg shadow-xl cursor-pointer"
            onClick={() => isEditing && document.getElementById('companyLogo').click()}  // Only allow click if in editing mode

          />
          <div className="mt-6 flex justify-center items-center">
            {isEditing ? (
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="text-3xl sm:text-5xl font-extrabold text-blue-600 border-b-2 border-blue-600 focus:outline-none"
              />
            ) : (
              <h2 className="text-3xl sm:text-5xl font-extrabold text-blue-600">{companyName}</h2>
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
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
            {isEditing ? (
              <textarea
                className="mt-3 text-lg text-gray-700 border-2 border-gray-300 p-2 rounded-lg focus:outline-none w-full"
                rows="4"
                value={companyInfo}
                onChange={(e) => setCompanyInfo(e.target.value)}
              />
            ) : (
              <p className="mt-3 text-lg text-gray-700">{companyInfo}</p>
            )}
          </div>

          {/* Website Card */}
          <div className="border border-gray-300 shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl hover:scale-105 hover:bg-blue-50">
            <div className="mt-6 flex justify-center text-blue-600">
              <FaLink size={40} />
            </div>
            {isEditing ? (
              <input
                type="text"
                className="mt-3 text-lg text-gray-700 border-2 border-gray-300 p-2 rounded-lg focus:outline-none w-full"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            ) : (
              <p className="mt-3 text-lg text-gray-700">
                Visit us at <strong>{companyWebsite}</strong>
              </p>
            )}
          </div>

          {/* Contact Card */}
          <div className="border border-gray-300 shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl hover:scale-105 hover:bg-blue-50">
            <div className="mt-6 flex justify-center text-blue-600">
              <FaMailBulk size={40} />
            </div>
            {isEditing ? (
              <input
                type="text"
                className="mt-3 text-lg text-gray-700 border-2 border-gray-300 p-2 rounded-lg focus:outline-none w-full"
                value={companyContact}
                onChange={(e) => setCompanyContact(e.target.value)}
              />
            ) : (
              <p className="mt-3 text-lg text-gray-700">
                Contact us at <strong>{companyContact}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Description Card */}
        <div className="border border-gray-300 shadow-lg rounded-lg p-6 mt-12 transition-all hover:shadow-2xl hover:scale-105 hover:bg-blue-50">
          <h3 className="text-2xl font-bold text-blue-600">Description</h3>
          {isEditing ? (
            <textarea
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="mt-3 text-lg text-gray-700 border-2 border-gray-300 p-2 rounded-lg focus:outline-none w-full"
              rows="4"
            />
          ) : (
            <p className="mt-3 text-lg text-gray-700">
              Internspirit is a dynamic platform that provides job opportunities, career growth, and networking for professionals worldwide. Our platform connects talented individuals with leading companies across various industries, fostering career advancement and development. Whether you're looking for your next job, internship, or partnership, Internspirit helps you achieve your goals.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
