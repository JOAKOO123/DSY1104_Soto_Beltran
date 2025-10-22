// src/main.jsx (¡Actualizado!)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. IMPORTA EL ROUTER
import App from './App.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. ENVUELVE TU APP CON EL ROUTER */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);