// src/pages/nosotros/index.jsx (¡Con el Mapa Manual!)

import React from 'react';

// --- 1. IMPORTACIONES PARA EL MAPA ---

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';



// --- 2. CONFIGURACIÓN DEL m,apa ---

const puntosDePresencia = [
  { id: 1, nombre: 'Santiago', coords: [-33.45694, -70.64827] },
  { id: 2, nombre: 'Valparaíso', coords: [-33.0458, -71.6197] },
  { id: 3, nombre: 'Viña del Mar', coords: [-33.02457, -71.55183] },
  { id: 4, nombre: 'Concepción', coords: [-36.82699, -73.05023] },
  { id: 5, nombre: 'Nacimiento', coords: [-37.505, -72.673] },
  { id: 6, nombre: 'Villarrica', coords: [-39.281, -72.228] },
  { id: 7, nombre: 'Puerto Montt', coords: [-41.471, -72.939] }
];

// Centramos el mapa un poco más al sur para que se vean todos
const mapCenter = [-38.45694, -72.64827];


function NosotrosPage() {
  return (
    <main id="contenido" className="container about-wrap">
      
      {/* --- HERO (LOGO + TÍTULO) --- */}
      <div className="about-hero">
        <img src="/assets/LogoTienda/LogoHuertoHogar.png" alt="Logo HuertoHogar" className="about-logo" />
        <h1 className="about-title">HuertoHogar</h1>
        <p className="about-sub">Frescura y Calidad de Campo</p>
      </div>

      {/* --- MISIÓN Y VISIÓN --- */}
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

      {/* --- EQUIPO --- */}
      <section aria-labelledby="equipo" className="about-section">
        <h2 id="equipo" className="about-section-title">Nuestro equipo</h2>
        <div className="team-grid">
          <article className="team-card">
            <img src="/assets/equipo/Lucas.png" alt="Lucas Soto — Desarrollador Web" loading="lazy" />
            <div>
              <h3 className="team-name">Lucas Soto</h3>
              <p className="team-role">Desarrollador Web</p>
            </div>
          </article>
          <article className="team-card">
            <img src="/assets/equipo/Joaquin.png" alt="Joaquin Beltran — Desarrollador Web" loading="lazy" />
            <div>
              <h3 className="team-name">Joaquin Beltran</h3>
              <p className="team-role">Desarrollador Web</p>
            </div>
          </article>
        </div>
      </section>

      {/* --- 3. SECCIÓN DEL MAPA ACTUALIZADA --- */}
      <section aria-labelledby="mapa" className="about-section">
        <h2 id="mapa" className="about-section-title">Puntos de presencia</h2>

        <div className="map-card">
          <MapContainer center={mapCenter} zoom={5} scrollWheelZoom={false} className="mapbox">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Marcadores (los "pines" de tu lista manual) */}
            {puntosDePresencia.map(punto => (
              <Marker key={punto.id} position={punto.coords}>
                <Popup>
                  {punto.nombre}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </main>
  );
}

export default NosotrosPage;