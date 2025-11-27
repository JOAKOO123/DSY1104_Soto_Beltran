// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mitienda_cart");
      if (stored) setCartItems(JSON.parse(stored));
    } catch {
      localStorage.removeItem("mitienda_cart");
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mitienda_cart", JSON.stringify(cartItems));
    setTotalPrice(cartItems.reduce((s, i) => s + i.price * i.qty, 0));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const found = prev.find(i => i.id === product.id);

      if (found) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, qty: i.qty + (product.qty || 1) }
            : i
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name || product.nombre,
          price: product.price || product.precio,
          image: product.image || product.urlImagen,
          qty: product.qty || 1
        }
      ];
    });
  };

  const updateQuantity = (id, qty) => {
    setCartItems(prev =>
      qty < 1
        ? prev.filter(i => i.id !== id)
        : prev.map(i => i.id === id ? { ...i, qty } : i)
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems,
      totalPrice,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      formatMoney: (v) => `$${(v || 0).toLocaleString('es-CL')}`
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
