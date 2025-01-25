import React from 'react';
import { FaPen } from 'react-icons/fa';

const NameLogo = ({ collegeName, setCollegeName, isEditing, handleEditToggle, handleDoneClick }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 sm:mt-10">
      <input
        type="file"
        className="hidden"
        id="collegeLogo"
        onChange={(e) => console.log("Handle logo upload")}
      />
      <img
        src="https://via.placeholder.com/150"
        alt="College Logo"
        className="w-40 h-40 sm:w-48 sm:h-48 object-contain rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-transform"
        onClick={() => isEditing && document.getElementById('collegeLogo').click()} 
      />
      <div className="mt-4 sm:mt-6 flex justify-center items-center">
        {isEditing ? (
          <input
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            className="text-3xl sm:text-4xl font-extrabold text-blue-600 border-b-2 border-blue-600 focus:outline-none"
          />
        ) : (
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600">{collegeName}</h2>
        )}
        <FaPen
          size={16}
          className="ml-3 text-gray-600 cursor-pointer hover:text-blue-600"
          onClick={handleEditToggle}
          title="Edit Info"
        />
      </div>
      {isEditing && (
        <button
          onClick={handleDoneClick}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
        >
          Done
        </button>
      )}
    </div>
  );
};

export default NameLogo;
