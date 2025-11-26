// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("mitienda_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { ok: false, message: "Credenciales incorrectas" };
    }

    const data = await res.json();

    // Guardar token y usuario
    localStorage.setItem("mitienda_token", data.token);
    localStorage.setItem("mitienda_user", JSON.stringify(data.user));
    setUser(data.user);

    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("mitienda_token");
    localStorage.removeItem("mitienda_user");
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
