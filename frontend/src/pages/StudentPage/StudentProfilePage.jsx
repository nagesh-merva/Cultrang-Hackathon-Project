import React, { useState } from 'react';
import Sidebar from '../../components/Student/StudentProfile/Sidebar';
import ProfileManagement from '../../components/Student/StudentProfile/ProfileManage';
import JobPostings from '../../components/Student/StudentProfile/JobPostings';
import Dashboard from '../../components/Student/StudentProfile/Dashboard';
import Footer from '../../components/Student/StudentProfile/Footer';
import JobApplications from '../../components/Student/StudentProfile/JobApplications';
import Navbar from '../../components/Student/StudentProfile/Navbar'; // Import the Navbar component

const StudentPage = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // Default to Dashboard

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileManagement />;
      case 'jobPostings':
        return <JobPostings />;
      case 'dashboard':
        return <Dashboard />;
      case 'jobApplications':
        return <JobApplications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Add Navbar component at the top */}
      <div className="flex flex-1">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="flex-1 p-6 ml-64"> {/* Added margin-left (ml-64) to offset sidebar */}
          {renderSection()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage;
