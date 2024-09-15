import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { isTokenValid } from "../Utils";

const ProtectedRoute = ({ children }) => {
  // Render children if token is valid, otherwise redirect to login page
  const token = localStorage.getItem("authToken");
  const isAuthenticated = isTokenValid(token);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
