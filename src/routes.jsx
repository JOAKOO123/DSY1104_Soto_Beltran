// src/routes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// --- Páginas ---
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product-detail';
import ContactPage from './pages/contact';
import NosotrosPage from './pages/nosotros';
import BlogsPage from './pages/blogs';
import BlogDetailPage from './pages/blog-detail'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: 'productos', element: <ProductsPage /> },
      {
        path: 'productos/:productCode',
        element: <ProductDetailPage />,
      },
      {
        path: 'contacto',
        element: <ContactPage />,
      },
      {
        path: 'nosotros',
        element: <NosotrosPage />,
      },
      { 
        path: 'blogs', 
        element: <BlogsPage />
      },
      { 
        path: 'blogs/:blogId', 
        element: <BlogDetailPage />
      }, 
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;