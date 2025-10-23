// src/App.jsx
import { Outlet } from 'react-router-dom'; // <-- IMPORTANTE: Importa Outlet

import Header from './components/root/Header';
import Footer from './components/root/Footer'; // <-- Asegúrate que Footer exista y esté importado

function App() {
  return (
    <div>
      <Header />

      {/* ESTE ES EL CAMBIO CLAVE: Usa Outlet */}
      <main> 
        <Outlet /> 
      </main>
      {/* FIN DEL CAMBIO CLAVE */}

      <Footer /> 
    </div>
  );
}

export default App;