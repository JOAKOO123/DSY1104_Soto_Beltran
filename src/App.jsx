// src/App.jsx (¡Este es el código NUEVO con el Router!)

import { Routes, Route } from 'react-router-dom';

// Componentes globales (siempre visibles)
import Header from './components/root/Header';
// import Footer from './components/root/Footer'; // (Cuando creen el Footer, lo importan aquí)

// Páginas (las vistas que cambian)
import HomePage from './pages/home';      // La página principal
import ContactPage from './pages/contact';  // Tu página de contacto

function App() {
  return (
    <div>
      {/* El Header siempre se mostrará */}
      <Header />

      {/* El <main> ahora contiene las rutas */}
      <main>
        <Routes>
          {/* Ruta para el Home */}
          <Route path="/" element={<HomePage />} />

          {/* Ruta para tu página de Contacto */}
          <Route path="/contacto" element={<ContactPage />} />

          {/* Aquí agregarán el resto de páginas: /productos, /nosotros, etc. */}
        </Routes>
      </main>

      {/* <Footer /> */} {/* El Footer también iría aquí */}
    </div>
  );
}

export default App;