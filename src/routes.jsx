// src/routes.jsx

import { createHashRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import App from './App';
import ProtectedRoute from './components/root/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';
import AdminRouteGuard from './components/AdminRouteGuard';

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
import UserProfilePage from './pages/UserProfilePage';
import AdminNewCategoryPage from './pages/admin/AdminNewCategoryPage';
//nuevas paginas conectadas al back
import OrderSuccess from './pages/orden/OrderSuccess';
import OrderError from './pages/orden/OrderError';

import CheckoutPage from './pages/checkout';
import OrderConfirmationPage from './pages/order-confirmation';
import PaymentErrorPage from './pages/payment-error';

const router = createHashRouter([
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
      //nuevo 
      // 🔥 PÁGINAS REALES CONECTADAS
      { path: 'orden/exito/:orderId', element: <OrderSuccess /> },
      { path: 'orden/error/:orderId', element: <OrderError /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'registro', element: <RegisterPage /> },
      { path: 'nosotros', element: <NosotrosPage /> },
      { path: 'contacto', element: <ContactPage /> },

      { path: 'blogs', element: <BlogsPage /> },
      { path: 'blogs/:blogId', element: <BlogDetailPage /> },

      { path: 'perfil', element: <UserProfilePage /> },
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'productos', element: <AdminProductsPage /> },
      { path: 'productos/nuevo', element: <AdminNewProductPage /> },
      { path: 'categorias', element: <AdminCategoriesPage /> },
      { path: 'categorias/nueva', element: <AdminNewCategoryPage /> },
      { path: 'usuarios', element: <AdminUsersPage /> },
      { path: 'ordenes', element: <AdminOrdersPage /> },
      { path: 'reportes', element: <AdminReportsPage /> },
      { path: 'perfil', element: <h2>Perfil de Administrador</h2> },
      { path: 'productos/criticos', element: <h2>Productos Críticos</h2> },
    ]
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
