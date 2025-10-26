// src/routes.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import App from './App';
import ProtectedRoute from './components/root/ProtectedRoute';

// --- Páginas ---
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product-detail';
import LoginPage from './pages/login'; 
import RegisterPage from './pages/register';
import NosotrosPage from './pages/nosotros'; 
import ContactPage from './pages/contact'; 
import BlogsPage from './pages/blogs'; 
import BlogDetailPage from './pages/blog-detail'; 
import CategoriesPage from './pages/categories'; 
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminNewProductPage from './pages/admin/AdminNewProductPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';


import OfertaPage from './pages/oferta'; 

import CheckoutPage from './pages/checkout';           // Figura 6
import OrderConfirmationPage from './pages/order-confirmation'; // Figura 7 (Éxito)
import PaymentErrorPage from './pages/payment-error';         // Figura 8 (Error)

const router = createBrowserRouter([
 {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: 'productos', element: <ProductsPage /> },
      { path: 'productos/:productCode', element: <ProductDetailPage /> },
 
      { path: 'categorias', element: <CategoriesPage /> }, 
 
      
      { path: 'ofertas', element: <OfertaPage /> },

      
      { path: 'checkout', element: <CheckoutPage /> }, 
      { path: 'orden/exito/:orderId', element: <OrderConfirmationPage /> },
      { path: 'orden/error/:orderId', element: <PaymentErrorPage /> },

      { path: 'login', element: <LoginPage /> }, 
      { path: 'registro', element: <RegisterPage /> }, 
      { path: 'nosotros', element: <NosotrosPage /> }, 
      { path: 'contacto', element: <ContactPage /> },  
      { path: 'blogs', element: <BlogsPage /> }, 
      { path: 'blogs/:blogId', element: <BlogDetailPage /> }, 
   ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'productos', element: <AdminProductsPage /> },
          { path: 'usuarios', element: <AdminUsersPage /> },
          { path: 'categorias', element: <AdminCategoriesPage /> },
          { path: 'usuarios/nuevo', element: <h2>Nuevo Usuario Admin</h2> },
          { path: 'usuarios/:email/editar', element: <h2>Editar Usuario</h2> },
          { path: 'usuarios/:email/historial', element: <h2>Historial de Compras</h2> },
          { path: 'reportes', element: <AdminReportsPage /> },
          { path: 'perfil', element: <h2>Perfil de Administrador</h2> },
          { path: 'productos/criticos', element: <h2>Productos Críticos</h2> },
          { path: 'ordenes', element: <AdminOrdersPage /> },
        ]
      },
    ],
  },
]);

function AppRoutes() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default AppRoutes;