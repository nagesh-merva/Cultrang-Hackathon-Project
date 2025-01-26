import React, { useState } from "react"
import { FaPen, FaTimes, FaSave } from "react-icons/fa"
import { FiFileText } from "react-icons/fi"
import axios from "axios";
import Select from 'react-select'

const collegeOptions = [
  { value: 'Harvard University', label: 'Harvard University' },
  { value: 'Stanford University', label: 'Stanford University' },
  { value: 'MIT', label: 'MIT' },
  { value: 'GEC', label: 'Goa College of Engineering' },
  { value: 'California Institute of Technology', label: 'California Institute of Technology' },
]

const ProfileManage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const student = JSON.parse(sessionStorage.getItem("student"))
  const [profile, setProfile] = useState({
    ...student,
    profilePic: student.profilePic || "",
    resume: student.resume || "",
    skills: student.skills || []
  });
  const [profilePicFile, setProfilePicFile] = useState(null)
  const [resumeFile, setResumeFile] = useState(null)
  const [newSkill, setNewSkill] = useState("")

  console.log(student)

  const toggleEdit = () => setIsEditing(!isEditing)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleCollegeChange = (selectedOption) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      college: selectedOption ? selectedOption.value : "",
    }))
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePic: reader.result,
        }))
      }
      reader.readAsDataURL(file);
    }
  }

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        resume: file.name,
      }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        skills: [...prevProfile.skills, newSkill.trim()],
      }));
      setNewSkill("")
    }
  }
  const removeSkill = (skill) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: prevProfile.skills.filter((s) => s !== skill),
    }));
  };

  // Save profile changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("id", student.id);
    Object.keys(profile).forEach((key) => {
      if (key !== "profilePic" && key !== "resume") {
        if (key === "skills") {
          formData.append(key, JSON.stringify(profile[key]))
        } else {
          formData.append(key, profile[key]);
        }
      }
    });

    if (profilePicFile) {
      formData.append("profilePic", profilePicFile);
    }
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      const response = await axios.put("http://127.0.0.1:5000/students/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("Profile updated successfully!");
        sessionStorage.setItem("student", JSON.stringify(profile));
        setIsEditing(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 md:px-6">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4 relative">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover shadow-md"
          />
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

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isEditing ? "Edit Profile" : "Profile Information"}
        </h2>

        {isEditing ? (
          <form className="space-y-4" onSubmit={handleSaveChanges}>
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Name:
              </label>
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
              <label htmlFor="skills" className="block text-gray-700">
                Skills:
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="skills"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter a skill and click Add"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={addSkill}
                >
                  Add
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="resume" className="block text-gray-700">
                Resume:
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                onChange={handleResumeChange}
              />
            </div>
            <div>
              <label htmlFor="college" className="block text-gray-700">
                College:
              </label>
              <Select
                options={collegeOptions}
                value={
                  profile.college
                    ? { value: profile.college, label: profile.college }
                    : null // Show the selected college or null if none
                }
                onChange={handleCollegeChange}
                placeholder="Search and select your college"
                isClearable
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="degree" className="block text-gray-700">
                Degree:
              </label>
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
              <label htmlFor="rollno" className="block text-gray-700">
                Roll No:
              </label>
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
              <label htmlFor="email" className="block text-gray-700">
                Email:
              </label>
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
              <label htmlFor="phone" className="block text-gray-700">
                Phone Number:
              </label>
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
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700"
            >
              <FaSave className="inline-block mr-2" /> Save Profile
            </button>
          </form>
        ) : (
          <div className="space-y-4 bg-white p-4 rounded-md">
            <p className="text-gray-700 text-xl font-semibold">Name: {profile.name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.skills && profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {skill}
                  <FaTimes
                    className="ml-2 text-red-600 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                </span>
              ))}
            </div>
            <p className="text-gray-700 text-xl font-semibold">College: {profile.college}</p>
            <p className="text-gray-700 text-xl font-semibold">Degree: {profile.degree}</p>
            <p className="text-gray-700 text-xl font-semibold">Roll No: {profile.rollno}</p>
            <p className="text-gray-700 text-xl font-semibold">Email: {profile.email}</p>
            <p className="text-gray-700 text-xl font-semibold">Phone: {profile.phone}</p>
            {profile.resume && (
              <div className="text-gray-700">
                <p className="text-xl font-semibold">Resume: </p>
                {profile.resume.endsWith(".pdf") ? (
                  <a
                    href={`http://localhost:5000/uploads/resumes/${profile.resume}`}
                    target="_blank"
                    className="text-blue-500 flex items-center"
                  >
                    <FiFileText className="inline-block text-xl mr-2" /> View Resume
                  </a>
                ) : null}
              </div>
            )}
          </div>
        )}
        {!isEditing && (
          <button
            onClick={toggleEdit}
            className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-md flex items-center justify-center hover:bg-green-700"
          >
            <FaPen className="inline-block mr-2" /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileManage;
