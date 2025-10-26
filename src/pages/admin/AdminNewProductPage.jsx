import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminNewProductPage() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nombre || !precio) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const newProduct = { 
      nombre, 
      precio: parseFloat(precio),
      code: Date.now().toString() 
    };
    
    console.log("Producto a guardar:", newProduct);
    alert(`¡Producto "${nombre}" agregado con éxito (simulado)!`);
    navigate('/admin/productos');
  };

  return (
    <div>
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ccc' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px' }}>Nombre del Producto</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="precio" style={{ display: 'block', marginBottom: '5px' }}>Precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            min="0"
            step="0.01"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default AdminNewProductPage;
