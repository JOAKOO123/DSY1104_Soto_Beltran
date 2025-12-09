import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("mitienda_token"));
  const [rol, setRol] = useState(localStorage.getItem("mitienda_rol"));
  const [email, setEmail] = useState(localStorage.getItem("mitienda_email"));
  const [userId, setUserId] = useState(localStorage.getItem("mitienda_userId"));

  const [user, setUser] = useState(null);

  // 🔥 RECONSTRUIR USER CUANDO HAY DATOS EN LOCAL STORAGE
  useEffect(() => {
    if (token && email && rol && userId) {
      setUser({
        id: userId,
        email: email,
        role: rol,
      });
    } else {
      setUser(null);
    }
  }, [token, email, rol, userId]);

  // 🔥 LOGIN
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

    // Guardar en localStorage
    localStorage.setItem("mitienda_token", data.token);
    localStorage.setItem("mitienda_rol", data.rol);
    localStorage.setItem("mitienda_email", data.email);
    localStorage.setItem("mitienda_userId", data.userId);

    // Guardar en estado global
    setToken(data.token);
    setRol(data.rol);
    setEmail(data.email);
    setUserId(data.userId);

    // Construir user
    setUser({
      id: data.userId,
      email: data.email,
      role: data.rol
    });

    return { ok: true };
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.clear();

    setToken(null);
    setRol(null);
    setEmail(null);
    setUserId(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, rol, email, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
