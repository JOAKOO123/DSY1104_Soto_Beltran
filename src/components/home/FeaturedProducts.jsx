// src/components/home/FeaturedProducts.jsx
import ProductCard from './ProductCard';
import { PRODUCTS_HH as productos } from '../../data/productos_huerto.js';

// --- 1. Importa el "cerebro" del carrito ---
import { useCart } from '../../context/CartContext';

const mockProducts = productos.slice(0, 3);

function FeaturedProducts() {
  // --- 2. Saca las funciones que necesitas ---
  const { addToCart, formatMoney } = useCart();

  return (
    <section className="featured">
      <div className="container">
        <h2 className="section-title">Destacados</h2>
        <div className="cards">
          {mockProducts.map(product => (
            <ProductCard
              key={product.code}
              // --- 3. ¡Pasa el objeto PRODUCTO completo! ---
              product={product} 
              // --- 4. ¡Pasa la función de añadir! ---
              onAddToCart={addToCart}
              // --- 5. ¡Pasa la función de formatear dinero! ---
              formatMoney={formatMoney}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;