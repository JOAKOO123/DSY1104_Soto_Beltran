// src/routes.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

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

// ⬅️ 1. IMPORTAMOS EL NUEVO COMPONENTE DE CATEGORÍAS
import CategoriesPage from './pages/categories'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: 'productos', element: <ProductsPage /> },
      { path: 'productos/:productCode', element: <ProductDetailPage /> },
      
      // ⬅️ 2. AÑADIMOS LA RUTA DE CATEGORÍAS
      { path: 'categorias', element: <CategoriesPage /> }, 
      
      { path: 'login', element: <LoginPage /> },           
      { path: 'registro', element: <RegisterPage /> },  
      { path: 'nosotros', element: <NosotrosPage /> },     
      { path: 'contacto', element: <ContactPage /> },      
      { path: 'blogs', element: <BlogsPage /> },        
      { path: 'blogs/:blogId', element: <BlogDetailPage /> }, 
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;