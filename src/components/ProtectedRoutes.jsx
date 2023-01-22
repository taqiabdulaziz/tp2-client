import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../repository/user.store';

function ProtectedRoute() {
  const { isAuthenticated } = useUserStore((state) => state);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
