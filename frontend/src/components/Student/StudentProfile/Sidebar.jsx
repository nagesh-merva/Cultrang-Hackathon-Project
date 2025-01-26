import React, { useState } from 'react';
import { FaHome, FaUser, FaBriefcase, FaSignOutAlt, FaClipboardList, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
const Sidebar = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    console.log("logged out")
    sessionStorage.setItem("student", null)
    navigate('/student/auth')
  }

  return (
    <div>
      {/* Hamburger Icon for mobile */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar} className="text-white">
          <FaBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 min-h-screen p-4 fixed top-0 left-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Shifting content lower */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-6">Student Portal</h2>
          <ul>
            {/* Dashboard Section */}
            <li
              className="cursor-pointer flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700"
              onClick={() => setActiveSection('dashboard')}
            >
              <FaHome className="h-5 w-5" />
              <span>Dashboard</span>
            </li>

            {/* Profile Management Section */}
            <li
              className="cursor-pointer flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700"
              onClick={() => setActiveSection('profile')}
            >
              <FaUser className="h-5 w-5" />
              <span>Profile Management</span>
            </li>

            {/* Job Postings Section */}
            <li
              className="cursor-pointer flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700"
              onClick={() => setActiveSection('jobPostings')}
            >
              <FaBriefcase className="h-5 w-5" />
              <span>Job Postings</span>
            </li>

            {/* Job Applications Section */}
            <li
              className="cursor-pointer flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700"
              onClick={() => setActiveSection('jobApplications')}
            >
              <FaClipboardList className="h-5 w-5" />
              <span>Job Applications</span>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="absolute bottom-4 w-40 p-2 text-center">
            <button onClick={logout} className="cursor-pointer flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700 w-full justify-start">
              <FaSignOutAlt className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
