import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('mitienda_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al cargar usuario desde localStorage:", error);
      localStorage.removeItem('mitienda_user'); 
    }
  }, []);

  const login = (userData) => {
    try {
      localStorage.setItem('mitienda_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
       console.error("Error al guardar usuario en localStorage:", error);
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
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
