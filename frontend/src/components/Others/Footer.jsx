import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between">
        <div className="mb-6 sm:mb-0">
          <h3 className="text-xl font-bold mb-4">RecruitEase</h3>
          <p className="text-gray-400 mb-4">
            Connecting top talent with leading organizations.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Employers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Feedback
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Employers</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Post a Job
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Employer Branding
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Candidates</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Browse Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Create Resume
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Career Advice
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Find Internships
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center text-gray-400">
        <p>&copy; 2023 Internspirit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
