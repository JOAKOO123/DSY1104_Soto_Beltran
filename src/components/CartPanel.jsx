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
    clearCart,
    isOpen,
    closeCart
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmClear = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <>
      <aside id="cart-panel" className={`cart-panel ${isOpen ? 'active' : ''}`}>
        <h2>Tu carrito</h2>

        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="cart-items-new">
              {cartItems.map((item, index) => (
                <li key={`${item.id}-${index}`} className="cart-item-new">

                  <img
                    src={item.image || '/assets/placeholder-64.png'}
                    alt={item.name}
                    className="cart-thumb"
                  />

                  <div className="cart-item-details">
                    <span className="item-name">{item.name}</span>

                    <div className="qty-controls">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                      >
                        -
                      </button>

                      <span className="qty-text">{item.qty}</span>

                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                      >
                        +
                      </button>

                      <button
                        type="button"
                        className="qty-btn remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        &times;
                      </button>
                    </div>
                  </div>

                  <span className="line-total">
                    {formatMoney(item.price * item.qty)}
                  </span>

                </li>
              ))}
            </ul>

            <p id="cart-total">Total: {formatMoney(totalPrice)}</p>
          </>
        )}

        <div className="cart-actions-row" style={{
          display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto'
        }}>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-outline" onClick={() => setIsModalOpen(true)} style={{ flex: 1 }}>
              Vaciar carrito
            </button>

            <button className="btn-primary" onClick={closeCart} style={{ flex: 1 }}>
              Cerrar
            </button>
          </div>

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

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Vaciar carrito</h3>
            <p>¿Quieres eliminar todos los productos?</p>

            <div className="modal-actions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={handleConfirmClear}>Vaciar</button>
              <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
