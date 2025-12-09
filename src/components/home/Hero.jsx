// src/components/home/Hero.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_HH } from '../../data/productos_huerto.js';

const productImages = PRODUCTS_HH.map(product => product.imagen);

function Hero() {
  const [randomBgImage, setRandomBgImage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * productImages.length);
    const selectedImage = productImages[randomIndex];
    setRandomBgImage(selectedImage);
  }, []);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>Frescura y calidad para tu día</h1>
          <p className="lead">
            Explora nuestro catálogo, filtra por categorías y arma tu carrito en segundos.
          </p>

          {/* CAMBIO IMPORTANTE: Link en vez de <a> */}
          <Link className="btn-primary" to="/productos">
            Ver catálogo
          </Link>
        </div>

        <div 
          className="hero-visual"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${randomBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
      </div>
    </section>
  );
}

export default Hero;
