// src/pages/nosotros/index.jsx

import React from 'react';
// (Aquí importaremos el mapa más adelante)

function NosotrosPage() {
  return (
    <main id="contenido" className="container about-wrap">
      {/* Logo + nombre */}
      <div className="about-hero">
        {/*
          NOTA: Para que las imágenes funcionen, tu carpeta "assets"
          debe estar dentro de la carpeta "public/" de tu proyecto React.
          (Las rutas ahora empiezan con "/" )
        */}
        <img src="/assets/LogoTienda/LogoHuertoHogar.png" alt="Logo HuertoHogar" className="about-logo" />
        <h1 className="about-title">HuertoHogar</h1>
        <p className="about-sub">Frescura y Calidad de Campo</p>
      </div>

      {/* Misión y Visión */}
      <section aria-labelledby="mision-vision" className="about-section">
        <h2 id="mision-vision" className="about-section-title">Misión & Visión</h2>

        <div className="about-grid">
          <article className="about-card" aria-labelledby="mision-h">
            <h3 id="mision-h" className="about-h3">Nuestra misión</h3>
            <p>
              Llevar productos frescos y de calidad del campo a la puerta de los hogares de Chile, conectando a las familias con 
              agricultores locales y promoviendo una alimentación sana y sostenible.
            </p>
          </article>

          <article className="about-card" aria-labelledby="vision-h">
            <h3 id="vision-h" className="about-h3">Nuestra visión</h3>
            <p>
              Ser la tienda online líder en Chile en productos frescos y naturales, reconocida por su calidad, servicio y compromiso con 
              la sostenibilidad, estableciendo el estándar en distribución directa del productor al consumidor.
            </p>
          </article>
        </div>
      </section>

      {/* Equipo */}
      <section aria-labelledby="equipo" className="about-section">
        <h2 id="equipo" className="about-section-title">Nuestro equipo</h2>

        <div className="team-grid">
          <article className="team-card">
            <img src="/assets/equipo/Lucas.png" alt="Lucas Soto — Desarrollador Web" loading="lazy" />
            <div>
              <h3 className="team-name">Lucas Soto</h3>
              <p className="team-role">Desarrollador Web</p>
              <p className="team-bio"></p>
            </div>
          </article>

          <article className="team-card">
            <img src="/assets/equipo/Joaquin.png" alt="Joaquin Beltran — Desarrollador Web" loading="lazy" />
            <div>
              <h3 className="team-name">Joaquin Beltran</h3>
              <p className="team-role">Desarrollador Web</p>
              <p className="team-bio"></p>
            </div>
          </article>
        </div>
      </section>

      {/* Mapa de presencia */}
      <section aria-labelledby="mapa" className="about-section">
        <h2 id="mapa" className="about-section-title">Puntos de presencia</h2>

        <div className="map-card">
          {/*
            NOTA: El mapa interactivo NO aparecerá todavía.
            Este <div> está vacío. Necesitaremos instalar "react-leaflet"
            para añadir el mapa aquí. Lo podemos hacer después.
          */}
          <div id="mapa-presencia" className="mapbox" role="region" aria-label="Mapa con puntos de presencia">
            (El mapa interactivo irá aquí)
          </div>

          {/* Fallback si no carga el mapa (por ahora lo dejamos visible) */}
          <figure className="map-fallback" id="mapa-fallback">
            <img src="/assets/Mapa/static-mapa-presencia.png" alt="Mapa estático con puntos" />
            <figcaption className="muted">Cargando mapa interactivo...</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}

export default NosotrosPage;