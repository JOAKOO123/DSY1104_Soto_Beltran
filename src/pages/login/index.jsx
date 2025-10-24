import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { USUARIOS } from '../../data/usuarios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find user with matching email and password
    const user = USUARIOS.find(u => 
      u.correo === email && 
      u.password === password
    );

    if (user) {
      // Valid credentials - log in user
      login({ nombre: email.split('@')[0], correo: email });
      navigate('/');
    } else {
      // Invalid credentials
      setMensaje('Credenciales incorrectas');
    }
  };

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
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
        {mensaje && (
          <div id="login-mensaje" className={mensaje === 'ok' ? 'ok' : 'error'}>
            {mensaje}
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