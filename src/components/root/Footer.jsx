// src/components/root/Footer.jsx

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>HuertoHogar</h4>
          <p>Calidad, cercanía y buenos precios.</p>
        </div>
        <div>
          <h4>Navegación</h4>
          <nav aria-label="Enlaces de pie">
            {/* Usamos un estilo inline para simular la columna, aunque idealmente se haría con CSS */}
            <ul className="menu" style={{ flexDirection: 'column', gap: '.25rem' }}>
              <li><a href="/">Inicio</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </nav>
        </div>
        <div>
          <h4>Contacto</h4>
          <p>contacto@HuertoHogar.cl<br/>+56 9 1234 5678</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;