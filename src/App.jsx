// src/App.jsx
import { Outlet } from 'react-router-dom';
import React from 'react';

import Header from './components/root/Header';
import Footer from './components/root/Footer';
import { CartPanel } from './components/root/CartPanel';
import { useCart } from './context/CartContext';

function App() {
  const { isOpen, openCart, closeCart } = useCart();

  return (
    <>
      {/* Header principal */}
      <Header onCartClick={openCart} />

      {/* Aquí se renderizan todas las páginas */}
      <Outlet />

      {/* Footer AGREGADO nuevamente */}
      <Footer />

      {/* Panel del carrito */}
      <CartPanel 
        isOpen={isOpen}
        onClose={closeCart}
      />
    </>
  );
}

export default App;
