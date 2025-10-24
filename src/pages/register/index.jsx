// src/pages/register/index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- FUNCIÓN CORREGIDA PARA VALIDAR RUT CHILENO ---
const validarRutChileno = (rutCompleto) => {
  rutCompleto = rutCompleto.replace("‐", "-"); // Normaliza el guion
  if (!/^[0-9]+[-]{1}[0-9kK]{1}$/.test(rutCompleto)) {
    return false; // Formato inválido
  }
  const tmp = rutCompleto.split('-');
  let digv = tmp[1].toLowerCase(); // Dígito verificador a minúscula
  let rut = tmp[0]; // Cuerpo del RUT

  // Calcular dígito verificador esperado
  let suma = 0;
  let multiplo = 2;
  for (let i = rut.length - 1; i >= 0; i--) {
    suma += multiplo * rut.charAt(i);
    if (multiplo < 7) {
      multiplo++;
    } else {
      multiplo = 2;
    }
  }
  const dvEsperado = 11 - (suma % 11);
  let dv = (dvEsperado === 11) ? '0' : (dvEsperado === 10) ? 'k' : dvEsperado.toString();

  return dv === digv; // Compara el esperado con el ingresado
};
// --- FIN FUNCIÓN RUT CORREGIDA ---

function RegisterPage() {
  // --- Estados para los campos ---
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rut, setRut] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const navigate = useNavigate();

  // --- Manejador del envío del formulario ---
  const handleRegister = (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' }); 

    const nombreLimpio = nombre.trim();
    const emailLimpio = email.trim().toLowerCase();
    const rutLimpio = rut.trim();
    const passwordLimpio = password;

    console.log("Datos limpios:", { nombreLimpio, rutLimpio, emailLimpio, passwordLimpio });

    // 1. Nombre
    if (!nombreLimpio) {
      console.log("Validación fallida: Nombre vacío");
      setMensaje({ texto: 'Por favor, ingresa tu nombre.', tipo: 'error' }); 
      return; 
    }

    // 2. RUT
    if (!rutLimpio) {
      console.log("Validación fallida: RUT vacío");
      setMensaje({ texto: '⚠️ Por favor, ingresa un RUT válido (ej: 12345678-9).', tipo: 'error' }); 
      return; 
    }
    if (!validarRutChileno(rutLimpio)) {
      setMensaje({ 
        texto: '⚠️ El RUT ingresado no es válido. Verifica el número y dígito verificador.', 
        tipo: 'error' 
      }); 
      return; 
    }

    // 3. Email
    if (!emailLimpio) {
      console.log("Validación fallida: Email vacío");
      setMensaje({ texto: 'Por favor, ingresa tu correo electrónico.', tipo: 'error' }); 
      return; 
    }
    // Check @duocuc.cl domain first
    if (!emailLimpio.endsWith('@duocuc.cl')) {
      setMensaje({ 
        texto: '⚠️ Solo se permiten correos institucionales (@duocuc.cl). Por favor, usa tu correo DuocUC.', 
        tipo: 'error' 
      }); 
      return; 
    }
    // Then check general format
    if (!emailLimpio.includes('@') || !emailLimpio.includes('.')) {
      setMensaje({ texto: 'El formato del correo no es válido.', tipo: 'error' }); 
      return;
    }

    // 4. Contraseña
    if (!passwordLimpio) { 
       console.log("Validación fallida: Contraseña vacía");
       setMensaje({ texto: 'Por favor, ingresa una contraseña.', tipo: 'error' }); 
       return; 
    }

    console.log("Todas las validaciones pasaron.");

    try {
      console.log("Intentando verificar si el email existe...");
      const usuariosGuardados = JSON.parse(localStorage.getItem('mitienda_users') || '[]');
      const emailExistente = usuariosGuardados.some(user => user.email === emailLimpio);
      console.log("Email existente:", emailExistente);

      if (emailExistente) {
        console.log("Error: Email ya registrado.");
        setMensaje({ texto: 'Este correo electrónico ya está registrado.', tipo: 'error' });
        return; 
      }

      console.log("Creando nuevo usuario...");
      const nuevoUsuario = {
        id: Date.now(),
        nombre: nombreLimpio,
        rut: rutLimpio,
        email: emailLimpio,
        password: passwordLimpio
      };
      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem('mitienda_users', JSON.stringify(usuariosGuardados));

      console.log("Registro exitoso, redirigiendo...");
      setMensaje({ texto: '¡Registro exitoso! Redirigiendo...', tipo: 'ok' });
      setTimeout(() => navigate('/login'), 1500);

    } catch (error) {
      console.error("Error al procesar registro (catch):", error);
      setMensaje({ texto: 'Ocurrió un error inesperado al guardar.', tipo: 'error' });
    }
  };

  // --- Renderizado del formulario ---
  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <form onSubmit={handleRegister} style={{ maxWidth: '400px', margin: 'auto' }} noValidate>
        <h1>Registrar Usuario</h1>

        <label htmlFor="reg-nombre">Nombre:</label>
        <input
          type="text"
          id="reg-nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="reg-rut">RUT (ej: 12345678-9):</label>
        <input
          type="text"
          id="reg-rut"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          required
        />

        <label htmlFor="reg-email">Email:</label>
        <input
          type="email"
          id="reg-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="reg-password">Contraseña:</label>
        <input
          type="password"
          id="reg-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Mensaje de feedback */}
        {mensaje.texto && (
          <div id="registro-mensaje" className={mensaje.tipo === 'ok' ? 'ok' : 'error'}>
            {mensaje.texto}
          </div>
        )}

        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
          Registrarse
        </button>

        <p className="no-account">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </form>
    </div>
  );
}

// --- Exportación única ---
export default RegisterPage;