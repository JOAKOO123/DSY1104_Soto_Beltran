// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Cargar carrito
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mitienda_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCartItems(parsed);
      }
    } catch (err) {
      console.error("❌ JSON corrupto en localStorage. Se limpia.", err);
      localStorage.removeItem("mitienda_cart");
      setCartItems([]);
    }
  }, []);

  // 🔹 Guardar carrito
  useEffect(() => {
    try {
      localStorage.setItem("mitienda_cart", JSON.stringify(cartItems));
    } catch (err) {
      console.error("❌ No se pudo guardar carrito:", err);
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotalPrice(total);

  }, [cartItems]);

  // 🔹 Añadir productos
  const addToCart = (product) => {
    setCartItems(prev => {
      const found = prev.find(i => i.id === product.id);

      if (found) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      // ESTRUCTURA ÚNICA Y CORRECTA
      return [
        ...prev,
        {
          id: product.id,
          name: product.nombre,
          price: product.price || product.precio || product.precioCLP,
          image: product.image || product.imagen || "/assets/default.jpg",
          qty: 1
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

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro del CartProvider");
  return ctx;
};
