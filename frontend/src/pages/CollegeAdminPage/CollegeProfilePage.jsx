import React, { useState } from 'react';
import NameLogo from '../../components/CollegeAdmin/CollegeProfile/NameLogo';
import Desc from '../../components/CollegeAdmin/CollegeProfile/Desc';
import Contact from '../../components/CollegeAdmin/CollegeProfile/Contact';
import PlacementPolicy from '../../components/CollegeAdmin/CollegeProfile/PlacementPolicy';

const CollegeProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [collegeName, setCollegeName] = useState('Goa Engineering College');
  const [collegeDescription, setCollegeDescription] = useState('A premier institute offering various engineering courses with excellent placement records.');
  const [collegeLogo, setCollegeLogo] = useState('https://via.placeholder.com/150'); // Placeholder logo
  const [collegeEmail, setCollegeEmail] = useState('info@gec.edu');
  const [collegePhone, setCollegePhone] = useState('987-654-3210');
  const [placementPolicy, setPlacementPolicy] = useState(null); // Placeholder file

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDoneClick = () => {
    setIsEditing(false);
    // Handle saving changes here (e.g., send data to the server)
  };

  return (
    <div className="bg-gray-50 flex min-h-screen">
      <div className="flex-1 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <NameLogo
          collegeName={collegeName}
          setCollegeName={setCollegeName}
          isEditing={isEditing}
          handleEditToggle={handleEditToggle}
          handleDoneClick={handleDoneClick}
        />
        <Desc
          collegeDescription={collegeDescription}
          setCollegeDescription={setCollegeDescription}
          isEditing={isEditing}
        />
        <Contact
          collegeEmail={collegeEmail}
          setCollegeEmail={setCollegeEmail}
          collegePhone={collegePhone}
          setCollegePhone={setCollegePhone}
          isEditing={isEditing}
        />
        <PlacementPolicy
          placementPolicy={placementPolicy}
          setPlacementPolicy={setPlacementPolicy}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default CollegeProfilePage;
