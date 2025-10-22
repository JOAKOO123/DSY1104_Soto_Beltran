// src/routes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/home';
import ProductsPage from './pages/products'; // <-- QUITA EL COMENTARIO AQUÍ

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { // <-- QUITA EL COMENTARIO AQUÍ
        path: 'productos',
        element: <ProductsPage />,
      }, // <-- QUITA EL COMENTARIO AQUÍ
      // Añade otras páginas aquí más adelante (Blogs, Nosotros, Contacto)
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;