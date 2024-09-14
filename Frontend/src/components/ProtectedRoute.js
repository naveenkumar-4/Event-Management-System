
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
