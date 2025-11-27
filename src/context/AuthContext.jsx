// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  
  // 🔹 Cargar usuario desde localStorage con protección
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("mitienda_user");

    // Si está vacío, null, "undefined", "null" → NO parsear
    if (!raw || raw === "undefined" || raw === "null") {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      return null;
    }
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
