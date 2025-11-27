// src/components/products/ProductGrid.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ProductGrid({ products, totalFiltered }) {

  const { addToCart, openCart } = useCart();

  console.log("PRODUCTOS DESDE BACKEND:", products);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.nombre,
      price: product.precio,
      image: product.urlImagen
    });

    openCart();
    console.log(`Producto ${product.nombre} añadido al carrito`);
  };

  return (
    <section className="results">
      <div className="results-bar">
        <span>{totalFiltered} productos encontrados</span>
      </div>

      <div className="productos-grid">
        {products.map(product => (
          <div key={product.id} className="producto">

            <Link to={`/productos/${product.id}`}>
              <div className="thumb">
                <img 
                  src={product.urlImagen || "/placeholder.png"} 
                  alt={product.nombre} 
                />
              </div>

              <h2>{product.nombre}</h2>
              <p>{product.unidad || ""}</p>

              <span className="precio">
                ${(product.precio ?? 0).toLocaleString('es-CL')}
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
