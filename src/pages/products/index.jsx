// src/pages/products/index.jsx
import { useState, useEffect } from 'react';
import Filters from '../../components/products/Filters';
import ProductGrid from '../../components/products/ProductGrid';
import { PRODUCTS_HH as allProducts } from '../../data/productos_huerto.js';

// --- 1. Importa el hook del "cerebro" del carrito ---
import { useCart } from '../../context/CartContext'; 

const ITEMS_PER_PAGE = 12; // Constante para la paginación

function ProductsPage() {
  // --- 2. Saca las funciones que necesitas del "cerebro" ---
  const { addToCart, formatMoney } = useCart();

  // --- Estados ---
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [paginatedProducts, setPaginatedProducts] = useState([]); 
  const [totalPages, setTotalPages] = useState(0); 

  // --- Efecto para FILTRAR productos ---
  useEffect(() => {
    let products = allProducts;

    if (searchTerm) {
      products = products.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      products = products.filter(product => product.categoriaId === selectedCategory);
    }

    setFilteredProducts(products); 
    setCurrentPage(1); 
  }, [searchTerm, selectedCategory]); 

  // --- Efecto para PAGINAR productos ---
  useEffect(() => {
    const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    setTotalPages(total);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));

  }, [filteredProducts, currentPage]); 

  // --- Funciones para manejar cambios ---
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(prev => (prev === categoryId ? null : categoryId));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // --- Renderizado ---
  return (
    <div className="container" style={{ paddingBlock: '1.5rem' }}>
      <div className="catalogo-head">
        <h1>Nuestro Catálogo</h1>
        <p>Explora frutas, verduras, orgánicos y más.</p>
      </div>

      <div className="catalogo-grid">
        <Filters 
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        /> 
        
        {/* --- 3. Pasa las funciones al componente hijo --- */}
        <ProductGrid 
          products={paginatedProducts} 
          totalFiltered={filteredProducts.length}
          onAddToCart={addToCart}     
          formatMoney={formatMoney} 
        /> 
      </div>

      {/* --- Controles de Paginación --- */}
      {totalPages > 1 && ( 
        <div className="pager" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span style={{ margin: '0 1rem' }}>
            Página {currentPage} de {totalPages}
          </span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;