import React from 'react';
import { METRICAS_CLAVE, VENTAS_MENSUALES, TOP_PRODUCTOS } from '../../data/reportes_data.js';

const cardStyle = {
    flex: '1',
    minWidth: '220px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
};

function AdminReportsPage() {
  return (
    <div>
      <h2>Generación de Reportes</h2>

      <h3>Resumen General</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '30px', justifyContent: 'space-around' }}>
        <div style={{...cardStyle, borderLeft: '5px solid #007bff'}}>
          <p style={{ margin: 0, color: '#6c757d' }}>Ventas Totales</p>
          <h3 style={{ margin: '5px 0 0 0', color: '#007bff' }}>
            ${METRICAS_CLAVE.totalVentas.toLocaleString('es-CL')}
          </h3>
        </div>
        
        <div style={{...cardStyle, borderLeft: '5px solid #28a745'}}>
          <p style={{ margin: 0, color: '#6c757d' }}>Órdenes Completadas</p>
          <h3 style={{ margin: '5px 0 0 0', color: '#28a745' }}>
            {METRICAS_CLAVE.ordenesCompletadas}
          </h3>
        </div>
        
        <div style={{...cardStyle, borderLeft: '5px solid #ffc107'}}>
          <p style={{ margin: 0, color: '#6c757d' }}>Productos Bajo Stock</p>
          <h3 style={{ margin: '5px 0 0 0', color: '#ffc107' }}>
            {METRICAS_CLAVE.productosBajoStock}
          </h3>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h4>Ventas por Mes (Simulación)</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {VENTAS_MENSUALES.map(data => (
              <li key={data.mes} style={{ margin: '10px 0', borderBottom: '1px dotted #eee', paddingBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>{data.mes}:</span> ${data.ventas.toLocaleString('es-CL')}
                <div style={{ height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', marginTop: '5px' }}>
                  <div style={{ 
                    width: `${(data.ventas / 300000) * 100}%`,
                    height: '100%', 
                    backgroundColor: '#007bff', 
                    borderRadius: '4px' 
                  }}></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h4>Top Productos más Vendidos</h4>
          <ol style={{ paddingLeft: '20px' }}>
            {TOP_PRODUCTOS.map((producto, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                **{producto.nombre}** ({producto.cantidad} unidades)
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default AdminReportsPage;
