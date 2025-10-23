import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// --- Páginas ---
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product-detail';
import ContactPage from './pages/contact';    // <-- 1. Importa la de Contacto (de develop)
import NosotrosPage from './pages/nosotros';  // <-- 2. Importa la tuya (Nosotros)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // La plantilla (Header/Footer/Outlet)
    children: [
      { index: true, element: <HomePage /> },
      { path: 'productos', element: <ProductsPage /> },
      {
        path: 'productos/:productCode', // :productCode es un parámetro dinámico
        element: <ProductDetailPage />,
      },
      {
        // --- 3. AÑADE LA RUTA DE CONTACTO ---
        path: 'contacto',
        element: <ContactPage />,
      },
      {
        // --- 4. AÑADE LA RUTA DE NOSOTROS ---
        path: 'nosotros',
        element: <NosotrosPage />,
      },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;