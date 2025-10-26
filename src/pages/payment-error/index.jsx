// src/pages/payment-error/index.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PaymentErrorPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div className="order-result-box" style={{ background: '#fff', border: '1px solid #dc3545', padding: '2rem', borderRadius: '8px', maxWidth: '700px', margin: '0 auto' }}>
                
                <h1 style={{ color: '#dc3545', marginTop: 0 }}>❌ No se pudo realizar el pago. nro #{orderId}</h1>
                <p>Detalle de la compra:</p>

                {/* Este botón permite al usuario volver a la página de checkout para reintentar */}
                <button 
                    className="btn-primary" 
                    onClick={() => navigate('/checkout')} // Vuelve al formulario
                    style={{ background: '#198754', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', display: 'block', margin: '1.5rem auto', fontSize: '1rem' }}
                >
                    VOLVER A REALIZAR EL PAGO
                </button>

                {}
                {}
                <p>Por favor, revisa tus datos de pago e inténtalo nuevamente.</p>
            </div>
        </div>
    );
}

export default PaymentErrorPage;