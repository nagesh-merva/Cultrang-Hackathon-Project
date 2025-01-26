import React, { useState } from 'react'
import axios from 'axios'
import Select from 'react-select'

const collegeOptions = [
  { value: 'Harvard University', label: 'Harvard University' },
  { value: 'Stanford University', label: 'Stanford University' },
  { value: 'MIT', label: 'MIT' },
  { value: 'GEC', label: 'Goa College of Engineering' },
  { value: 'California Institute of Technology', label: 'California Institute of Technology' },
]

const Signup = ({ toggleAuthView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollno: '',
    college: null,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCollegeChange = (selectedOption) => {
    setFormData({ ...formData, college: selectedOption })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!formData.college) {
      alert('Please select a valid college from the dropdown.')
      return
    }

    try {
      const response = await axios.post('http://localhost:5000/student/signup', {
        name: formData.name,
        password: formData.password,
        email: formData.email,
        rollno: formData.rollno,
        college: formData.college.value,
      })
      if (response.status === 200) {
        alert(error.response?.data?.error)
        toggleAuthView()
      }
      if (response.status === 201) {
        alert('Account created successfully!')
        toggleAuthView()
      }
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred during sign-up')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-0">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md min-h-[500px] flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4 w-full">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Student Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Student Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="rollno" className="block text-gray-700 mb-2">Roll No:</label>
            <input
              type="text"
              id="rollno"
              name="rollno"
              required
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="college" className="block text-gray-700 mb-2">Select College:</label>
            <Select
              options={collegeOptions}
              onChange={handleCollegeChange}
              placeholder="Search and select your college"
              isClearable
              className="w-full"
            />
          </div>
          <p className="text-center text-gray-600 mt-4">
            Allready have an account?{' '}
            <button
              type="button"
              onClick={toggleAuthView}
              className="text-blue-500 hover:underline"
            >
              Login In
            </button>
          </p>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
