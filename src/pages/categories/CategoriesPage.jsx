// src/pages/categories/index.jsx

import React from 'react';

import { 
    PRODUCTS_HH, 
    CATEGORY_TILES, 
    CATEGORY_DETAILS 
} from '../../data/productos_huerto'; 

const CategoriesPage = () => {
    
    // 1. Definir la categoría activa (por defecto, el ID del primer tile: "FR")
    const activeCategoryId = CATEGORY_TILES[0].id; 
    
    // 2. Obtener el nombre completo y detalles de la categoría activa
    const currentCategory = CATEGORY_DETAILS[activeCategoryId];
    
    // 3. Filtrar tus productos reales por la categoría activa
    const productsInCurrentCategory = PRODUCTS_HH.filter(
        product => product.categoriaId === activeCategoryId
    );

    return (
      <main className="container categories-page">
        
        {/* ---------------------------------------------------- */}
        {/* SECCIÓN SUPERIOR: Tiles de Categorías */}
        {/* ---------------------------------------------------- */}
        <section className="category-tiles">
          {CATEGORY_TILES.map(category => ( 
              <article key={category.id} className="tile-card">
                
                <div className="placeholder-image small">
                    {}
                    <span style={{ fontSize: '0.8rem' }}>{category.name.substring(0, 3)} Icon</span> 
                </div>
                <h3 className="category-name">{category.name}</h3>
              </article>
          ))}
        </section>
        
        <hr className="divider" />

        {/* ---------------------------------------------------- */}
        {/* SECCIÓN INFERIOR: Listado de Productos (FILTRADO) */}
        {/* ---------------------------------------------------- */}
        
        <h2 className="current-category-title">{currentCategory.name}</h2>
        
        <section className="product-grid">
          {productsInCurrentCategory.map(product => (
              <article key={product.code} className="product-card">
                
                <div className="placeholder-image large">
                    <img 
                        src={product.imagen} 
                        alt={product.nombre} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                
                <div className="product-info">
                    <p className="product-name" style={{marginTop: '1rem', fontWeight: 'bold'}}>{product.nombre}</p>
                    <p className="product-price">${product.precioCLP.toLocaleString('es-CL')}/{product.unidad}</p>
                </div>
              </article>
          ))}
        </section>
        
      </main>
  );
};

export default CategoriesPage;