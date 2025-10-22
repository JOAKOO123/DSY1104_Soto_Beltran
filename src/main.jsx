import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRoutes from './routes.jsx'; // <-- Importa el enrutador
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes /> {/* <-- Usa el enrutador aquí */}
  </React.StrictMode>
);