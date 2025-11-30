import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Normaliza el RUT quitando puntos y corrigiendo guiones raros
const normalizarRut = (rut) => {
  return rut
    .replace(/\./g, "")
    .replace("‐", "-")
    .replace(/\s+/g, "")
    .trim();
};

// Validar RUT chileno
const validarRutChileno = (rutCompleto) => {
  rutCompleto = rutCompleto.replace("‐", "-");

  if (!/^[0-9]+[-]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;

  const [rut, digv] = rutCompleto.split('-');
  let suma = 0;
  let multiplo = 2;

  for (let i = rut.length - 1; i >= 0; i--) {
    suma += rut.charAt(i) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  const dv = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "k" : dvEsperado.toString();

  return dv === digv.toLowerCase();
};

function RegisterPage() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rut, setRut] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    const nombreLimpio = nombre.trim();
    const emailLimpio = email.trim().toLowerCase();
    const rutLimpio = normalizarRut(rut.trim());
    const passwordLimpio = password;

    // Validaciones
    if (!nombreLimpio) {
      return setMensaje({ texto: "Por favor ingresa tu nombre.", tipo: "error" });
    }

    if (!rutLimpio || !validarRutChileno(rutLimpio)) {
      return setMensaje({ texto: "⚠️ El RUT ingresado no es válido.", tipo: "error" });
    }

    if (!emailLimpio) {
      return setMensaje({ texto: "Ingresa tu correo electrónico.", tipo: "error" });
    }

    if (!emailLimpio.endsWith("@duocuc.cl")) {
      return setMensaje({ texto: "⚠️ Solo se permiten correos @duocuc.cl", tipo: "error" });
    }

    if (!emailLimpio.includes("@") || !emailLimpio.includes(".")) {
      return setMensaje({ texto: "Correo electrónico inválido.", tipo: "error" });
    }

    if (!passwordLimpio) {
      return setMensaje({ texto: "Ingresa una contraseña.", tipo: "error" });
    }

    // Guardar usuario
    const usuariosGuardados = JSON.parse(localStorage.getItem('mitienda_users') || '[]');

    if (usuariosGuardados.some(user => user.email === emailLimpio)) {
      return setMensaje({ texto: "Este correo ya está registrado.", tipo: "error" });
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre: nombreLimpio,
      rut: rutLimpio,
      email: emailLimpio,
      password: passwordLimpio
    };

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("mitienda_users", JSON.stringify(usuariosGuardados));

    setMensaje({ texto: "¡Registro exitoso! Redirigiendo...", tipo: "ok" });

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="container" style={{ paddingBlock: "2rem" }}>
      <form onSubmit={handleRegister} style={{ maxWidth: "400px", margin: "auto" }} noValidate>
        <h1>Registrar Usuario</h1>

        <label htmlFor="reg-nombre">Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label htmlFor="reg-rut">RUT (ej: 12345678-9):</label>
        <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} />

        <label>Email institucional (@duocuc.cl)</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {mensaje.texto && (
          <div className={mensaje.tipo === "ok" ? "ok" : "error"}>{mensaje.texto}</div>
        )}

        <button className="btn-primary" style={{ marginTop: "1rem" }}>Registrarse</button>

        <p className="no-account">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;