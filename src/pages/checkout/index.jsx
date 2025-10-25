// src/pages/checkout/index.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate, Navigate } from 'react-router-dom';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CheckoutPage() {
    // Bandera para evitar la redirección
    const [isNavigating, setIsNavigating] = useState(false);

    // Hooks
    const { cartItems, totalPrice, formatMoney } = useCart(); // Quitamos clearCart
    const navigate = useNavigate();

    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [calle, setCalle] = useState('');
    const [depto, setDepto] = useState('');
    const [region, setRegion] = useState('Región Metropolitana de Santiago');
    const [comuna, setComuna] = useState('Cerrillos');
    const [indicaciones, setIndicaciones] = useState('');

    // Estados de validación
    const [feedback, setFeedback] = useState('');
    const [feedbackError, setFeedbackError] = useState(false);
    const [invalidNombre, setInvalidNombre] = useState(false);
    const [invalidApellidos, setInvalidApellidos] = useState(false);
    const [invalidCorreo, setInvalidCorreo] = useState(false);
    const [invalidCalle, setInvalidCalle] = useState(false);
    const [invalidRegion, setInvalidRegion] = useState(false);
    const [invalidComuna, setInvalidComuna] = useState(false);

    // --- HandleSubmit (con la bandera) ---
    const handleCheckout = (e) => {
        e.preventDefault();
        
        // Reseteo de errores
        setFeedback('');
        setFeedbackError(false);
        setInvalidNombre(false);
        setInvalidApellidos(false);
        setInvalidCorreo(false);
        setInvalidCalle(false);
        setInvalidRegion(false);
        setInvalidComuna(false);

        // Limpieza de datos
        const n = nombre.trim();
        const ap = apellidos.trim();
        const em = correo.trim().toLowerCase();
        const ca = calle.trim();
        const de = depto.trim();
        const re = region.trim();
        const co = comuna.trim();
        const ind = indicaciones.trim();

        // Validaciones
        if (!n) { setFeedback('❌ Debes ingresar un nombre'); setFeedbackError(true); setInvalidNombre(true); return; }
        if (!ap) { setFeedback('❌ Debes ingresar tus apellidos'); setFeedbackError(true); setInvalidApellidos(true); return; }
        if (!em) { setFeedback('❌ Debes ingresar un correo'); setFeedbackError(true); setInvalidCorreo(true); return; }
        if (!emailRegex.test(em)) { setFeedback('❌ El formato del correo no es válido'); setFeedbackError(true); setInvalidCorreo(true); return; }
        if (!ca) { setFeedback('❌ Debes ingresar una calle'); setFeedbackError(true); setInvalidCalle(true); return; }
        if (!re) { setFeedback('❌ Debes seleccionar una región'); setFeedbackError(true); setInvalidRegion(true); return; }
        if (!co) { setFeedback('❌ Debes seleccionar una comuna'); setFeedbackError(true); setInvalidComuna(true); return; }

        // --- Simulación de pago ---
        const orderId = '20240705'; 
        const paymentSuccess = Math.random() > 0.3;

        if (paymentSuccess) {
            
            // ¡Levantamos la bandera!
            setIsNavigating(true);

            // Guardamos los datos
            const orderDetails = {
                orderId: orderId,
                total: totalPrice,
                items: cartItems,
                cliente: { nombre: n, apellidos: ap, correo: em },
                direccion: { calle: ca, depto: de, region: re, comuna: co, indicaciones: ind }
            };
            try {
                sessionStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
            } catch (err) {
                console.error("Error guardando orden en sessionStorage", err);
            }

            // Ya no vaciamos el carrito aquí
            navigate(`/orden/exito/${orderId}`);
        } else {
            navigate(`/orden/error/${orderId}`);
        }
    };

    // --- Redirección (con la bandera) ---
    if (cartItems.length === 0 && !isNavigating) {
        return <Navigate to="/productos" replace />;
    }

    // --- 🚨 AQUÍ ESTÁ EL JSX COMPLETO Y CORREGIDO 🚨 ---
    return (
        <div className="container" style={{ padding: '2rem' }}>
            
            {/* Este DIV es el contenedor del grid */}
            <div 
                className="checkout-grid" 
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr', // 2 columnas
                    gap: '2rem' 
                }}
            >
                
                {/* --- Columna Izquierda: Formulario --- */}
                <form 
                    id="checkoutForm"
                    onSubmit={handleCheckout} 
                    noValidate
                    style={{ gridColumn: '1 / 2' }} // Columna 1
                >
                    <h2>Información del cliente</h2>
                    <p>Completa la siguiente información</p>
                    
                    {/* Nombre y Apellidos */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="nombre">Nombre*</label>
                            <input 
                                type="text" id="nombre" name="nombre" required 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className={invalidNombre ? 'is-invalid' : ''}
                                style={{ width: '100%' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="apellidos">Apellidos*</label>
                            <input 
                                type="text" id="apellidos" name="apellidos" required 
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                                className={invalidApellidos ? 'is-invalid' : ''}
                                style={{ width: '100%' }} />
                        </div>
                    </div>

                    {/* Correo */}
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="correo">Correo*</label>
                        <input 
                            type="email" id="correo" name="correo" required 
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className={invalidCorreo ? 'is-invalid' : ''}
                            style={{ width: '100%' }} />
                    </div>

                    {/* Título Dirección */}
                    <h2>Dirección de entrega de los productos</h2>
                    
                    {/* Calle y Depto */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 3 }}>
                            <label htmlFor="calle">Calle*</label>
                            <input 
                                type="text" id="calle" name="calle" required placeholder="Ingrese dirección de forma detallada" 
                                value={calle}
                                onChange={(e) => setCalle(e.target.value)}
                                className={invalidCalle ? 'is-invalid' : ''}
                                style={{ width: '100%' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="depto">Departamento (opcional)</label>
                            <input 
                                type="text" id="depto" name="depto" placeholder="Ej: 603" 
                                value={depto}
                                onChange={(e) => setDepto(e.target.value)}
                                style={{ width: '100%' }} />
                        </div>
                    </div>

                    {/* Región y Comuna */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="region">Región*</label>
                            <select 
                                id="region" name="region" required 
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className={invalidRegion ? 'is-invalid' : ''}
                                style={{ width: '100%' }}>
                                <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="comuna">Comuna*</label>
                            <select 
                                id="comuna" name="comuna" required 
                                value={comuna}
                                onChange={(e) => setComuna(e.target.value)}
                                className={invalidComuna ? 'is-invalid' : ''}
                                style={{ width: '100%' }}>
                                <option value="Cerrillos">Cerrillos</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Indicaciones */}
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="indicaciones">Indicaciones para la entrega (opcional)</label>
                        <textarea 
                            id="indicaciones" name="indicaciones" rows="3" placeholder="Ej: Entre calles, color del edificio..." 
                            value={indicaciones}
                            onChange={(e) => setIndicaciones(e.target.value)}
                            style={{ width: '100%', resize: 'none' }}></textarea>
                    </div>

                    {/* Feedback de Error */}
                    <p 
                      id="checkout-msg" 
                      aria-live="polite" 
                      className={feedbackError ? 'error' : 'ok'} 
                      style={{ color: feedbackError ? 'red' : 'green', fontWeight: 'bold' }}
                    >
                      {feedback}
                    </p>

                    {/* Botón Pagar */}
                    <button type="submit" className="btn-primary" style={{ background: '#198754', marginTop: '1rem', width: '100%', padding: '12px 0', fontSize: '1.1rem' }}>
                        Pagar ahora {formatMoney(totalPrice)}
                    </button>
                </form>

                {/* --- Columna Derecha: Resumen --- */}
                <aside 
                    className="order-summary" 
                    style={{ 
                        gridColumn: '2 / 3', // Columna 2
                        gridRow: '1' 
                    }}
                >
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

            </div> {/* Fin del .checkout-grid */}
        </div>
    );
}

export default CheckoutPage;