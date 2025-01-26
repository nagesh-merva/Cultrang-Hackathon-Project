import React, { useState } from 'react';
import Login from '../../components/Student/Auth/Login';
import Signup from '../../components/Student/Auth/Signup';

const StudentAuth = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup

  const toggleAuthView = () => {
    setIsLogin(!isLogin); // Toggle between login and signup views
  };
  console.log(isLogin)

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

export default StudentAuth;
