// src/pages/products/index.jsx
import { useState, useEffect } from 'react'; // Necesitamos estado para guardar los productos
import Filters from '../../components/products/Filters';
import ProductGrid from '../../components/products/ProductGrid';
import { PRODUCTS_HH as allProducts } from '../../data/productos_huerto.js'; // Importamos todos los productos

function ProductsPage() {
  // Estado para guardar los productos que se mostrarán (inicialmente todos)
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // useEffect para cargar los productos una vez cuando el componente se monta
  useEffect(() => {
    setDisplayedProducts(allProducts); 
  }, []); // El array vacío asegura que solo se ejecute una vez

  return (
    <div className="container" style={{ paddingBlock: '1.5rem' }}>
      <div className="catalogo-head">
        <h1>Nuestro Catálogo</h1>
        <p>Explora frutas, verduras, orgánicos y más.</p>
      </div>

      {/* Usamos la estructura de grid del CSS original */}
      <div className="catalogo-grid">
        <Filters /> {/* La barra lateral de filtros */}
        <ProductGrid products={displayedProducts} /> {/* La cuadrícula con los productos */}
      </div>
    </div>
  );
}

export default ProductsPage;