import React from 'react';

const AdminLogin = ({ toggleAuthView }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    // handle admin login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-0">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md min-h-[470px] flex flex-col justify-center items-center mt-10 sm:mt-0">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4 w-full">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Username:</label>
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
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
