import React, { useState } from "react";
import Signup from "../../components/Recruiter/Auth/Signup";
import Login from "../../components/Recruiter/Auth/Login";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup

  const toggleAuthView = () => {
    setIsLogin(!isLogin); // Toggle between login and signup views
  };

  return (
    <div>
      {/* Conditionally render Login or Signup component */}
      {isLogin ? (
        <Login toggleAuthView={toggleAuthView} />
      ) : (
        <Signup toggleAuthView={toggleAuthView} />
      )}
    </div>
  );
};

export default Auth;
