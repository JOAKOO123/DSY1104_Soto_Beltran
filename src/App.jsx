// src/App.jsx (¡ESTE ES EL CÓDIGO CORRECTO!)

import { Outlet } from 'react-router-dom';
import Header from './components/root/Header';
// import Footer from './components/root/Footer'; // Lo dejo comentado, igual que tú

function App() {
  return (
    <>
      <Header />

      {/* El <Outlet /> es el espacio vacío donde "routes.jsx" 
        pondrá la página que corresponda (Home, Blogs, Contacto, etc.)
      */}
      <Outlet />

      {/* <Footer /> */} {/* Lo dejo comentado, igual que tú */}
    </>
  );
}

export default App;