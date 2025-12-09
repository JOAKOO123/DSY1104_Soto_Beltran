// src/routes.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import App from './App';

// Rutas protegidas
import ProtectedRoute from './components/root/ProtectedRoute';
import AdminRouteGuard from "./components/AdminRouteGuard";

// --- Páginas ---
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product-detail';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from './pages/login';
import NosotrosPage from './pages/nosotros';
import ContactPage from './pages/contact';
import BlogsPage from './pages/blogs';
import BlogDetailPage from './pages/blog-detail';
import CategoriesPage from './pages/categories';
import OfertaPage from './pages/oferta';
import UserProfilePage from './pages/UserProfilePage';

// Checkout y Transbank
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import WebpayReturnPage from './pages/WebpayReturnPage';

import OrderSuccess from './pages/orden/OrderSuccess';
import OrderError from './pages/orden/OrderError';

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminNewProductPage from './pages/admin/AdminNewProductPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminNewCategoryPage from './pages/admin/AdminNewCategoryPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';

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

      // 🔥 Checkout: AHORA ES PÚBLICO (para probar Webpay)
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },

      // Página de éxito del pago
      { path: 'checkout/success', element: <CheckoutSuccess /> },

      // Página de retorno desde Webpay (token_ws viene por GET)
      { path: 'webpay/return', element: <WebpayReturnPage /> },

      // 🔥 Páginas conectadas al backend para órdenes
      { path: 'orden/exito/:orderId', element: <OrderSuccess /> },
      { path: 'orden/error/:orderId', element: <OrderError /> },

      // Login / Registro
      { path: 'login', element: <LoginPage /> },
      { path: 'registro', element: <RegisterPage /> },
      // Páginas informativas
      { path: 'nosotros', element: <NosotrosPage /> },
      { path: 'contacto', element: <ContactPage /> },

      // Blog
      { path: 'blogs', element: <BlogsPage /> },
      { path: 'blogs/:blogId', element: <BlogDetailPage /> },

      // 🔐 Perfil (solo usuario logueado)
      {
        path: 'perfil',
        element: (
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // 🔥 ZONA ADMIN (solo ADMIN)
  {
    path: '/admin',
    element: (
      <AdminRouteGuard>
        <AdminLayout />
      </AdminRouteGuard>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'productos', element: <AdminProductsPage /> },
      { path: 'productos/nuevo', element: <AdminNewProductPage /> },
      { path: 'categorias', element: <AdminCategoriesPage /> },
      { path: 'categorias/nueva', element: <AdminNewCategoryPage /> },
      { path: 'usuarios', element: <AdminUsersPage /> },
      { path: 'ordenes', element: <AdminOrdersPage /> },
      { path: 'reportes', element: <AdminReportsPage /> },
    ],
  },
]);

function AppRoutes() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default AppRoutes;
