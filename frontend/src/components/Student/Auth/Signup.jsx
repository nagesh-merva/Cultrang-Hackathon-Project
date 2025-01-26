import React from 'react';

const Signup = () => {
  // Dummy functions for now
  const handleSignup = (e) => {
    e.preventDefault();
    // handle signup logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-0">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md min-h-[470px] flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4 w-full">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Student Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
