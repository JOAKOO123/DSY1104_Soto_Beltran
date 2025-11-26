// src/pages/products/index.jsx

import { useState, useEffect } from 'react';
import Filters from '../../components/products/Filters';
import ProductGrid from '../../components/products/ProductGrid';
import { fetchAllProducts } from '../../services/productService';
import { useCart } from '../../context/CartContext';

const ITEMS_PER_PAGE = 12;

function ProductsPage() {

  const { addToCart, formatMoney } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // 🔥 1. Cargar productos desde la API
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllProducts();
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    }
    load();
  }, []);

  // 🔥 2. Filtrar por búsqueda / categoría
  useEffect(() => {
    let products = allProducts;

    if (searchTerm) {
      products = products.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      products = products.filter(p => p.categoriaId === selectedCategory);
    }

    setFilteredProducts(products);
    setCurrentPage(1);

  }, [searchTerm, selectedCategory, allProducts]);


  // 🔥 3. Paginar
  useEffect(() => {
    const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    setTotalPages(total);

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    setPaginatedProducts(filteredProducts.slice(start, start + ITEMS_PER_PAGE));
  }, [filteredProducts, currentPage]);


  return (
    <div className="container" style={{ paddingBlock: "1.5rem" }}>
      <div className="catalogo-head">
        <h1>Nuestro Catálogo</h1>
        <p>Explora frutas, verduras y más.</p>
      </div>

      <div className="catalogo-grid">
        <Filters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSearchChange={(t) => setSearchTerm(t)}
          onCategoryChange={(cat) => setSelectedCategory(cat)}
        />

        <ProductGrid
          products={paginatedProducts}
          totalFiltered={filteredProducts.length}
          onAddToCart={addToCart}
          formatMoney={formatMoney}
        />
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pager">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>

          <span>Página {currentPage} de {totalPages}</span>

          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      )}

    </div>
  );
}

export default ProductsPage;
