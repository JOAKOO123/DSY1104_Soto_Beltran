import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después del login

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' }); // Para mostrar mensajes
  const navigate = useNavigate(); // Hook para la navegación

  // Función que se ejecuta al enviar el formulario
  const handleLogin = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setMensaje({ texto: '', tipo: '' }); // Limpia mensajes anteriores

    // --- Lógica de Validación (Simulada con localStorage) ---
    try {
      // Intentamos obtener los usuarios guardados (si existen)
      const usuariosGuardados = JSON.parse(localStorage.getItem('mitienda_users') || '[]');

      // Buscamos si existe un usuario con ese email y contraseña
      const usuarioEncontrado = usuariosGuardados.find(
        user => user.email === email && user.password === password 
      );

      if (usuarioEncontrado) {
        // ¡Éxito! Guardamos el usuario logueado en localStorage
        localStorage.setItem('mitienda_user', JSON.stringify(usuarioEncontrado));
        setMensaje({ texto: 'Inicio de sesión exitoso. Redirigiendo...', tipo: 'ok' });
        // Redirigimos al inicio después de un breve momento
        setTimeout(() => {
          navigate('/'); 
          window.location.reload(); // Forzamos recarga para que el Header se actualice
        }, 1000);
      } else {
        // Error: Credenciales incorrectas
        setMensaje({ texto: 'Email o contraseña incorrectos.', tipo: 'error' });
      }
    } catch (error) {
      console.error("Error al procesar login:", error);
      setMensaje({ texto: 'Ocurrió un error inesperado.', tipo: 'error' });
    }
    // --- Fin Lógica de Validación ---
  };

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: 'auto' }}>
        <h1>Iniciar Sesión</h1>

        <label htmlFor="login-email">Email:</label>
        <input
          type="email"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />

        <label htmlFor="login-password">Contraseña:</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Mostramos mensajes de éxito o error */}
        {mensaje.texto && (
          <div id="login-mensaje" className={mensaje.tipo === 'ok' ? 'ok' : 'error'}>
            {mensaje.texto}
          </div>
        )}

        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
          Ingresar
        </button>

        <p className="no-account">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;