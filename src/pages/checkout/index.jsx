// src/pages/checkout/index.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CheckoutPage() {
    const [isNavigating, setIsNavigating] = useState(false);

    const { cartItems, totalPrice, formatMoney } = useCart();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Estados del formulario
    const [nombre, setNombre] = useState(user?.nombre || '');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState(user?.email || '');
    const [calle, setCalle] = useState('');
    const [depto, setDepto] = useState('');
    const [region, setRegion] = useState('Región Metropolitana de Santiago');
    const [comuna, setComuna] = useState('Cerrillos');
    const [indicaciones, setIndicaciones] = useState('');

    // Validación
    const [feedback, setFeedback] = useState('');
    const [feedbackError, setFeedbackError] = useState(false);
    const [invalidNombre, setInvalidNombre] = useState(false);
    const [invalidApellidos, setInvalidApellidos] = useState(false);
    const [invalidCorreo, setInvalidCorreo] = useState(false);
    const [invalidCalle, setInvalidCalle] = useState(false);
    const [invalidRegion, setInvalidRegion] = useState(false);
    const [invalidComuna, setInvalidComuna] = useState(false);

    const setError = (msg, setter) => {
        setFeedback(`❌ ${msg}`);
        setFeedbackError(true);
        setter(true);
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        // Reset errores
        setFeedback('');
        setFeedbackError(false);
        setInvalidNombre(false);
        setInvalidApellidos(false);
        setInvalidCorreo(false);
        setInvalidCalle(false);
        setInvalidRegion(false);
        setInvalidComuna(false);

        // Limpiar inputs
        const n = nombre.trim();
        const ap = apellidos.trim();
        const em = correo.trim().toLowerCase();
        const ca = calle.trim();
        const de = depto.trim();
        const re = region.trim();
        const co = comuna.trim();
        const ind = indicaciones.trim();

        // Validaciones
        if (!n) return setError('Debes ingresar un nombre', setInvalidNombre);
        if (!ap) return setError('Debes ingresar tus apellidos', setInvalidApellidos);
        if (!em) return setError('Debes ingresar un correo', setInvalidCorreo);
        if (!emailRegex.test(em)) return setError('El formato del correo no es válido', setInvalidCorreo);
        if (!ca) return setError('Debes ingresar una calle', setInvalidCalle);
        if (!re) return setError('Debes seleccionar una región', setInvalidRegion);
        if (!co) return setError('Debes seleccionar una comuna', setInvalidComuna);

        const orderId = Date.now().toString();
        const paymentSuccess = Math.random() > 0.3;

        if (paymentSuccess) {
            setIsNavigating(true);

            const orderDetails = {
                orderId,
                total: totalPrice,
                items: cartItems,
                cliente: { nombre: n, apellidos: ap, correo: em },
                direccion: { calle: ca, depto: de, region: re, comuna: co, indicaciones: ind }
            };

            sessionStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
            navigate(`/orden/exito/${orderId}`);
        } else {
            navigate(`/orden/error/${orderId}`);
        }
    };

    // Evita entrar sin carrito
    if (cartItems.length === 0 && !isNavigating) {
        return <Navigate to="/productos" replace />;
    }

    return (
        <div
            className="checkout-wrapper"
            style={{
                padding: "40px 0",
                background: "#F6F8FB",
                minHeight: "100vh"
            }}
        >

            {/* Caja invitado */}
            {!user && (
                <div
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto 20px auto",
                        padding: "15px 20px",
                        background: "#eef6ff",
                        border: "1px solid #cce6ff",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        color: "#003566"
                    }}
                >
                    👤 Estás comprando como <strong>invitado</strong>.
                    Si deseas guardar tu historial, puedes <Link to="/login">iniciar sesión</Link>.
                </div>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.6fr 1fr",
                    gap: "30px",
                    maxWidth: "1100px",
                    margin: "0 auto"
                }}
            >
                {/* FORMULARIO */}
                <div
                    style={{
                        background: "white",
                        padding: "30px 35px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
                    }}
                >
                    <h2 style={{ marginBottom: "10px", fontWeight: "700", fontSize: "1.6rem" }}>
                        Información del cliente
                    </h2>

                    <form onSubmit={handleCheckout} noValidate>

                        {/* Nombre / Apellidos */}
                        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
                            <div style={{ flex: 1 }}>
                                <label className="label-input">Nombre*</label>
                                <input
                                    className="modern-input"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div style={{ flex: 1 }}>
                                <label className="label-input">Apellidos*</label>
                                <input
                                    className="modern-input"
                                    value={apellidos}
                                    onChange={(e) => setApellidos(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Correo */}
                        <div style={{ marginBottom: "15px" }}>
                            <label className="label-input">Correo*</label>
                            <input
                                className="modern-input"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>

                        {/* Dirección */}
                        <h2 style={{ margin: "25px 0 10px", fontWeight: "700", fontSize: "1.4rem" }}>
                            Dirección de entrega
                        </h2>

                        <div style={{ marginBottom: "15px" }}>
                            <label className="label-input">Calle*</label>
                            <input
                                className="modern-input"
                                value={calle}
                                onChange={(e) => setCalle(e.target.value)}
                            />
                        </div>

                        {/* Region / Comuna */}
                        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
                            <div style={{ flex: 1 }}>
                                <label className="label-input">Región*</label>
                                <select
                                    className="modern-input"
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                >
                                    <option>Región Metropolitana de Santiago</option>
                                </select>
                            </div>

                            <div style={{ flex: 1 }}>
                                <label className="label-input">Comuna*</label>
                                <select
                                    className="modern-input"
                                    value={comuna}
                                    onChange={(e) => setComuna(e.target.value)}
                                >
                                    <option>Cerrillos</option>
                                </select>
                            </div>
                        </div>

                        <label className="label-input">Indicaciones (opcional)</label>
                        <textarea
                            rows="3"
                            className="modern-input"
                            value={indicaciones}
                            onChange={(e) => setIndicaciones(e.target.value)}
                            style={{ resize: "none" }}
                        />

                        {/* Feedback */}
                        <p style={{ color: feedbackError ? 'red' : 'green' }}>
                            {feedback}
                        </p>

                        {/* Botón */}
                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                padding: "14px 0",
                                border: "none",
                                borderRadius: "8px",
                                background: "#198754",
                                color: "white",
                                fontSize: "1.2rem",
                                fontWeight: "700",
                                cursor: "pointer",
                                transition: "0.2s"
                            }}
                            onMouseOver={(e) => e.target.style.background = "#157347"}
                            onMouseOut={(e) => e.target.style.background = "#198754"}
                        >
                            Pagar ahora {formatMoney(totalPrice)}
                        </button>

                    </form>
                </div>

                {/* RESUMEN */}
                <aside
                    style={{
                        background: "white",
                        padding: "20px 25px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                        height: "fit-content",
                        position: "sticky",
                        top: "20px"
                    }}
                >
                    <div
                        style={{
                            background: "#0d6efd",
                            padding: "12px",
                            borderRadius: "8px",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "700",
                            marginBottom: "15px",
                            fontSize: "1.1rem"
                        }}
                    >
                        Total a pagar: {formatMoney(totalPrice)}
                    </div>

                    <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Carrito</h3>

                    <ul style={{ padding: 0, listStyle: "none" }}>
                        {cartItems.map(item => (
                            <li
                                key={item.code}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "8px 0",
                                    borderBottom: "1px solid #eee",
                                    fontSize: "0.95rem"
                                }}
                            >
                                <span>{item.name} (x{item.qty})</span>
                                <span>{formatMoney(item.price * item.qty)}</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
}

export default CheckoutPage;
