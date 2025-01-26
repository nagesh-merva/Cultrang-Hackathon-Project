import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/OtherPages/LandingPage";
import Auth from "./pages/Recruiter/Auth";
import AdminAuth from "./pages/CollegeAdminPage/Auth"
import AdminPage from "./pages/CollegeAdminPage/AdminPage"
import Auth from "./pages/RecruiterPage/Auth";

import RecruiterPage from "./pages/RecruiterPage/RecruiterPage";
import StudentPage from "./pages/StudentPage/StudentProfilePage";
import StudentAuth from "./pages/StudentPage/StudentAuth"

const App = () => {
  return <div>
    <Routes>
      <Route index path="/" element={<LandingPage />} />
      <Route path="/recruiters/auth" element={<Auth />} />
      <Route path="/recruiters/dashboard" element={<RecruiterPage />} />
      <Route path="/college/auth" element={<AdminAuth />} />
      <Route path="/college/admin" element={<AdminPage />} />
      <Route path="/student/auth" element={<StudentAuth />} />
      <Route path="/student/dashboard" element={<StudentPage />} />
    </Routes>
  </div>
};

export default App;
