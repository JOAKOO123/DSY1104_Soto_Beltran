// src/components/products/ProductGrid.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ProductGrid({ products, totalFiltered }) {

  const { addToCart, openCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);   // Permite invitados sin problema
    openCart();           // Opcional: abrir carrito al agregar
    console.log(`Producto ${product.nombre} añadido al carrito`);
  };

  return (
    <section className="results">
      <div className="results-bar">
        <span>{totalFiltered} productos encontrados</span>
      </div>
      <div className="productos-grid">
        {products.map(product => (
          <div key={product.code} className="producto">
            <Link to={`/productos/${product.code}`}>
              <div className="thumb">
                <img src={product.imagen} alt={product.nombre} />
              </div>
              <h2>{product.nombre}</h2>
              <p>{product.unidad}</p>
              <span className="precio">
                ${product.precioCLP.toLocaleString('es-CL')}
              </span>
            </Link>
            <button type="button" onClick={() => handleAddToCart(product)}>
              Agregar al carrito
            </button>
          </div>
        ))}
        {products.length === 0 && (
          <p>No se encontraron productos con los filtros seleccionados.</p>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
