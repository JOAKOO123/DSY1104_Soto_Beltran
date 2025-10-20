function Header() {
  return (
    <header className="site-header">
      <div className="container nav-bar">
        <a className="brand" href="/" aria-label="Ir al inicio">
          {/* Aquí irá tu logo más adelante */}
          <span>HuertoHogar</span>
        </a>
        <nav className="primary-nav" aria-label="Principal">
          <ul className="menu">
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </nav>
        <div className="actions">
          <button className="btn-icon" type="button" aria-label="Abrir carrito">
            🛒 <span className="badge">0</span>
          </button>
          <div className="account-buttons">
            <a href="/login">Iniciar sesión</a>
            <span aria-hidden="true"> | </span>
            <a href="/registro">Registrar usuario</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;