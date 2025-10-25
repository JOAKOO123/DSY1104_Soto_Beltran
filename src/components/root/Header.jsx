// src/components/root/Header.jsx

import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// 1. Importamos el hook para leer el contador del carrito
import { useCart } from '../../context/CartContext';

// 2. Ahora solo necesita recibir 'onCartClick'
function Header({ onCartClick = () => {} }) {
  
  // 3. Leemos el totalCount directamente del "cerebro"
  const { totalCount } = useCart();

  return (
    <header className="site-header">
      <div className="container nav-bar">
        
        {/* ======================= 1. LOGO / BRAND ======================= */}
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
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/productos">Productos</NavLink></li>
            <li><NavLink to="/categorias">Categorías</NavLink></li> 
            <li><NavLink to="/ofertas">Ofertas</NavLink></li>
            <li><NavLink to="/blogs">Blogs</NavLink></li>
            <li><NavLink to="/nosotros">Nosotros</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
            
            {/* 🚨 AQUÍ ESTÁ EL ENLACE AÑADIDO 🚨 */}
            <li><NavLink to="/checkout">Comprar</NavLink></li>
          </ul>
        </nav>
        
        {/* ======================= 3. ACCIONES ======================= */}
        <div className="actions">
          {/* Botón Carrito */}
          <button 
            className="btn-icon" 
            type="button" 
            aria-label="Abrir carrito"
            onClick={onCartClick} 
          >
            {/* 4. Usa el totalCount del hook */}
            🛒 <span className="badge">{totalCount}</span>
          </button>
          
          {/* Botones Cuenta */}
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