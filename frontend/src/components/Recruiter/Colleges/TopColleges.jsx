import React from "react";
import CollegeCard from "./CollegeCard";

const TopColleges = () => {
  const colleges = [
    {
      name: "Don Bosco College of Engineering",
      location: "Margao, Goa",
      logo: "https://via.placeholder.com/150",
      contactEmail: "contact@techuniv.edu",
      contactPhone: "+1 234 567 890",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
      {colleges.map((college, index) => (
        <CollegeCard key={index} college={college} />
      ))}
    </div>
  );
};

export default TopColleges;
