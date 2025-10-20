// src/components/Hero.jsx

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>Frescura y calidad para tu día</h1>
          <p className="lead">Explora nuestro catálogo, filtra por categorías y arma tu carrito en segundos.</p>
          <a className="btn-primary" href="/productos">Ver catálogo</a>
        </div>
        <div className="hero-visual" aria-hidden="true"></div>
      </div>
    </section>
  );
}

export default Hero;