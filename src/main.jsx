// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// Ya NO importamos BrowserRouter ni App aquí
import AppRoutes from './routes.jsx'; // <-- Solo importamos nuestro enrutador
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Renderizamos AppRoutes, que ya contiene el RouterProvider */}
    <AppRoutes /> 
  </React.StrictMode>
);