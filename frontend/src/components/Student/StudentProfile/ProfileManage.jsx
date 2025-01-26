import React, { useState } from 'react';
import { FaPen, FaSave } from 'react-icons/fa'; // Import the pen and save icons
import { FiFileText } from 'react-icons/fi'; // Icon for file

const ProfileManage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    skills: 'React, Node.js, JavaScript',
    college: 'XYZ University',
    degree: 'B.Tech in Computer Science',
    rollno: '12345678',
    email: 'john.doe@example.com',
    phone: '+1 123 456 7890',
    profilePicture: '#', // Placeholder for profile picture URL
    resume: '', // Placeholder for resume
    resumeUrl: '', // To store the resume URL or file path
  });

  const toggleEdit = () => setIsEditing(!isEditing);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle resume upload (no restrictions on file types)
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        resume: file.name,
        resumeUrl: fileUrl, // Store file URL for preview
      }));
    }
  };

  // Handle saving changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setIsEditing(false); // Save changes and exit edit mode
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 md:px-6">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4 relative">
          <img
            src={profile.profilePicture} // Use dynamic image URL
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover shadow-md"
          />
          {/* Pen Icon for Editing, visible only in Edit mode */}
          {isEditing && (
            <label className="absolute bottom-0 right-0 mb-2 mr-2 cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              <FaPen className="text-white bg-gray-800 p-1 rounded-full" size={20} />
            </label>
          )}
        </div>

        {/* Profile Info */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isEditing ? 'Edit Profile' : 'Profile Information'}
        </h2>

        {isEditing ? (
          <form className="space-y-4" onSubmit={handleSaveChanges}>
            <div>
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="skills" className="block text-gray-700">Skills:</label>
              <input
                type="text"
                id="skills"
                name="skills"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your skills"
                value={profile.skills}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="resume" className="block text-gray-700">Resume:</label>
              <input
                type="file"
                id="resume"
                name="resume"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                onChange={handleResumeChange}
              />
            </div>
            <div>
              <label htmlFor="college" className="block text-gray-700">College:</label>
              <input
                type="text"
                id="college"
                name="college"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your college name"
                value={profile.college}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="degree" className="block text-gray-700">Degree:</label>
              <input
                type="text"
                id="degree"
                name="degree"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your degree"
                value={profile.degree}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="rollno" className="block text-gray-700">Roll No:</label>
              <input
                type="text"
                id="rollno"
                name="rollno"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your roll number"
                value={profile.rollno}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700">Phone Number:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md w-auto mx-auto flex items-center justify-center hover:bg-blue-700"
            >
              <FaSave className="inline-block mr-2" /> Save Profile
            </button>
          </form>
        ) : (
          <div className="space-y-4 bg-white p-4 rounded-md">
            <p className="text-gray-700 text-xl font-semibold">Name: {profile.name}</p>
            <p className="text-gray-700 text-xl font-semibold">Skills: {profile.skills}</p>
            <p className="text-gray-700 text-xl font-semibold">College: {profile.college}</p>
            <p className="text-gray-700 text-xl font-semibold">Degree: {profile.degree}</p>
            <p className="text-gray-700 text-xl font-semibold">Roll No: {profile.rollno}</p>
            <p className="text-gray-700 text-xl font-semibold">Email: {profile.email}</p>
            <p className="text-gray-700 text-xl font-semibold">Phone: {profile.phone}</p>

            {/* Display Resume */}
            {profile.resume && (
              <div className="text-gray-700">
                <p className="text-xl font-semibold">Resume: </p>
                {profile.resumeUrl && profile.resumeUrl.endsWith('.pdf') ? (
                  <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Resume (PDF)
                  </a>
                ) : (
                  <div className="flex items-center">
                    <FiFileText className="mr-2 text-gray-500" size={20} />
                    {profile.resume}
                  </div>
                )}
              </div>
            )}
            <button
              onClick={toggleEdit}
              className="text-center mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-auto mx-auto flex items-center justify-center hover:bg-blue-600 cursor-pointer">
              <FaPen className="inline-block mr-2" /> Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileManage;
