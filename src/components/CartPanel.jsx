// src/components/CartPanel.jsx
// (¡ACTUALIZADO CON EL MODAL DENTRO DE ESTE MISMO ARCHIVO!)

import React, { useState } from 'react'; // <-- 1. Importa useState
import { useCart } from '../context/CartContext';
// (Ya no importamos ConfirmModal)

export function CartPanel({ isOpen, onClose }) {
  const { 
    cartItems, 
    totalPrice, 
    formatMoney, 
    updateQuantity,
    removeFromCart,
    clearCart 
  } = useCart();

  // 2. ¡Estado local para controlar el modal!
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. Función que se llama cuando se confirma el borrado
  const handleConfirmClear = () => {
    clearCart(); // Llama al "cerebro" para borrar
    setIsModalOpen(false); // Cierra el modal
  };

  return (
    // Usamos un Fragment <> para que el Panel y el Modal sean "hermanos"
    <>
      <aside id="cart-panel" className={`cart-panel ${isOpen ? 'active' : ''}`} aria-labelledby="cart-title">
        <h2 id="cart-title">Tu carrito</h2>

        <div id="cart-feedback" className="cart-feedback" role="status" aria-live="polite">
          {/* Cantidad actualizada. */}
        </div>

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
          {/* 4. ¡Botón actualizado! Ahora "abre el modal" */}
          <button 
            id="clear-cart" 
            type="button" 
            className="btn-primary"
            onClick={() => setIsModalOpen(true)} // <-- CAMBIO CLAVE
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

      {/* --- 5. EL MODAL (PUESTO AQUÍ MISMO) --- */}
      {/* Solo se muestra si 'isModalOpen' es true */}
      {isModalOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="modal-content" role="document">
            <h3 id="confirm-title">Vaciar carrito</h3>
            <p id="confirm-desc">¿Seguro que deseas eliminar todos los productos del carrito?</p>
            
            <div className="modal-actions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              
              {/* Botón Vaciar (con el estilo blanco de tu foto) */}
              <button 
                id="confirm-yes" 
                className="btn btn-outline" 
                type="button"
                onClick={handleConfirmClear} // Llama a la función de confirmar
              >
                Vaciar
              </button>
              
              {/* Botón Cancelar (con el estilo verde de tu foto) */}
              <button 
                id="confirm-no" 
                className="btn btn-primary"
                type="button"
                onClick={() => setIsModalOpen(false)} // Simplemente cierra el modal
              >
                Cancelar
              </button>

            </div>
          </div>
        </div>
      )}
      {/* --- FIN DEL MODAL --- */}
    </>
  );
}