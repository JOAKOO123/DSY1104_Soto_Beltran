// src/App.jsx
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react'; // <-- Ya no se necesita useState
    
import Header from './components/root/Header';
import Footer from './components/root/Footer';
import { CartPanel } from './components/CartPanel';

// --- 1. Importa el "cerebro" ---
import { useCart } from './context/CartContext'; 

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // --- 2. Saca el estado y las funciones del "cerebro" ---
  const { isOpen, openCart: openCartFromContext, closeCart: closeCartFromContext } = useCart();

  return (
    <>
      {/* 3. Pasa la función "openCart" al Header */}
      <Header onCartClick={openCart} />

      <Outlet />
      
      {/* <Footer /> */}

      {/* 4. Pasa el estado "isOpen" y la función "closeCart" al Panel */}
      <CartPanel 
        isOpen={isCartOpen} 
        onClose={closeCart} 
      />
    </>
  );
}

export default App;