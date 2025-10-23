// src/components/products/Filters.jsx

// Definimos las categorías (podrían venir de otro lado en el futuro)
const categories = [
  { id: 'FR', name: 'Frutas' },
  { id: 'VR', name: 'Verduras' },
  { id: 'PO', name: 'Orgánicos' },
  { id: 'PL', name: 'Lácteos' },
];

// Recibe props desde ProductsPage
function Filters({ searchTerm, selectedCategory, onSearchChange, onCategoryChange }) {
  return (
    <aside className="filters">
      <h2>Filtros</h2>
      
      {/* --- Input de Búsqueda Controlado --- */}
      <div className="filter-group filter-search">
        <label htmlFor="search" className="sr-only">Buscar por nombre:</label>
        <input 
          type="search" 
          id="search" 
          placeholder="Ej: Manzana" 
          value={searchTerm} // El valor viene del estado padre
          onChange={(e) => onSearchChange(e.target.value)} // Llama a la función del padre al cambiar
        />
      </div>

      {/* --- Botones de Categoría Dinámicos --- */}
      <div className="filter-group">
        <p>Categorías:</p>
        <div className="cat-tabs"> 
          {/* Botón para mostrar todas */}
          <button 
            className={`tab ${selectedCategory === null ? 'is-active' : ''}`}
            onClick={() => onCategoryChange(null)} 
          >
            Todas
          </button>
          {/* Mapeamos las categorías para crear los botones */}
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`tab ${selectedCategory === cat.id ? 'is-active' : ''}`} // Clase activa si está seleccionada
              onClick={() => onCategoryChange(cat.id)} // Llama a la función del padre al hacer clic
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Filters;