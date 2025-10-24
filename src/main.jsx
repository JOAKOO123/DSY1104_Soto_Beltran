// src/main.jsx (El código correcto)
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes.jsx'; // <-- 1. Importa el "cerebro"
import './styles.css';

import { CartProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envuelve tu App con el Provider */}
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </React.StrictMode>,
);

