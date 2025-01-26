import React, { useState, useEffect } from "react";
import axios from "axios";
import CollegeCard from "./CollegeCard";

const TopColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch college data from the API
    axios
      .get("http://localhost:5000/allcollages")
      .then((response) => {
        if (response.status === 200) {
          // Extract the relevant data (name, location, contact_email, contact_phone)
          const fetchedColleges = response.data.map((college) => ({
            name: college.name,
            location: college.location,
            contactEmail: college.contact_email,
            contactPhone: college.contact_phone,
            logo: college.logo || "https://via.placeholder.com/150", // Default placeholder if logo is missing
          }));
          setColleges(fetchedColleges);
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching colleges:",
          error.response || error.message
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        colleges.map((college, index) => (
          <CollegeCard key={index} college={college} />
        ))
      )}
    </div>
  );
};

export default TopColleges;
