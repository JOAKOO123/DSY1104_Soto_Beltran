function Filters() {
  return (
    <aside className="filters">
      <h2>Filtros</h2>
      {/* Aquí irán los grupos de filtros (búsqueda, categorías, etc.) */}
      <div className="filter-group">
        <label htmlFor="search">Buscar por nombre:</label>
        <input type="search" id="search" placeholder="Ej: Manzana" />
      </div>
      <div className="filter-group">
        <p>Categorías:</p>
        {/* Aquí irán los checkboxes o botones de categoría */}
        <button className="cb">Frutas</button>
        <button className="cb">Verduras</button>
        {/* ...etc */}
      </div>
    </aside>
  );
}

export default Filters;