// src/pages/order-confirmation/index.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 

// Ponemos el formateador de dinero aquí
const formatMoney = (n) => new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP'}).format(n);

function OrderConfirmationPage() {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // 2. Obtenemos la función clearCart
    const { clearCart } = useCart();

    useEffect(() => {
        try {
            const data = JSON.parse(sessionStorage.getItem('lastOrderDetails'));
            
            if (data && data.orderId === orderId) {
                setOrderData(data);
                
                // 3. Vaciamos el carrito AQUÍ
                clearCart();
            }
        } catch (err) {
            console.error("Error leyendo orden desde sessionStorage", err);
        }
        setLoading(false);
    }, [orderId, clearCart]); 

    // Si está cargando, muestra un loader
    if (loading) {
        return <div className="container" style={{padding: '2rem'}}>Cargando...</div>;
    }

    // Si no hay datos (ej: el usuario recargó la página o entró a la URL directo)
    if (!orderData) {
        // Lo mandamos al inicio
        return <Navigate to="/" replace />; 
    }

   
    const { total, items, cliente, direccion } = orderData;
    const totalPagado = formatMoney(total);

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div className="order-result-box success" style={{ background: '#fff', border: '1px solid #ddd', padding: '2rem', borderRadius: '8px', maxWidth: '700px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                
                <div style={{ float: 'right', fontWeight: 'bold', color: '#555', fontSize: '0.9rem' }}>
                    Código orden: {orderId}
                </div>
                <h1 style={{ color: '#198754', marginTop: 0 }}>
                    ✅ Se ha realizado la compra.
                </h1>
                
                {/* --- SECCIÓN DATOS CLIENTE --- */}
                <h2>Información del cliente</h2>
                <div style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '4px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                        <strong>Nombre*</strong>
                        <strong>Apellidos*</strong>
                        <span>{cliente.nombre}</span>
                        <span>{cliente.apellidos}</span>
                        <strong style={{marginTop: '0.5rem'}}>Correo*</strong>
                        <span></span>
                        <span colSpan="2">{cliente.correo}</span>
                    </div>
                </div>

                {/* --- SECCIÓN DIRECCIÓN --- */}
                <h2 style={{marginTop: '1.5rem'}}>Dirección de entrega de los productos</h2>
                <div style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '4px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                        <strong>Calle*</strong>
                        <strong>Departamento (opcional)</strong>
                        <span>{direccion.calle}</span>
                        <span>{direccion.depto || 'N/A'}</span>
                        
                        <strong style={{marginTop: '0.5rem'}}>Región*</strong>
                        <strong style={{marginTop: '0.5rem'}}>Comuna*</strong>
                        <span>{direccion.region}</span>
                        <span>{direccion.comuna}</span>

                        <strong style={{marginTop: '0.5rem'}}>Indicaciones (opcional)</strong>
                        <span colSpan="2">{direccion.indicaciones || 'N/A'}</span>
                    </div>
                </div>
                
                {/* --- SECCIÓN PRODUCTOS --- */}
                <h2 style={{marginTop: '1.5rem'}}>Detalle de productos</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: '#f4f4f4' }}>
                            <th style={{ padding: '8px' }}>Imagen</th>
                            <th style={{ padding: '8px' }}>Nombre</th>
                            <th style={{ padding: '8px' }}>Precio</th>
                            <th style={{ padding: '8px', textAlign: 'center' }}>Cantidad</th>
                            <th style={{ padding: '8px', textAlign: 'right' }}>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.code} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '8px' }}>
                                    <img src={item.image || '/assets/placeholder-64.png'} alt={item.name} width="50" style={{borderRadius: '4px'}} />
                                </td>
                                <td style={{ padding: '8px' }}>{item.name}</td>
                                <td style={{ padding: '8px' }}>{formatMoney(item.price)}</td>
                                <td style={{ padding: '8px', textAlign: 'center' }}>{item.qty}</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>{formatMoney(item.price * item.qty)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <h2 style={{ textAlign: 'right', marginTop: '1.5rem', color: '#333' }}>
                    Total pagado: {totalPagado}
                </h2>

                {/* --- SECCIÓN BOTONES --- */}
                <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button className="btn-secondary" style={{background: '#dc3545', color: 'white'}}>Imprimir boleta en PDF</button>
                    <button className="btn-primary" style={{background: '#198754'}}>Enviar boleta por email</button>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmationPage;