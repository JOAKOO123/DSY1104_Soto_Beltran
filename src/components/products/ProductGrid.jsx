// src/components/products/ProductGrid.jsx
import ProductCard from '../home/ProductCard'; // Reutilizamos el ProductCard

// Recibe la lista de 'products' como prop
function ProductGrid({ products }) {
  return (
    <section className="results">
      <div className="results-bar">
        <span>{products.length} productos encontrados</span>
        {/* Aquí podría ir un selector para ordenar */}
      </div>
      <div className="productos-grid">
        {products.map(product => (
          // Usamos las clases y estructura del CSS original para cada producto
          <div key={product.code} className="producto"> 
            <div className="thumb">
              <img src={product.imagen} alt={product.nombre} />
            </div>
            <h2>{product.nombre}</h2>
            <p>{product.unidad}</p>
            <span className="precio">${product.precioCLP.toLocaleString('es-CL')}</span>
            <button type="button">Agregar al carrito</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;