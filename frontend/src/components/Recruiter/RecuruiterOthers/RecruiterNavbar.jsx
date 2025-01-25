import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa"; // Importing the hamburger icon

const Navbar = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false); // To toggle search bar visibility

  const handleHamburgerClick = () => {
    setShowSearch(!showSearch);
    toggleSidebar(); // This will show/hide the sidebar
  };

  return (
    <div className="bg-blue-700 text-white py-6 top-0 z-10 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Hamburger Icon for Mobile */}
        <div className="flex items-center w-full justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/internspirit-logo.svg" alt="logo" className="h-8" />
            <span className="text-lg font-bold hidden md:block md:text-4xl">
              InternSpirit
            </span>
          </div>

          {/* Hamburger Icon for Mobile */}
        </div>

        {/* Search Bar (Visible on clicking hamburger for mobile) */}
        <div className="relative flex items-center w-full max-w-md sm:max-w- lg:max-w-md">
          <div
            className={`bg-blue-800 flex items-center  w-full text-white  outline-none ${
              showSearch || "hidden"
            } md:block `}
          >
            <input
              type="text"
              placeholder="Type Something to Search."
              className={`bg-blue-800 rounded-md w-full text-white pl-10 pr-4 py-2 outline-none ${
                showSearch || "hidden"
              } md:block`} // Ensure it's always visible on larger screens
            />
            <FaSearch
              className="absolute left-3 text-white md:hidden"
              size={20}
            />
          </div>

          <div className="md:hidden flex items-center ml-auto">
            <FaBars
              className="text-white cursor-pointer"
              size={24}
              onClick={handleHamburgerClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
