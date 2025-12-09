import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  // Si NO hay token → no está logueado
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
