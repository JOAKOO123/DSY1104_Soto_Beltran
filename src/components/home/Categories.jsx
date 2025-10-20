// src/components/Categories.jsx

function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <h2 className="section-title">Categorías</h2>
        <ul className="tiles" aria-label="Listado de categorías">
          <li>
            <a className="tile" data-cat="FR" href="/productos?cat=FR">
              <div className="icon" aria-hidden="true"></div>
              <strong>Frutas Frescas</strong>
              <span className="muted">De temporada</span>
            </a>
          </li>
          <li>
            <a className="tile" data-cat="VR" href="/productos?cat=VR">
              <div className="icon" aria-hidden="true"></div>
              <strong>Verduras</strong>
              <span className="muted">Orgánicas</span>
            </a>
          </li>
          <li>
            <a className="tile" data-cat="PO" href="/productos?cat=PO">
              <div className="icon" aria-hidden="true"></div>
              <strong>Orgánicos</strong>
              <span className="muted">Miel, granos</span>
            </a>
          </li>
          <li>
            <a className="tile" data-cat="PL" href="/productos?cat=PL">
              <div className="icon" aria-hidden="true"></div>
              <strong>Lácteos</strong>
              <span className="muted">Locales</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Categories;