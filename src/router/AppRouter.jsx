import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { productosLoader } from "../services/productosLoader";
import { productoDetalleLoader } from "../services/productoDetalleLoader";

import HomePage from "../pages/home/index.jsx";
import ProductsPage from "../pages/products/index.jsx";
import ProductDetailPage from "../pages/product-detail/index.jsx";
import BlogsPage from "../pages/blogs/index.jsx";
import BlogDetailPage from "../pages/blog-detail/index.jsx";
import CategoriesPage from "../pages/categories/index.jsx";
import ContactPage from "../pages/contact/index.jsx";
import CheckoutPage from "../pages/checkout/index.jsx";
import LoginPage from "../pages/login/index.jsx";
import RegisterPage from "../pages/register/index.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import OfertaPage from "../pages/oferta/index.jsx";
import NosotrosPage from "../pages/nosotros/index.jsx";
import UserProfilePage from "../pages/UserProfilePage.jsx";
import OrderConfirmationPage from "../pages/order-confirmation/index.jsx";
import PaymentErrorPage from "../pages/payment-error/index.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },

      // Aquí luego agregaremos los loaders
      {
        path: "/products",
        element: <ProductsPage />,
        loader: productosLoader
      },
      {
        path: "/product-detail/:id",
        element: <ProductDetailPage />,
        loader: productoDetalleLoader
      },
      { path: "/blogs", element: <BlogsPage /> },
      { path: "/blog-detail/:id", element: <BlogDetailPage /> },

      { path: "/categories", element: <CategoriesPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },

      { path: "/profile", element: <UserProfilePage /> },
      { path: "/nosotros", element: <NosotrosPage /> },
      { path: "/oferta", element: <OfertaPage /> },

      { path: "/order-confirmation", element: <OrderConfirmationPage /> },
      { path: "/payment-error", element: <PaymentErrorPage /> },
    ],
  },
]);
