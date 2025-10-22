import { Outlet } from 'react-router-dom'; // <-- Importa Outlet
import Header from './components/root/Header';
import Footer from './components/root/Footer';

function App() {
  return (
    <div>
      <Header />
      {/* Outlet le dice al enrutador dónde renderizar la ruta hija que coincida */}
      <Outlet /> {/* <-- Reemplaza HomePage con Outlet */}
      <Footer />
    </div>
  );
}

export default App;