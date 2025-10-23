import { Outlet } from 'react-router-dom';
import Header from './components/root/Header';

function App() {
  return (
    <>
      <Header />

      {/* El <Outlet /> es el espacio vacío donde "routes.jsx" 
        pondrá la página que corresponda (Home, Blogs, Contacto, etc.)
      */}
      <Outlet />

      {/* <Footer /> */} {}
    </>
  );
}

export default App;