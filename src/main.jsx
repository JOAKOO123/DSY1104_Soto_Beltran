// src/main.jsx (El código correcto)
import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRoutes from './routes.jsx'; // <-- 1. Importa el "cerebro"
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes /> {/* <-- 2. Usa el "cerebro" (no <App />) */}
  </React.StrictMode>
);