// Auth.jsx
import React, { useState } from 'react';
import Login from '../../components/CollegeAdmin/Auth/Login';

const Auth = () => {
  const [isSignUpView, setIsSignUpView] = useState(false);

  const toggleAuthView = () => {
    setIsSignUpView(!isSignUpView);
  };

  return (
    <div>
      {/* Conditionally render Login component based on isSignUpView */}
      {!isSignUpView && <Login toggleAuthView={toggleAuthView} />}
      {/* Add your Sign Up component here when needed */}
      {/* {isSignUpView && <SignUpComponent />} */}
    </div>
  );
};

export default Auth;
