import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminNewCategoryPage() {
    const [formData, setFormData] = useState({
        nombre: '',
        slug: '',
        descripcion: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add category creation logic
        navigate('/admin/categorias');
    };

    return (
        <div>
            <h2>Nueva Categoría</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '20px 0' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Nombre:
                        <input
                            type="text"
                            value={formData.nombre}
                            onChange={e => setFormData({...formData, nombre: e.target.value})}
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Crear Categoría
                </button>
            </form>
        </div>
    );
}

export default AdminNewCategoryPage;
