// src/pages/order-confirmation/index.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

// (Usamos el formateador de dinero localmente aquí)
const formatMoney = (n) => new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP'}).format(n);

function OrderConfirmationPage() {
    const { orderId } = useParams(); // Obtenemos el ID de la URL

    // **NOTA:** En una app real, aquí harías un fetch a tu API 
    // usando el 'orderId' para obtener los datos de la orden.
    // Usaremos datos fijos (hardcodeados) para simular la vista.
    
    const orderData = {
        total: 28775, // Simulado de tu imagen
        items: [
            { name: 'Fortnite', precio: 0, cantidad: 1, subtotal: 0 },
            { name: 'Minecraft', precio: 2695, cantidad: 4, subtotal: 10780 },
            { name: 'Red Dead Redemption 2', precio: 5999, cantidad: 1, subtotal: 5999 },
            // ... (resto de ítems)
        ]
    };

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div className="order-result-box" style={{ background: '#fff', border: '1px solid #198754', padding: '2rem', borderRadius: '8px', maxWidth: '700px', margin: '0 auto' }}>
                
                <div style={{ float: 'right', fontWeight: 'bold' }}>CÓDIGO ORDEN: {orderId}</div>
                <h1 style={{ color: '#198754', marginTop: 0 }}>✅ Se ha realizado la compra.</h1>
                
                <p>Detalle de la compra:</p>
                {/* Aquí iría la info del cliente (nombre, dirección) que vendría de la API */}

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: '#f4f4f4' }}>
                            <th style={{ padding: '8px' }}>Imagen</th>
                            <th style={{ padding: '8px' }}>Nombre</th>
                            <th style={{ padding: '8px' }}>Precio</th>
                            <th style={{ padding: '8px' }}>Cantidad</th>
                            <th style={{ padding: '8px', textAlign: 'right' }}>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.items.map((item, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '8px' }}><img src={`/assets/placeholder-64.png`} alt={item.name} width="40" /></td>
                                <td style={{ padding: '8px' }}>{item.name}</td>
                                <td style={{ padding: '8px' }}>{formatMoney(item.precio)}</td>
                                <td style={{ padding: '8px' }}>{item.cantidad}</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>{formatMoney(item.subtotal)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <h3 style={{ textAlign: 'right', marginTop: '1rem', color: '#333' }}>
                    Total pagado: {formatMoney(orderData.total)}
                </h3>

                <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <button className="btn-secondary" style={{ marginRight: '1rem' }}>Imprimir boleta en PDF</button>
                    <button className="btn-primary">Enviar boleta por email</button>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmationPage;