// src/components/products/ProductGrid.jsx
import { Link } from 'react-router-dom'; // <-- 1. Importa Link

function ProductGrid({ products, totalFiltered }) {
  return (
    <section className="results">
      <div className="results-bar">
        <span>{totalFiltered} productos encontrados</span>
      </div>
      <div className="productos-grid">
        {products.map(product => (
          // --- 2. Envuelve la tarjeta con Link ---
          <Link 
            key={product.code} 
            to={`/productos/${product.code}`} // Construye la URL dinámica
            className="producto" // Mantenemos las clases para el estilo
          > 
            <div className="thumb">
              <img src={product.imagen} alt={product.nombre} />
            </div>
            <h2>{product.nombre}</h2>
            <p>{product.unidad}</p>
            <span className="precio">${product.precioCLP.toLocaleString('es-CL')}</span>
            {/* El botón ahora es decorativo, el enlace es toda la tarjeta */}
            {/* <button type="button">Agregar al carrito</button> */}
          </Link>
          // --- Fin del Link ---
        ))}
        {products.length === 0 && (
          <p>No se encontraron productos con los filtros seleccionados.</p>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;