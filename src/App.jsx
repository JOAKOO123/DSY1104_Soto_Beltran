import { Routes, Route } from 'react-router-dom';

// Componentes globales (siempre visibles)
import Header from './components/root/Header';
// import Footer from './components/root/Footer';

// Páginas (las vistas que cambian)
import HomePage from './pages/home';
import ContactPage from './pages/contact';
import NosotrosPage from './pages/nosotros'; // <-- 1. IMPORTA TU PÁGINA

function App() {
  return (
    <div>
      {/* El Header siempre se mostrará */}
      <Header />

      {/* El <main> contiene las rutas */}
      <main>
        <Routes>
          {/* Ruta para el Home */}
          <Route path="/" element={<HomePage />} />

          {/* Ruta para tu página de Contacto */}
          <Route path="/contacto" element={<ContactPage />} />

          {/* --- 2. AÑADE ESTA LÍNEA --- */}
          <Route path="/nosotros" element={<NosotrosPage />} />
          
        </Routes>
      </main>

      {/* <Footer /> */} {/* El Footer*/}
    </div>
  );
}

export default App;
