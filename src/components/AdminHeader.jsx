import React from 'react';
import { useAuth } from '../context/AuthContext';

function AdminHeader() {
  const { user, logout } = useAuth();
  const userName = user ? user.nombre : "Administrador";

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '60px',
      backgroundColor: '#1f2833',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      // ...header content...
    </header>
  );
}

export default AdminHeader;
