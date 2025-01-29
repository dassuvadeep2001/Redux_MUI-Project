import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userType = localStorage.getItem('userType');

  if (userType !== 'Admin') {
    // Redirect to the home page or an unauthorized page
    return <Navigate to="*" />;
  }

  return children;
};

export default ProtectedRoute;
