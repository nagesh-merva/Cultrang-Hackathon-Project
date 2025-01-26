import React from "react";

// Mock data for placed students
const placedStudents = [
  {
    name: "John Doe",
    rollNo: "12345",
    email: "john.doe@example.com",
    company: "TechCorp",
  },
  {
    name: "Jane Smith",
    rollNo: "67890",
    email: "jane.smith@example.com",
    company: "InnovateX",
  },
  // Add more student objects as needed
];

const PlacedStud = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Placed Students</h2>

      {/* Student Cards: Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {placedStudents.map((student, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 min-h-[120px] max-w-full"
          >
            {/* Student Details */}
            <div className="flex flex-col space-y-2 w-full text-left">
              <h3 className="text-sm font-semibold text-gray-800">{student.name}</h3>
              <p className="text-xs text-gray-600">Roll No: {student.rollNo}</p>
              <p className="text-xs text-gray-600">Email: {student.email}</p>
              <p className="text-xs text-gray-600">Company: {student.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacedStud;
