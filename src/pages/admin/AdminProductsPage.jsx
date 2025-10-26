import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_HH } from '../../data/productos_huerto.js';
import { useAuth } from '../../context/AuthContext';

function AdminProductsPage() {
  const { user } = useAuth();
  const products = PRODUCTS_HH;
  const isAdmin = user && user.role === 'admin';

  return (
    <div>
      <h2>Gestión de Productos</h2>
      
      {isAdmin && (
        <Link to="/admin/productos/nuevo" className="btn-primary" 
          style={{ display: 'inline-block', marginBottom: '1rem', padding: '10px 15px', textDecoration: 'none' }}>
          + Nuevo Producto
        </Link>
      )}
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', background: '#fff' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #eee' }}>Código</th>
            <th style={{ padding: '10px', border: '1px solid #eee' }}>Nombre</th>
            <th style={{ padding: '10px', border: '1px solid #eee' }}>Precio</th>
            <th style={{ padding: '10px', border: '1px solid #eee' }}>Stock</th>
            <th style={{ padding: '10px', border: '1px solid #eee' }}>Estado</th>
            <th style={{ padding: '10px', border: '1px solid #eee' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.code} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{product.code}</td>
              <td style={{ padding: '8px' }}>{product.nombre}</td>
              <td style={{ padding: '8px' }}>{product.precio}</td>
              <td style={{ padding: '8px' }}>{product.stock}</td>
              <td style={{ padding: '8px' }}>{product.estado}</td>
              <td style={{ padding: '8px' }}>
                {isAdmin && (
                  <>
                    <Link to={`/admin/productos/${product.code}/editar`} style={{ marginRight: '10px' }}>
                      Editar
                    </Link>
                    <button onClick={() => alert(`Eliminar producto: ${product.nombre}`)}
                      style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductsPage;
