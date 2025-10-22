// src/components/home/FeaturedProducts.jsx
import ProductCard from './ProductCard';
// 1. Importamos el nombre correcto y le ponemos un alias "productos"
import { PRODUCTS_HH as productos } from '../../data/productos_huerto.js';

// 2. Esta línea ahora funcionará porque "productos" ya no es undefined
const mockProducts = productos.slice(0, 3);

function FeaturedProducts() {
  return (
    <section className="featured">
      <div className="container">
        <h2 className="section-title">Destacados</h2>
        <div className="cards">
          {mockProducts.map(product => (
            <ProductCard
              // 3. Usamos "code" como key, ya que "id" no existe en tus datos
              key={product.code}
              name={product.nombre}
              // 4. Usamos "precioCLP" y "imagen" que coinciden con tu archivo
              price={`$${product.precioCLP.toLocaleString('es-CL')}`}
              image={product.imagen} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;