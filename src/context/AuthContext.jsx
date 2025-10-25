import React, { createContext, useState, useContext, useEffect } from 'react';
import { USUARIOS as seedUsers } from '../data/usuarios.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('mitienda_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const allUsers = localStorage.getItem('mitienda_users');
      if (!allUsers) {
        localStorage.setItem('mitienda_users', JSON.stringify(seedUsers));
        console.log('Usuarios predefinidos cargados en localStorage.');
      }
    } catch (error) {
      console.error("Error al inicializar AuthContext:", error);
      localStorage.clear();
    }
  }, []);

  const login = (userData) => {
    try {
      localStorage.setItem('mitienda_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('mitienda_user');
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
