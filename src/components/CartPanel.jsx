// src/components/CartPanel.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; 

export function CartPanel() {
  
  const { 
    cartItems, 
    totalPrice, 
    formatMoney, 
    updateQuantity,
    removeFromCart,
    clearCart, // <-- Esta es la función que vacía SIN preguntar
    isOpen,    // <-- Estado para mostrar/ocultar panel
    closeCart  // <-- Función para cerrar panel
  } = useCart();

  // Estado local SOLO para el modal de confirmación
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmClear = () => {
    clearCart(); 
    setIsModalOpen(false); 
  };

  return (
    <>
      <aside id="cart-panel" className={`cart-panel ${isOpen ? 'active' : ''}`} aria-labelledby="cart-title">
        <h2 id="cart-title">Tu carrito</h2>

        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {/* 3. TU LISTA DE PRODUCTOS (con botones + / - / x) */}
            <ul id="cart-items" className="cart-items-new">
              {cartItems.map(item => (
                <li key={item.code} className="cart-item-new">
                  <img src={item.image || '/assets/placeholder-64.png'} alt={item.name} className="cart-thumb" />
                  <div className="cart-item-details">
                    <span className="item-name">{item.name}</span>
                    <div className="qty-controls">
                      <button typeD="button" className="qty-btn" onClick={() => updateQuantity(item.code, item.qty - 1)}>-</button>
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

        {/* ---------------------------------------------------- */}
        {/* 4. ÁREA DE ACCIONES (con el layout de la foto)      */}
        {/* ---------------------------------------------------- */}
        <div 
          className="cart-actions-row"
          // Empuja los botones al fondo del panel
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            marginTop: 'auto' 
          }}
        >
          {/* Fila superior: Vaciar y Cerrar (como en la foto) */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              id="clear-cart" 
              type="button" 
              className="btn-outline" // Botón blanco (como en la foto)
              onClick={() => setIsModalOpen(true)} // Abre el modal
              style={{ flex: 1 }}
            >
              Vaciar carrito
            </button>
            <button 
              id="close-cart" 
              type="button" 
              className="btn-primary" // Botón verde (como en la foto)
              onClick={closeCart} // Cierra el panel
              style={{ flex: 1 }}
            >
              Cerrar
            </button>
          </div>

          {}
          {cartItems.length > 0 && (
            <Link 
              to="/checkout"
              className="btn-primary" 
              onClick={closeCart}
              style={{ 
                textAlign: 'center', 
                background: '#198754', 
                width: '100%',
                padding: '10px 0' 
              }} 
            >
              Comprar ahora
            </Link>
          )}
        </div>
      </aside>

      {}
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