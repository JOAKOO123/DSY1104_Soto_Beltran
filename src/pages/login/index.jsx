// src/pages/login/index.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const result = await login(email, password);

    if (!result.ok) {
      setMsg("❌ Credenciales inválidas");
      return;
    }

    setMsg("✔ Inicio de sesión exitoso. Redirigiendo...");

    const rol = localStorage.getItem("mitienda_rol");

    setTimeout(() => {
      if (rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }, 700);
  };

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {msg && <p>{msg}</p>}

        <button type="submit">Ingresar</button>
      </form>

      {/* 🔥 Enlace corregido al registro */}
      <p style={{ marginTop: "15px" }}>
        ¿No tienes cuenta?{" "}
        <Link to="/registro" style={{ color: "#007bff", fontWeight: "bold" }}>
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}

// l