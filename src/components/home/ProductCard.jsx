// src/components/home/ProductCard.jsx

// --- 1. Acepta las nuevas props ---
function ProductCard({ product, onAddToCart, formatMoney }) {

  // --- 2. Función para manejar el clic en el botón ---
  const handleAddToCartClick = (e) => {
    // Evita que el clic se propague (si la tarjeta fuera un Link)
    e.preventDefault(); 
    e.stopPropagation(); 
    
    // Llama a la función del "cerebro"
    onAddToCart(product); 
  };

  return (
    // (Considera envolver esto en un <Link> si quieres que toda la tarjeta lleve al detalle)
    // <Link to={`/productos/${product.code}`} className="card">
    <div className="card">
      <div 
        className="thumb" 
        // --- 3. Usamos product.imagen ---
        style={{ backgroundImage: `url(${product.imagen})` }} 
      >
      </div>
      
      {/* --- 4. Usamos product.nombre --- */}
      <h3>{product.nombre}</h3> 
      
      <div className="actions">
        {/* --- 5. Usamos formatMoney(product.precioCLP) --- */}
        <span className="price">{formatMoney(product.precioCLP)}</span> 
        
        {/* --- 6. Botón actualizado! --- */}
        <button 
          // Cambiamos la clase a verde
          className="btn-primary" 
          type="button"
          // Conectamos el onClick
          onClick={handleAddToCartClick} 
        >
          Agregar
        </button>
      </div>
    </div>
    // </Link> 
  );
}

export default ProductCard;