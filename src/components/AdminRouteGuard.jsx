import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRouteGuard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Verificando permisos...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRouteGuard;
