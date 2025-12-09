import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  // -------------------------
  // VALIDACIONES
  // -------------------------
  const validate = () => {
    const newErrors = {};

    // Nombre
    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "El correo no tiene un formato válido.";
    }

    // Contraseña
    if (!form.password.trim()) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (form.password.length < 4) {
      newErrors.password = "La contraseña debe tener mínimo 4 caracteres.";
    }

    // Teléfono
    if (!form.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d{9}$/.test(form.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 9 dígitos.";
    }

    // Dirección
    if (!form.direccion.trim()) {
      newErrors.direccion = "La dirección es obligatoria.";
    }

    setErrors(newErrors);

    // Si NO hay errores → valido
    return Object.keys(newErrors).length === 0;
  };

  // -------------------------
  // SUBMISIÓN DEL FORMULARIO
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!validate()) {
      setMsg("❌ Corrige los errores antes de continuar.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setMsg("❌ Error al registrar. Revisa los datos.");
        return;
      }

      setMsg("✔ Usuario registrado correctamente. Redirigiendo...");

      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setMsg("❌ Error de conexión con el servidor.");
    }
  };

  // -------------------------
  // ACTUALIZAR FORM
  // -------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit} className="form-register">
        
        {/* NOMBRE */}
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <p className="error">{errors.nombre}</p>}

        {/* EMAIL */}
        <label>Correo</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* PASSWORD */}
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {/* TELEFONO */}
        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          maxLength="9"
          value={form.telefono}
          onChange={(e) => {
            // permitir solo números
            if (/^\d*$/.test(e.target.value)) handleChange(e);
          }}
        />
        {errors.telefono && <p className="error">{errors.telefono}</p>}

        {/* DIRECCION */}
        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
        />
        {errors.direccion && <p className="error">{errors.direccion}</p>}

        {/* MENSAJE */}
        {msg && <p className="msg">{msg}</p>}

        {/* BOTÓN */}
        <button type="submit" className="btn btn-success">
          Registrarse
        </button>
      </form>
    </div>
  );
}
