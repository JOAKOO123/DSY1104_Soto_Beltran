import React, { createContext, useState, useContext, useEffect } from 'react';
import { USUARIOS as seedUsers } from '../data/usuarios.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mitienda_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Force seed users on mount
    localStorage.setItem('mitienda_users', JSON.stringify(seedUsers));
    console.log('Usuarios predefinidos cargados en localStorage (forzado).');

    const savedUser = localStorage.getItem('mitienda_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    }
  }, []);

  const login = (userData) => {
    try {
      localStorage.setItem('mitienda_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('mitienda_user');
    setUser(null);
  };

  const handleRegister = (userData) => {
    const nuevoUsuario = {
      ...userData,
      correo: userData.email || userData.correo,
    };
    // ...existing registration logic...
  };

  const value = { user, login, logout, handleRegister };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
