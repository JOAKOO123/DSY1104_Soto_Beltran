// src/pages/products/index.jsx
import { useState, useEffect } from 'react';
import Filters from '../../components/products/Filters';
import ProductGrid from '../../components/products/ProductGrid';
import { PRODUCTS_HH as allProducts } from '../../data/productos_huerto.js';
// (Opcional) Puedes crear un componente separado para la paginación
// import Pagination from '../../components/products/Pagination'; 

const ITEMS_PER_PAGE = 12; // Constante para la paginación

function ProductsPage() {
  // --- Estados ---
  const [searchTerm, setSearchTerm] = useState(''); // Para la búsqueda
  const [selectedCategory, setSelectedCategory] = useState(null); // Para las categorías (null = todas)
  const [currentPage, setCurrentPage] = useState(1); // Para la página actual
  
  // Estados derivados (calculados a partir de los otros)
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos después de filtrar
  const [paginatedProducts, setPaginatedProducts] = useState([]); // Productos de la página actual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  // --- Efecto para FILTRAR productos ---
  useEffect(() => {
    let products = allProducts;

    // 1. Filtrar por término de búsqueda (si hay algo escrito)
    if (searchTerm) {
      products = products.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filtrar por categoría (si hay una seleccionada)
    if (selectedCategory) {
      products = products.filter(product => product.categoriaId === selectedCategory);
    }

    setFilteredProducts(products); // Guarda los productos filtrados
    setCurrentPage(1); // Resetea a la página 1 cada vez que cambian los filtros
  }, [searchTerm, selectedCategory]); // Se ejecuta cuando cambia la búsqueda o la categoría

  // --- Efecto para PAGINAR productos ---
  useEffect(() => {
    // Calcula cuántas páginas hay en total
    const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    setTotalPages(total);

    // Calcula el índice de inicio y fin para la página actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    // Corta el array de productos filtrados para obtener solo los de esta página
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));

  }, [filteredProducts, currentPage]); // Se ejecuta cuando cambian los productos filtrados o la página

  // --- Funciones para manejar cambios (se pasarán a los componentes hijos) ---
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (categoryId) => {
    // Si se hace clic en la misma categoría, se deselecciona (muestra todas)
    setSelectedCategory(prev => (prev === categoryId ? null : categoryId));
  };

  const handlePageChange = (newPage) => {
    // Evita ir a páginas inválidas
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
        {/* Pasamos los estados y funciones necesarios al componente Filters */}
        <Filters 
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        /> 
        {/* Pasamos los productos paginados y la cuenta total al ProductGrid */}
        <ProductGrid 
          products={paginatedProducts} 
          totalFiltered={filteredProducts.length} // Pasamos el total filtrado
        /> 
      </div>

      {/* --- Controles de Paginación --- */}
      {totalPages > 1 && ( // Solo muestra la paginación si hay más de una página
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
      {/* --- Fin Paginación --- */}

    </div>
  );
}

export default ProductsPage;