import React from "react";
import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/OtherPages/LandingPage";
import Auth from "./pages/Recruiter/Auth";
import RecruiterPage from "./pages/RecruiterPage/RecruiterPage";
import AdminAuth from "./pages/CollegeAdminPage/Auth";
import AdminPage from "./pages/CollegeAdminPage/AdminPage";

const App = () => {
  return <div>
    <Routes>
      <Route index path="/" element={<LandingPage />} />
      <Route path="/recruiters/auth" element={<Auth />} />
      <Route path="/recruiters/dashboard" element={<RecruiterPage />} />
      <Route path="/college/auth" element={<AdminAuth />} />
      <Route path="/college/admin" element={<AdminPage />} />
    </Routes>
  </div>
}

export default App