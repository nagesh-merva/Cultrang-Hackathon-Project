import React from "react";
import { FaUserGraduate, FaBriefcase, FaGlobeAmericas } from "react-icons/fa";
import Footer from "../../components/Others/Footer";

const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-700 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-3">
          <img src="./logo.png" alt="logo" />
          <h1 className="text-3xl font-bold tracking-wide">InternSpirit</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-800">
            Unlock Top Talent for Your Organization
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-700">
            Connect with the most qualified candidates from leading universities
            and access a vast pool of diverse talent.
          </p>
        </div>

        {/* 3 Cards Section */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 mb-2">
          {/* Card for Recruiters */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900">Recruiters</h3>
            <p className="mt-4 text-gray-600">
              Get started to find top talent from universities worldwide and
              streamline your hiring process.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-8 py-2 mt-4 text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Card for Universities */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900">
              Universities
            </h3>
            <p className="mt-4 text-gray-600">
              Partner with us to help your students access a global pool of
              internship and job opportunities.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-8 py-2 mt-4 text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Card for Students */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900">Students</h3>
            <p className="mt-4 text-gray-600">
              Explore opportunities and kickstart your career by connecting with
              recruiters and organizations.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-8 py-2 mt-4 text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="text-center mt-10">
          <h2 className="text-5xl font-extrabold mt-16 mb-4 text-slate-700">
            Why InternSpirit ?
          </h2>
        </div>

        {/* Features Section */}
        <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-3 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <FaUserGraduate className="h-16 w-16 text-blue-500 mx-auto" />
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
              Top University Talent
            </h3>
            <p className="mt-4 text-gray-600">
              Access the best and brightest candidates from top universities.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <FaBriefcase className="h-16 w-16 text-blue-500 mx-auto" />
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
              Streamlined Hiring
            </h3>
            <p className="mt-4 text-gray-600">
              Efficiently manage and track your recruitment pipeline.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <FaGlobeAmericas className="h-16 w-16 text-blue-500 mx-auto" />
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
              Global Talent Pool
            </h3>
            <p className="mt-4 text-gray-600">
              Reach a diverse pool of candidates from around the world.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
