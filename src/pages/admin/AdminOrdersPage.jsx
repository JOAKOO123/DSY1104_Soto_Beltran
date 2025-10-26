import React from 'react';
import { ORDENES } from '../../data/ordenes_boletas.js';

function AdminOrdersPage() {
    const getStatusStyle = (estado) => {
        let color = '#6c757d';
        switch (estado) {
            case 'Entregado': color = '#28a745'; break;
            case 'Pendiente': color = '#ffc107'; break;
            case 'Cancelado': color = '#dc3545'; break;
            default: color = '#6c757d';
        }
        return { 
            padding: '4px 8px', 
            borderRadius: '4px', 
            color: 'white',
            backgroundColor: color,
            fontWeight: 'bold'
        };
    };
    
    const tableHeaderStyle = { padding: '10px', border: '1px solid #eee', textAlign: 'left', backgroundColor: '#f4f4f4' };
    const tableDataStyle = { padding: '8px', border: '1px solid #eee' };

    return (
        <div>
            <h2>Gestión de Órdenes / Boletas</h2>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', background: '#fff' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>ID de Orden</th>
                        <th style={tableHeaderStyle}>Fecha</th>
                        <th style={tableHeaderStyle}>Cliente</th>
                        <th style={tableHeaderStyle}>Estado</th>
                        <th style={{...tableHeaderStyle, textAlign: 'right'}}>Total</th>
                        <th style={{...tableHeaderStyle, textAlign: 'center'}}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ORDENES.map(orden => (
                        <tr key={orden.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={tableDataStyle}>{orden.id}</td>
                            <td style={tableDataStyle}>{orden.fecha}</td>
                            <td style={tableDataStyle}>{orden.cliente}</td>
                            <td style={tableDataStyle}>
                                <span style={getStatusStyle(orden.estado)}>
                                    {orden.estado}
                                </span>
                            </td>
                            <td style={{...tableDataStyle, textAlign: 'right'}}>
                                ${orden.total.toLocaleString('es-CL')}
                            </td>
                            <td style={{...tableDataStyle, textAlign: 'center'}}>
                                <button 
                                    onClick={() => alert(`Ver detalles de orden ${orden.id}`)}
                                    style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        color: '#007bff', 
                                        cursor: 'pointer', 
                                        textDecoration: 'underline' 
                                    }}
                                >
                                    Ver Detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminOrdersPage;
