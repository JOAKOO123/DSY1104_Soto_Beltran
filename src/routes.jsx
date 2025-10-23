// src/routes.jsx (¡ARREGLADO!)
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// --- Páginas ---
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product-detail';
import LoginPage from './pages/login';           // <-- De tu rama 'develop'
import RegisterPage from './pages/register';     // <-- De tu rama 'develop'
import NosotrosPage from './pages/nosotros';     // <-- Común en ambas
import ContactPage from './pages/contact';         // <-- Común en ambas
import BlogsPage from './pages/blogs';         // <-- De la rama 'feature/blogs'
import BlogDetailPage from './pages/blog-detail'; // <-- De la rama 'feature/blogs'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: 'productos', element: <ProductsPage /> },
      { path: 'productos/:productCode', element: <ProductDetailPage /> },
      { path: 'login', element: <LoginPage /> },           // <-- De tu rama 'develop'
      { path: 'registro', element: <RegisterPage /> },   // <-- De tu rama 'develop'
      { path: 'nosotros', element: <NosotrosPage /> },     // <-- Común en ambas
      { path: 'contacto', element: <ContactPage /> },       // <-- Común en ambas
      { path: 'blogs', element: <BlogsPage /> },         // <-- De la rama 'feature/blogs'
      { path: 'blogs/:blogId', element: <BlogDetailPage /> }, // <-- De la rama 'feature/blogs'
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;