// src/components/root/CartPanel.jsx

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

export function CartPanel({ isOpen, onClose }) {
  const {
    cartItems,
    totalPrice,
    formatMoney,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmClear = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <>
      <aside id="cart-panel" className={`cart-panel ${isOpen ? 'active' : ''}`} aria-labelledby="cart-title">
        <h2 id="cart-title">Tu carrito</h2>
        <div id="cart-feedback" className="cart-feedback" role="status" aria-live="polite"></div>

        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <ul id="cart-items" className="cart-items-new">
              {cartItems.map(item => (
                <li key={item.code} className="cart-item-new">
                  <img src={item.image} alt={item.name} className="cart-thumb" />
                  <div className="cart-item-details">
                    <span className="item-name">{item.name}</span>
                    <div className="qty-controls">
                      <button type="button" className="qty-btn" onClick={() => updateQuantity(item.code, item.qty - 1)}>-</button>
                      <span className="qty-text">{item.qty}</span>
                      <button type="button" className="qty-btn" onClick={() => updateQuantity(item.code, item.qty + 1)}>+</button>
                      <button type="button" className="qty-btn remove" onClick={() => removeFromCart(item.code)}>&times;</button>
                    </div>
                  </div>
                  <span className="line-total">{formatMoney(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <p id="cart-total">Total: {formatMoney(totalPrice)}</p>
          </>
        )}

        <div className="cart-actions-row">
          <button
            id="clear-cart"
            type="button"
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
            disabled={cartItems.length === 0}
          >
            Vaciar carrito
          </button>
          <button
            id="close-cart"
            type="button" 
            className="btn-primary"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </aside>

      {isModalOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="modal-content" role="document">
            <h3 id="confirm-title">Vaciar carrito</h3>
            <p id="confirm-desc">¿Seguro que deseas eliminar todos los productos del carrito?</p>
            <div className="modal-actions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                id="confirm-yes"
                className="btn btn-outline"
                type="button"
                onClick={handleConfirmClear}
              >
                Vaciar
              </button>
              <button
                id="confirm-no"
                className="btn btn-primary"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
