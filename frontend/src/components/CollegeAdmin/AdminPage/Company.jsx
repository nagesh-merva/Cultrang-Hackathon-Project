import React, { useState } from "react";
import { FaPlus, FaPaperPlane } from "react-icons/fa";

const Company = () => {
  const [card, setCard] = useState({
    id: 1,
    companyName: "TechCorp",
    jobPosted: "Software Engineer",
    package: "10 LPA",
    eligibility: ["CGPA: 7.5+", "Department: CS"],
    showEligibilityInput: false, // Controls visibility of the eligibility input field
    newEligibility: "",
  });

  // Function to handle showing/hiding the eligibility input field
  const toggleEligibilityInput = () => {
    setCard((prevCard) => ({
      ...prevCard,
      showEligibilityInput: !prevCard.showEligibilityInput,
    }));
  };

  // Function to handle updating eligibility and posting the data
  const handlePostData = () => {
    if (card.newEligibility.trim()) {
      setCard((prevCard) => ({
        ...prevCard,
        eligibility: [...prevCard.eligibility, prevCard.newEligibility],
        newEligibility: "", // Reset newEligibility after adding
        showEligibilityInput: false, // Hide input after adding
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Company</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Single Card */}
        <div
          key={card.id}
          className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-start"
        >
          <div>
            <h3 className="text-xl font-semibold">{card.companyName}</h3>
            <p className="text-sm text-gray-500">Job: {card.jobPosted}</p>
            <p className="text-sm text-gray-500">Package: {card.package}</p>
            <ul className="mt-2 text-sm text-gray-700">
              {card.eligibility.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {card.showEligibilityInput && (
              <div className="mt-2">
                <input
                  type="text"
                  value={card.newEligibility}
                  onChange={(e) =>
                    setCard((prevCard) => ({
                      ...prevCard,
                      newEligibility: e.target.value,
                    }))
                  }
                  placeholder="Add new eligibility criteria"
                  className="p-2 border rounded-md w-full"
                />
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="flex flex-col items-center space-y-2">
            {/* Add Eligibility Icon */}
            <FaPlus
              onClick={toggleEligibilityInput}
              className="cursor-pointer text-blue-500"
              title="Add Eligibility"
            />
            {/* Post Button */}
            <button
              onClick={handlePostData}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              <FaPaperPlane className="inline mr-2" />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
