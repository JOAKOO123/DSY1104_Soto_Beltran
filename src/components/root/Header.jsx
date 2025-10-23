// src/components/root/Header.jsx
import React from 'react';
// 1. Importamos NavLink (para la navegación) y useCart (para el carrito)
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// 2. Aceptamos la prop "onCartClick" que viene desde App.jsx
function Header({ onCartClick }) {
  
  // 3. Obtenemos el contador de ítems del "cerebro" del carrito
  const { totalCount } = useCart();

  return (
    <header className="site-header">
      <div className="container nav-bar">
        
        {/* 4. CORREGIDO: Usamos <Link> para el logo */}
        <Link className="brand" to="/" aria-label="Ir al inicio">
          <img 
            src="/assets/LogoTienda/LogoHuertoHogar.png" 
            alt="Logo de HuertoHogar" 
            className="logo-img" 
          />
          <span>HuertoHogar</span>
        </Link>
        
        <nav className="primary-nav" aria-label="Principal">
          <ul className="menu">
            {/* 5. CORREGIDO: Usamos <NavLink> para la navegación */}
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/productos">Productos</NavLink></li>
            <li><NavLink to="/blogs">Blogs</NavLink></li>
            <li><NavLink to="/nosotros">Nosotros</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
          </ul>
        </nav>

        <div className="actions">
          {/* 6. ACTUALIZADO: Conectamos el botón del carrito */}
          <button 
            className="btn-icon" 
            type="button" 
            aria-label="Abrir carrito"
            onClick={onCartClick} // <-- Llama a la función para abrir el panel
          >
            🛒 
            <span className="badge" aria-live="polite">
              {totalCount} {/* <-- Muestra el contador real */}
            </span>
          </button>
          
          <div className="account-buttons">
            {/* 7. CORREGIDO: Usamos <NavLink> para login/registro */}
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