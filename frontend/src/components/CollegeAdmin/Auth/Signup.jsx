import React, { useState } from 'react'
import axios from 'axios'

const SignUp = ({ toggleAuthView }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/collages/signup', {
                name: formData.name,
                password: formData.password,
                contact_email: formData.email,
            })

            if (response.status === 201) {
                alert('Institute created successfully!')
                toggleAuthView()
            }
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred during sign-up')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-0">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col justify-center items-center mt-10 sm:mt-0">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">College Sign Up</h2>
                <form onSubmit={handleSignUp} className="space-y-4 w-full">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 mb-2">Institute Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Sign Up
                    </button>
                </form>
                <button
                    onClick={toggleAuthView}
                    className="mt-4 text-blue-500 hover:underline focus:outline-none"
                >
                    Already have an account? Log in
                </button>
            </div>
        </div>
    )
}

export default SignUp
