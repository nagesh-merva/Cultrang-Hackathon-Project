// Auth.jsx
import React, { useState } from 'react';
import Login from '../../components/CollegeAdmin/Auth/Login';
import SignUp from '../../components/CollegeAdmin/Auth/Signup';

const Auth = () => {
  const [isSignUpView, setIsSignUpView] = useState(false);

  const toggleAuthView = () => {
    setIsSignUpView(!isSignUpView);
  };

  return (
    <div>
      {/* Conditionally render Login component based on isSignUpView */}
      {!isSignUpView && <Login toggleAuthView={toggleAuthView} />}
      {isSignUpView && <SignUp toggleAuthView={toggleAuthView} />}
    </div>
  );
};

export default Auth;
