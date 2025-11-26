import React from "react";
import ReactDOM from "react-dom/client";
import './styles.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter";

// IMPORTA TUS PROVIDERS
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
