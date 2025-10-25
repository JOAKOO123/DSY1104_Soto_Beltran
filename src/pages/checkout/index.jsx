// src/pages/checkout/index.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate, Navigate } from 'react-router-dom';

function CheckoutPage() {
    const { cartItems, totalPrice, formatMoney, clearCart } = useCart();
    const navigate = useNavigate(); // Para redirigir después del pago

    // 1. Si el carrito está vacío, no se puede comprar. Redirige.
    if (cartItems.length === 0) {
        return <Navigate to="/productos" replace />;
    }

    // 2. Simulación de pago al enviar el formulario
    const handleCheckout = (e) => {
        e.preventDefault();
        
        // Genera un ID de orden simulado (como el de tu imagen)
        const orderId = '20240705'; 
        // Decide aleatoriamente si el pago fue exitoso o no
        const paymentSuccess = Math.random() > 0.3; // 70% de éxito

        if (paymentSuccess) {
            // 3. ÉXITO (Figura 7)
            clearCart(); // Vacía el carrito
            navigate(`/orden/exito/${orderId}`); // Redirige a la pág de éxito
        } else {
            // 4. ERROR (Figura 8)
            // No vaciamos el carrito para que pueda reintentar
            navigate(`/orden/error/${orderId}`); // Redirige a la pág de error
        }
    };

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                
                {/* --- Columna Derecha: Resumen del Pedido --- */}
                <aside className="order-summary" style={{ gridColumn: '2 / 3', gridRow: '1' }}>
                    <div style={{ background: '#0d6efd', color: 'white', padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                        Total a pagar: {formatMoney(totalPrice)}
                    </div>
                    
                    <div style={{ padding: '1rem', background: '#f8f8f8', border: '1px solid #ddd' }}>
                        <h2>Carrito de compra</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {cartItems.map(item => (
                                <li key={item.code} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #ccc', padding: '8px 0' }}>
                                    <span>{item.name} (x{item.qty})</span>
                                    <span>{formatMoney(item.price * item.qty)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
                
                {/* --- Columna Izquierda: Formulario --- */}
                <form onSubmit={handleCheckout} style={{ gridColumn: '1 / 2', gridRow: '1' }}>
                    
                    <h2>Información del cliente</h2>
                    <p>Completa la siguiente información</p>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="nombre">Nombre*</label>
                            <input type="text" id="nombre" name="nombre" required style={{ width: '100%' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="apellidos">Apellidos*</label>
                            <input type="text" id="apellidos" name="apellidos" required style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="correo">Correo*</label>
                        <input type="email" id="correo" name="correo" required style={{ width: '100%' }} />
                    </div>

                    <h2>Dirección de entrega de los productos</h2>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 3 }}>
                            <label htmlFor="calle">Calle*</label>
                            <input type="text" id="calle" name="calle" required placeholder="Ingrese dirección de forma detallada" style={{ width: '100%' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="depto">Departamento (opcional)</label>
                            <input type="text" id="depto" name="depto" placeholder="Ej: 603" style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="region">Región*</label>
                            <select id="region" name="region" required style={{ width: '100%' }}>
                                <option>Región Metropolitana de Santiago</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="comuna">Comuna*</label>
                            <select id="comuna" name="comuna" required style={{ width: '100%' }}>
                                <option>Cerrillos</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="indicaciones">Indicaciones para la entrega (opcional)</label>
                        <textarea id="indicaciones" name="indicaciones" rows="3" placeholder="Ej: Entre calles, color del edificio, no tiene timbre." style={{ width: '100%', resize: 'none' }}></textarea>
                    </div>

                    <button type="submit" className="btn-primary" style={{ background: '#198754', marginTop: '1rem', width: '100%', padding: '12px 0', fontSize: '1.1rem' }}>
                        Pagar ahora {formatMoney(totalPrice)}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CheckoutPage;