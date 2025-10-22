// src/routes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// --- Páginas ---
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import ContactPage from './pages/contact';    // <-- Página de Contacto]
import NosotrosPage from './pages/nosotros';  // <-- Tu nueva página "Nosotros"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // La plantilla (Header/Footer/Outlet)
    children: [
      {
        index: true, // Esto hace que sea la página de inicio (ruta "/")
        element: <HomePage />,
      },
      {
        path: 'productos',
        element: <ProductsPage />,
      },
      {
        // --- RUTA DE CONTACTO AÑADIDA ---
        path: 'contacto',
        element: <ContactPage />,
      },
      {
        // --- RUTA DE NOSOTROS AÑADIDA ---
        path: 'nosotros',
        element: <NosotrosPage />,
      },
      // Aquí puedes añadir /blogs, etc. en el futuro
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;