import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// --- Páginas ---
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product-detail'; // <-- 1. Importa (aunque aún no existe)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // La plantilla (Header/Footer/Outlet)
    children: [
      { index: true, element: <HomePage /> },
      { path: 'productos', element: <ProductsPage /> },
      // --- 2. AÑADE ESTA NUEVA RUTA ---
      {
        path: 'productos/:productCode', // :productCode es un parámetro dinámico
        element: <ProductDetailPage />,
      },
      // --- Fin de la nueva ruta ---
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;