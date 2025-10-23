// src/pages/register/index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    // --- Lógica de Registro (Simulada con localStorage) ---
    try {
      const usuariosGuardados = JSON.parse(localStorage.getItem('mitienda_users') || '[]');

      // Verificamos si el email ya existe
      const emailExistente = usuariosGuardados.some(user => user.email === email);

      if (emailExistente) {
        setMensaje({ texto: 'Este email ya está registrado.', tipo: 'error' });
        return; // Detenemos el registro
      }

      // Creamos el nuevo usuario
      const nuevoUsuario = { 
        id: Date.now(), // ID simple basado en la fecha actual
        nombre, 
        email, 
        password // ¡IMPORTANTE: En una app real, NUNCA guardar contraseñas así!
      };

      // Añadimos el nuevo usuario a la lista y guardamos
      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem('mitienda_users', JSON.stringify(usuariosGuardados));

      setMensaje({ texto: '¡Registro exitoso! Redirigiendo a inicio de sesión...', tipo: 'ok' });
      // Redirigimos al login
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (error) {
      console.error("Error al procesar registro:", error);
      setMensaje({ texto: 'Ocurrió un error inesperado.', tipo: 'error' });
    }
    // --- Fin Lógica de Registro ---
  };

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <form onSubmit={handleRegister} style={{ maxWidth: '400px', margin: 'auto' }}>
        <h1>Registrar Usuario</h1>

        <label htmlFor="reg-nombre">Nombre:</label>
        <input
          type="text"
          id="reg-nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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

export default RegisterPage;