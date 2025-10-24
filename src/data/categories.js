// src/pages/categories/index.jsx

import React from 'react';
// ⬅️ Importamos los datos y funciones del archivo de datos
import { categories, getProductsByCategoryId } from '../../data/categories'; 

const CategoriesPage = () => {

    // Simulación: Tomamos la primera categoría para mostrar sus productos por defecto
    const currentCategory = categories[0]; // Esto es { id: 1, name: 'Semillas', ... }
    
    // Usamos la función para obtener la lista de productos de esa categoría
    const productsInCurrentCategory = getProductsByCategoryId(currentCategory.id);

    return (
      <main className="container categories-page">
        
        {/* ---------------------------------------------------- */}
        {/* SECCIÓN SUPERIOR: Tiles de Categorías (DINÁMICA) */}
        {/* ---------------------------------------------------- */}
        <section className="category-tiles">
          {categories.map(category => ( 
                // Renderizamos cada tile usando la data real
              <article key={category.id} className="tile-card">
                
                {/* Usamos la imagen o el placeholder */}
                <div className="placeholder-image small">
                    {/* NOTA: En un caso real, usarías la URL de category.imageUrl aquí */}
                    <span>{category.name.substring(0, 3)} Icon</span> 
                </div>
                <h3 className="category-name">{category.name}</h3>
              </article>
          ))}
        </section>
        
        {/* Línea divisoria o espaciado */}
        <hr className="divider" />

        {/* ---------------------------------------------------- */}
        {/* SECCIÓN INFERIOR: Listado de Productos (DINÁMICA) */}
        {/* ---------------------------------------------------- */}
        
        {/* Título dinámico */}
        <h2 className="current-category-title">{currentCategory.name}</h2>
        
        {/* Grid de productos */}
        <section className="product-grid">
          {productsInCurrentCategory.map(product => (
              <article key={product.id} className="product-card">
                {/* El placeholder de 400x300 de la propuesta */}
                <div className="placeholder-image large">
                    <span>400 x 300</span>
                </div>
                {/* Información del producto */}
                <p className="product-name">{product.name}</p>
                 <p className="product-price">${product.price.toLocaleString('es-CL')}</p>
              </article>
          ))}
        </section>
        
      </main>
  );
};

export default CategoriesPage;