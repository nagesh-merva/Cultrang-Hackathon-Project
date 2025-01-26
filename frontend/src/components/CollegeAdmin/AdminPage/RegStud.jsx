import React from "react";

// Mock data for registered students
const registeredStudents = [
  {
    name: "John Doe",
    college: "GEC College",
    rollNo: "12345",
    email: "john.doe@example.com",
    phone: "+1234567890",
    profilePic: "", // Placeholder image
  },
  // Add more student objects as needed
];

const RegStud = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Registered Students</h2>

      {/* Student Cards: Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {registeredStudents.map((student, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-x-4 min-h-[180px] max-w-full"
          >
            {/* Profile Picture */}
            <img
              src={student.profilePic || ""} // Use a placeholder if no image is provided
              alt="Profile"
              className="w-25 h-20 rounded-full border-2 border-gray-300 mb-4 sm:mb-0"
            />

            {/* Student Details */}
            <div className="flex flex-col sm:flex-row w-full text-left space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col justify-between flex-grow min-w-0">
                <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.college}</p>
              </div>
              <div className="flex flex-col justify-between flex-grow min-w-0">
                <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                <p className="text-sm text-gray-600">Email: {student.email}</p>
              </div>
              <div className="flex flex-col justify-between flex-grow min-w-0">
                <p className="text-sm text-gray-600">Phone: {student.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegStud;
