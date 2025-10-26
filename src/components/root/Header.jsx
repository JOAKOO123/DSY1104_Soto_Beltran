// src/components/root/Header.jsx

import React from 'react';
// 1. IMPORTANTE: Usamos Link y NavLink de React Router
import { NavLink, Link, useNavigate } from 'react-router-dom';
// 2. Aceptamos totalCount y onCartClick como props para que sean dinámicos
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Header({ onCartClick }) {
  const { user, logout } = useAuth();
  const isAdmin = user && user.role === 'admin';
  const linkDestination = isAdmin ? '/admin' : '/perfil';
  const linkText = isAdmin ? 'ADMIN' : 'Mi Perfil';
  const welcomeText = user ? `Hola, ${user.nombre}` : '';
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="container nav-bar">
        
        {/* ======================= 1. LOGO / BRAND ======================= */}
        {/* Usamos Link en lugar de <a> para navegar sin recargar la página */}
        <Link className="brand" to="/" aria-label="Ir al inicio">
          <img 
            src="/assets/LogoTienda/LogoHuertoHogar.png" 
            alt="Logo de HuertoHogar" 
            className="logo-img" 
          />
          <span>HuertoHogar</span>
        </Link>
        
        {/* ======================= 2. NAVEGACIÓN PRINCIPAL ======================= */}
        <nav className="primary-nav" aria-label="Principal">
          <ul className="menu">
            {/* Usamos NavLink para aplicar la clase 'active' automáticamente */}
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/productos">Productos</NavLink></li>
            
            {/* ⬅️ ¡NUEVO ENLACE! */}
            <li><NavLink to="/categorias">Categorías</NavLink></li> 
            <li><NavLink to="/ofertas">Ofertas</NavLink></li>
            <li><NavLink to="/blogs">Blogs</NavLink></li>
            <li><NavLink to="/nosotros">Nosotros</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
            {/* Agrega aquí cualquier otro enlace como /ofertas o /comprar si lo necesitas */}
          </ul>
        </nav>
        
        {/* ======================= 3. ACCIONES ======================= */}
        <div className="actions">
          {/* Botón Carrito - Ahora usa la prop onCartClick */}
          <button 
            className="btn-icon" 
            type="button" 
            aria-label="Abrir carrito"
            onClick={onCartClick} 
          >
            🛒 <span className="badge">{totalCount}</span>
          </button>
          
          {/* Botones Cuenta - Usamos NavLink */}
          <div className="account-buttons">
            {user ? (
              <>
                {!isAdmin && (
                  <span style={{ marginRight: '10px', color: '#333' }}>
                    {welcomeText}
                  </span>
                )}
                <Link 
                  to={linkDestination}
                  style={{ 
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    background: isAdmin ? '#4CAF50' : '#007bff',
                  }}
                >
                  {linkText}
                </Link>
                <button 
                  onClick={logout}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#dc3545', 
                    cursor: 'pointer',
                    marginLeft: '10px'
                  }}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                  Iniciar sesión
                </Link>
                <span style={{ color: '#ccc', margin: '0 10px' }}> | </span>
                <Link to="/registro" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;