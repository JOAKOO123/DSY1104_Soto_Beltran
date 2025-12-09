import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function AdminRouteGuard() {
  const { token, rol } = useAuth();

  // 1) Si no hay token → no está logueado
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2) Si el rol no es ADMIN → no puede acceder
  if (rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // 3) Si pasa validaciones → puede entrar
  return <Outlet />;
}

export default AdminRouteGuard;
