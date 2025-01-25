import React from 'react';

const PlacementPolicy = ({ placementPolicy, setPlacementPolicy, isEditing }) => {
  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-4 transition-all hover:shadow-xl hover:scale-105 mt-6 min-h-[150px]">
      <h3 className="text-2xl font-bold text-blue-600">Placement Policy</h3>
      {isEditing ? (
        <input
          type="file"
          className="mt-3 text-lg text-gray-700 border-2 border-gray-300 p-2 rounded-lg focus:outline-none w-full"
          onChange={(e) => setPlacementPolicy(e.target.files[0])}
        />
      ) : (
        <div className="mt-3 text-lg text-gray-700">
          <p>
            {placementPolicy ? placementPolicy.name : "No file selected"}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This is the official placement policy that outlines the process and requirements for recruitment.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlacementPolicy;
