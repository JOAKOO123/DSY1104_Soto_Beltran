// src/routes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/home';
import ProductsPage from './pages/products'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { 
        path: 'productos',
        element: <ProductsPage />,
      },
      // Añade otras páginas aquí más adelante (Blogs, Nosotros, Contacto)
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;