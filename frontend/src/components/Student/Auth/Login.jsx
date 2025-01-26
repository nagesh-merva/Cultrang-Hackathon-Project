import React from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Login = ({ toggleAuthView }) => {
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await axios.post('http://127.0.0.1:5000/student/login', {
        email: email,
        password: password,
      })

      if (response.status === 200) {
        const Response = response.data
        console.log(Response)
        sessionStorage.setItem('student', JSON.stringify(Response.student))
        // console.log(sessionStorage.getItem('student'))
        alert('Login successful!')
        navigate('/student/dashboard')
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error)
      } else {
        alert('An error occurred. Please try again.')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-0">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md min-h-[470px] flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4 w-full">
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
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={toggleAuthView}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
