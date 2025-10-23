import { Routes, Route } from 'react-router-dom';

// Componentes globales (siempre visibles)
import Header from './components/root/Header';
// import Footer from './components/root/Footer';

// Páginas (las vistas que cambian)
import HomePage from './pages/home';      // La página principal
import ContactPage from './pages/contact';  //página de contacto

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

          {/*resto de páginas: /productos, /nosotros, etc. */}
        </Routes>
      </main>

      {/* <Footer /> */} {/* El Footer*/}
    </div>
  );
}

export default App;