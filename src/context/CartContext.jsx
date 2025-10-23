// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

const STORAGE_KEY = 'hh_cart_v1';
const money = (n) => new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP'}).format(n);
function safeParse(json, fallback) {
  try { return JSON.parse(json) ?? fallback; } catch { return fallback; }
}

const CartContext = createContext();

export function CartProvider({ children }) { 
  const [cartItems, setCartItems] = useState(() => {
    return safeParse(localStorage.getItem(STORAGE_KEY), []);
  });

  // --- 1. ¡NUEVO ESTADO PARA EL PANEL! ---
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // --- 2. ¡NUEVAS FUNCIONES PARA EL PANEL! ---
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.code) {
      console.warn("Intento de agregar producto inválido", product);
      return;
    }
    const q = Math.max(1, Number(quantity) || 1);

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.code === product.code);
      if (existingItem) {
        return prevItems.map(item =>
          item.code === product.code
            ? { ...item, qty: item.qty + q }
            : item
        );
      } else {
        const newItem = {
          code: product.code,
          name: product.nombre,
          price: Number(product.precioCLP) || 0,
          qty: q,
          image: product.imagen || ''
        };
        return [...prevItems, newItem];
      }
    });
    
    // --- 3. ¡LA MAGIA ESTÁ AQUÍ! ---
    // Después de agregar, abre el panel.
    setIsOpen(true); 
  };

  const updateQuantity = (productCode, newQuantity) => {
    const q = Number(newQuantity) || 0;
    if (q <= 0) {
      removeFromCart(productCode);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.code === productCode
            ? { ...item, qty: q }
            : item
        )
      );
    }
  };

  const removeFromCart = (productCode) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item.code !== productCode);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCount = useMemo(() => {
    return cartItems.reduce((a, it) => a + it.qty, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((a, it) => a + it.qty * it.price, 0);
  }, [cartItems]);

  // --- 4. ¡EXPORTAMOS LOS NUEVOS VALORES! ---
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalPrice,
    formatMoney: money,
    
    // Funciones y estado del panel
    isOpen,    // El estado (abierto/cerrado)
    openCart,  // La función para abrir
    closeCart  // La función para cerrar
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};