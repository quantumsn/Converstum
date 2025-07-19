import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvidor";

const ProtectedRoute = ({ children }) => {
  let { isauthenticated } = useAuth();

  if (!isauthenticated) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
