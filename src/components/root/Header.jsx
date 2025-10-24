// src/components/root/Header.jsx

import React from 'react';
// 1. IMPORTANTE: Usamos Link y NavLink de React Router
import { NavLink, Link } from 'react-router-dom';

// 2. Aceptamos totalCount y onCartClick como props para que sean dinámicos
function Header({ totalCount = 0, onCartClick = () => {} }) {
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
            {/* Usa la prop totalCount */}
            🛒 <span className="badge">{totalCount}</span>
          </button>
          
          {/* Botones Cuenta - Usamos NavLink */}
          <div className="account-buttons">
            <NavLink to="/login">Iniciar sesión</NavLink>
            <span aria-hidden="true"> | </span>
            <NavLink to="/registro">Registrar usuario</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;