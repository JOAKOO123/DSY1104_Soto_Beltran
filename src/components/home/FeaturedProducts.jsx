// src/components/home/FeaturedProducts.jsx
import ProductCard from './ProductCard';
import { PRODUCTS_HH as productos } from '../../data/productos_huerto.js';

const mockProducts = productos.slice(0, 3);

function FeaturedProducts() {
  return (
    <section className="featured">
      <div className="container">
        <h2 className="section-title">Destacados</h2>
        <div className="cards">
          {mockProducts.map(product => (
            <ProductCard
              key={product.code}
              name={product.nombre}
              price={`$${product.precioCLP.toLocaleString('es-CL')}`}
              image={product.imagen}
              productData={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;