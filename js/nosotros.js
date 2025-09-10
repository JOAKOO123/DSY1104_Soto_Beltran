// js/nosotros.js (MÓDULO)
import { COMUNAS_POR_REGION } from './regiones_comunas.js';

(function () {
  const mapEl = document.getElementById('mapa-presencia');
  const fbEl  = document.getElementById('mapa-fallback');

  // Si no está Leaflet o falta el contenedor, mostrar fallback y salir.
  if (!mapEl || typeof L === 'undefined') {
    if (fbEl) fbEl.classList.remove('hidden');
    return;
  }

  // Ciudades del enunciado
  const CIUDADES_OBJETIVO = new Set([
    'Santiago',
    'Valparaíso',
    'Viña del Mar',
    'Concepción',
    'Nacimiento',
    'Villarrica',
    'Puerto Montt'
  ]);

  // Coordenadas aproximadas
  const COORDS = {
    'Santiago':     [-33.4489, -70.6693],
    'Valparaíso':   [-33.0472, -71.6127],
    'Viña del Mar': [-33.0153, -71.5500],
    'Concepción':   [-36.8201, -73.0444],
    'Nacimiento':   [-37.5014, -72.6753],
    'Villarrica':   [-39.2856, -72.2279],
    'Puerto Montt': [-41.4693, -72.9424]
  };

  // Aplanamos regiones → comunas, filtramos las del enunciado, y añadimos coords
  const puntos = Object.entries(COMUNAS_POR_REGION)
    .flatMap(([region, comunas]) =>
      comunas
        .filter(ciudad => CIUDADES_OBJETIVO.has(ciudad))
        .map(ciudad => ({ ciudad, region, coords: COORDS[ciudad] }))
    )
    .filter(p => Array.isArray(p.coords)); // por si faltara alguna coord

  try {
    // Centro aproximado de Chile
    const map = L.map(mapEl, {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([-35.6751, -71.5430], 5);

    // Capa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Marcadores
    const markers = [];
    puntos.forEach(p => {
      const m = L.marker(p.coords, { title: p.ciudad })
        .addTo(map)
        .bindPopup(`<strong>${p.ciudad}</strong><br><small>${p.region}</small>`);
      markers.push(m);
    });

    // Ajuste a los marcadores
    if (markers.length) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.25));
    }

    // Oculta fallback si todo salió bien
    if (fbEl) fbEl.classList.add('hidden');

  } catch (err) {
    console.error('Fallo al inicializar mapa:', err);
    if (fbEl) fbEl.classList.remove('hidden');
    if (mapEl) mapEl.classList.add('hidden');
  }
})();
