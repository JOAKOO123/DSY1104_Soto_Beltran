// src/components/CartPanel.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // 🚨 1. IMPORTA EL LINK

export function CartPanel() {
  const { 
    cartItems, 
    totalPrice, 
    formatMoney, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    isOpen,
    closeCart
  } = useCart();

  return (
    <aside 
      id="cart-panel" 
      className={`cart-panel ${isOpen ? 'active' : ''}`} 
      aria-labelledby="cart-title"
    >
      <h2 id="cart-title">Tu carrito</h2>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {/* ... (Aquí va tu <ul id="cart-items">...</ul>) ... */}
          <ul id="cart-items">
            {cartItems.map(item => (
              <li key={item.code}>
                {/* ... (Contenido del <li>: imagen, nombre, qty, etc.) ... */}
              </li>
            ))}
          </ul>
          <p id="cart-total">Total: {formatMoney(totalPrice)}</p>
        </>
      )}

      {/* --- 2. ÁREA DE ACCIONES ACTUALIZADA --- */}
      <div className="cart-actions-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        
        {/* Solo muestra el botón de Pagar si hay ítems */}
        {cartItems.length > 0 && (
          <Link 
            to="/checkout"  // <-- LLEVA A LA RUTA DE CHECKOUT
            className="btn-primary" 
            onClick={closeCart} // Cierra el panel al ir a la nueva página
            style={{ textAlign: 'center', background: '#198754' }} // Estilo verde como en Figura 5
          >
            Comprar ahora
          </Link>
        )}

        <button 
          id="clear-cart" 
          type="button" 
          className="btn-outline" // Botón de limpiar
          onClick={clearCart} 
        >
          Vaciar carrito
        </button>
        
        <button 
          id="close-cart" 
          type="button" 
          className="btn-secondary" // Botón de cerrar
          onClick={closeCart} 
        >
          Cerrar
        </button>
      </div>
    </aside>
  );
}