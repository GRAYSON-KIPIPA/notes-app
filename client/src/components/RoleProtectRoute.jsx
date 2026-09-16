import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

function RoleProtectedRoute({ allowedRoles }) {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <p>Checking authentication...</p>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const check = allowedRoles.includes(user?.role);
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/notes" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;
