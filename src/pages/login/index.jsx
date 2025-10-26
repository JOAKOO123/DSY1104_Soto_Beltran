import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    const usuariosGuardados = JSON.parse(localStorage.getItem('mitienda_users') || '[]');
    const usuarioEncontrado = usuariosGuardados.find(
      user => user.correo === email && user.password === password
    );

    if (usuarioEncontrado) {
      login(usuarioEncontrado);
      setMensaje({ texto: 'Inicio de sesión exitoso. Redirigiendo...', tipo: 'ok' });
      
      setTimeout(() => {
        navigate("/");
      }, 50);
    } else {
      setMensaje({ texto: "Credenciales incorrectas", tipo: "error" });
    }
  };

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,.1)' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Iniciar Sesión</h1>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              aria-label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {mensaje.texto && (
            <p id="login-mensaje" className={mensaje.tipo === 'ok' ? 'ok' : 'error'}
              style={{ color: mensaje.tipo === 'error' ? '#d32f2f' : '#2e7d32', fontWeight: 'bold' }}>
              {mensaje.texto}
            </p>
          )}
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}