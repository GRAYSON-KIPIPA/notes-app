import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

function ProtectedRoute() {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <CircularProgress size={20} />;
  }

  if (!user) {
    return <Navigate to="login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
