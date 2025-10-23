// src/routes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/home';
import ProductsPage from './pages/products'; // <-- AÑADE ESTA IMPORTACIÓN
import ProductDetailPage from './pages/product-detail'; // <-- AÑADE ESTA IMPORTACIÓN
import ContactPage from './pages/contact'; // (Asegúrate que esta página exista)
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { // <-- AÑADE ESTA RUTA PARA LA LISTA DE PRODUCTOS
        path: 'productos',
        element: <ProductsPage />,
      },
      { // <-- AÑADE ESTA RUTA PARA EL DETALLE DEL PRODUCTO
        path: 'productos/:productCode',
        element: <ProductDetailPage />,
      },
      {
        path: 'contacto',
        element: <ContactPage />, // (Asegúrate que esta página exista)
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'registro',
        element: <RegisterPage />,
      },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;