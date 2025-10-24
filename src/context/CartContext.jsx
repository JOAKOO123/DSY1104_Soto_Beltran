// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // Add isOpen state

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mitienda_cart');
      if (stored) setCartItems(JSON.parse(stored));
    } catch (error) { console.error("Error loading cart:", error); }
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    setTotalPrice(total);
    try {
      localStorage.setItem('mitienda_cart', JSON.stringify(cartItems));
    } catch (error) { console.error("Error saving cart:", error); }
  }, [cartItems]);

  const formatMoney = (amount) => {
    const numAmount = Number(amount) || 0;
    return `$${numAmount.toLocaleString('es-CL')}`;
  };

  const updateQuantity = (code, newQty) => {
    setCartItems(prev => {
      if (newQty < 1) {
        return prev.filter(item => item.code !== code);
      }
      return prev.map(item =>
        item.code === code ? { ...item, qty: newQty } : item
      );
    });
  };

  const removeFromCart = (code) => {
    setCartItems(prev => prev.filter(item => item.code !== code));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.code === product.code);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.code === product.code ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevItems, {
          code: product.code,
          name: product.nombre,
          price: product.precioCLP,
          image: product.imagen,
          qty: 1
        }];
      }
    });
    console.log("Producto añadido al estado del carrito:", product.nombre);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const value = {
    cartItems,
    totalPrice,
    formatMoney,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToCart,
    isOpen,
    openCart,
    closeCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};