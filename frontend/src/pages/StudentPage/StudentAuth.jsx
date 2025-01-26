import React, { useState } from 'react';
import Login from '../../components/Student/Auth/Login';
import Signup from '../../components/Student/Auth/Signup';

const StudentAuth = () => {
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
        <Signup />
      )}
    </div>
  );
};

export default StudentAuth;
