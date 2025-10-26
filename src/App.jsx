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
      {/* 3. Pasa la función "openCart" al Header */}
      <Header onCartClick={openCart} />

      <Outlet />
      
      {/* <Footer /> */}

      {/* 4. Pasa el estado "isOpen" y la función "closeCart" al Panel */}
      <CartPanel 
        isOpen={isOpen} 
        onClose={closeCart} 
      />
    </>
  );
}

export default App;