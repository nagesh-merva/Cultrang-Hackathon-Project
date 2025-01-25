import React, { useState } from "react";
import Sidebar from "../../components/CollegeAdmin/AdminPage/Sidebar";
import Footer from "../../components/CollegeAdmin/AdminPage/Footer";
import Dashboard from "../../components/CollegeAdmin/AdminPage/Dashboard";
import Company from "../../components/CollegeAdmin/AdminPage/Company";
import RegStud from "../../components/CollegeAdmin/AdminPage/RegStud";
import PlacedStud from "../../components/CollegeAdmin/AdminPage/PlacedStud";

const AdminPage = () => {
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const handleLinkClick = (link) => {
    setSelectedComponent(link);
  };

  let ComponentToRender;
  if (selectedComponent === "Dashboard") {
    ComponentToRender = Dashboard;
  } else if (selectedComponent === "Company") {
    ComponentToRender = Company;
  } else if (selectedComponent === "Registered Students") {
    ComponentToRender = RegStud;
  } else if (selectedComponent === "Placed Students") {
    ComponentToRender = PlacedStud;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white h-full">
        <Sidebar onLinkClick={handleLinkClick} />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-3/4 h-full">
        <div className="flex-1 p-6 overflow-auto">
          <ComponentToRender />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;
