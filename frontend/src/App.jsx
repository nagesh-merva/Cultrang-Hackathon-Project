import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/OtherPages/LandingPage";
import Auth from "./pages/RecruiterPage/Auth";
import ProfilePage from "./components/Recruiter/CompanyProfile/CompanyProfile";
import RecruiterPage from "./pages/RecruiterPage/RecruiterPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/recruiters/auth" element={<Auth />} />
        <Route path="/recruiters/dashboard" element={<RecruiterPage />} />
      </Routes>
    </div>
  );
};

export default App;
