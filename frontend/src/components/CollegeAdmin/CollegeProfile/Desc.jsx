import React from 'react';

const Desc = ({ collegeDescription, setCollegeDescription, isEditing }) => {
  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-4 transition-all hover:shadow-xl hover:scale-105 mt-6 min-h-[150px]">
      <h3 className="text-2xl font-bold text-blue-600">Description</h3>
      {isEditing ? (
        <textarea
          value={collegeDescription}
          onChange={(e) => setCollegeDescription(e.target.value)}
          className="mt-3 text-lg text-gray-700 border-2 border-gray-300 p-2 rounded-lg focus:outline-none w-full"
          rows="4"
        />
      ) : (
        <p className="mt-3 text-lg text-gray-700">{collegeDescription}</p>
      )}
    </div>
  );
};

export default Desc;
