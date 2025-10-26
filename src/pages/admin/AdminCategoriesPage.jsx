import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIAS } from '../../data/categories.js';

function AdminCategoriesPage() {
    const categorias = CATEGORIAS;
    const tableHeaderStyle = { padding: '10px', border: '1px solid #eee', textAlign: 'left', backgroundColor: '#f4f4f4' };
    const tableDataStyle = { padding: '8px', border: '1px solid #eee' };

    return (
        <div>
            <h2>Gestión de Categorías</h2>
            
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '15px' }}>
                <Link to="/admin/categorias/nueva" 
                    style={{ 
                        display: 'inline-block', 
                        padding: '10px 15px', 
                        background: '#28a745',
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '4px',
                        fontWeight: 'bold'
                    }}>
                    + Nueva Categoría
                </Link>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', background: '#fff' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>ID</th>
                        <th style={tableHeaderStyle}>Nombre</th>
                        <th style={tableHeaderStyle}>Slug (URL)</th>
                        <th style={tableHeaderStyle}>Productos</th>
                        <th style={tableHeaderStyle}>Estado</th>
                        <th style={tableHeaderStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(cat => (
                        <tr key={cat.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={tableDataStyle}>{cat.id}</td>
                            <td style={tableDataStyle}>{cat.nombre}</td>
                            <td style={tableDataStyle}>{cat.slug}</td>
                            <td style={tableDataStyle}>{cat.productos}</td>
                            <td style={tableDataStyle}>{cat.estado}</td>
                            <td style={tableDataStyle}>
                                <Link to={`/admin/categorias/${cat.id}/editar`}>
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminCategoriesPage;
