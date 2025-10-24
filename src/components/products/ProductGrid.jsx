// src/components/products/ProductGrid.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// --- 1. Acepta las nuevas props que vienen de 'products/index.jsx' ---
function ProductGrid({ products, totalFiltered }) {

  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- 2. Creamos la función para el botón ---
  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login');
    } else {
      addToCart(product);
    }
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
            </Link>
            <button 
              type="button" 
              onClick={() => handleAddToCart(product)}
            >
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