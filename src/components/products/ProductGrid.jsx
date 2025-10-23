// src/components/products/ProductGrid.jsx
import { Link } from 'react-router-dom';

// --- 1. Acepta las nuevas props que vienen de 'products/index.jsx' ---
function ProductGrid({ products, totalFiltered, onAddToCart, formatMoney }) {

  // --- 2. Creamos la función para el botón ---
  const handleAddToCart = (e, product) => {
    // ¡ESTA LÍNEA ES LA MÁS IMPORTANTE!
    // Evita que el <Link> (el padre) se active y te redirija.
    e.preventDefault(); 
    
    // Llama a la función del "cerebro" para añadir el producto
    onAddToCart(product);
    
    // (Opcional: podrías añadir un feedback visual aquí)
    console.log("Producto añadido:", product.nombre);
  };

  return (
    <section className="results">
      <div className="results-bar">
        <span>{totalFiltered} productos encontrados</span>
      </div>
      <div className="productos-grid">
        {products.map(product => (
          <Link 
            key={product.code} 
            to={`/productos/${product.code}`} // El Link sigue envolviendo todo
            className="producto" 
          > 
            <div className="thumb">
              <img src={product.imagen} alt={product.nombre} />
            </div>
            <h2>{product.nombre}</h2>
            <p>{product.unidad}</p>
            
            {/* --- 3. Usamos tu helper 'formatMoney' --- */}
            {/* (Asumimos que precioCLP es un número, ej: 1000) */}
            <span className="precio">{formatMoney(product.precioCLP)}</span> 
            
            {/* --- 4. Descomentamos y conectamos el botón --- */}
            <button 
              type="button"
              onClick={(e) => handleAddToCart(e, product)}
            >
              Agregar al carrito
            </button>
          </Link>
        ))}
        {products.length === 0 && (
          <p>No se encontraron productos con los filtros seleccionados.</p>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;