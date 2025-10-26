// src/pages/categories/index.jsx

import React, { useState } from 'react';
import { 
    PRODUCTS_HH, 
    CATEGORY_TILES, 
    CATEGORY_DETAILS 
} from '../../data/productos_huerto'; 

const CategoriesPage = () => {
    
    // --- 1. ESTADO ---
    const [activeCategoryId, setActiveCategoryId] = useState(CATEGORY_TILES[0].id);
    
    const handleCategoryChange = (categoryId) => {
        setActiveCategoryId(categoryId);
    };

    // --- 2. DATA DINÁMICA ---
    const currentCategory = CATEGORY_DETAILS[activeCategoryId];
    const productsInCurrentCategory = PRODUCTS_HH.filter(
        product => product.categoriaId === activeCategoryId
    );

    return (
        // Usamos la clase 'container' de Bootstrap para centrar el contenido principal
        <main className="container my-5">
        
            {/* ---------------------------------------------------- */}
            {/* SECCIÓN SUPERIOR: Tiles de Categorías (Centrado con Flexbox forzado) */}
            {/* ---------------------------------------------------- */}
            
            {}
            <section 
                className="category-tiles" 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'center', // Centra horizontalmente los tiles
                    gap: '20px', // Espacio entre tiles
                    marginBottom: '40px',
                    padding: '10px 0' 
                }}
            >
              {CATEGORY_TILES.map(category => ( 
                    
                        <article 
                            key={category.id} 
                            className={`tile-card border rounded shadow-sm p-3 text-center cursor-pointer ${category.id === activeCategoryId ? 'is-active border-success border-3' : 'bg-white'}`}
                            onClick={() => handleCategoryChange(category.id)} 
                            style={{ 
                                width: '150px', 
                                height: '180px',
                                
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer'
                            }}
                        >
                            
                            {}
                            <div style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px' }}>
                                <img 
                                    src={category.imageUrl} 
                                    alt={category.name} 
                                    style={{ 
                                        maxWidth: '100%', 
                                        maxHeight: '100%', 
                                        objectFit: 'contain' 
                                    }}
                                />
                            </div>
                            
                            {}
                            <h3 className="category-name" style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0' }}>
                                {category.name}
                            </h3>
                            <p className="text-muted small" style={{ lineHeight: '1', fontSize: '0.8rem', margin: '0' }}>
                                {category.id}
                            </p>
                        </article>
              ))}
            </section>
        
            <hr className="divider" style={{ margin: '30px 0' }} />

            {/* ---------------------------------------------------- */}
            {/* SECCIÓN INFERIOR: Listado de Productos Filtrados */}
            {/* ---------------------------------------------------- */}
        
            <h2 className="current-category-title my-4" style={{ fontWeight: 'bold' }}>{currentCategory.name}</h2>
        
            {}
            <section className="product-grid row">
              {productsInCurrentCategory.map(product => (
                    
                  <div key={product.code} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <article className="product-card card h-100 shadow-sm">
                            
                            {/* Imagen del Producto */}
                            <div className="p-3 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                <img 
                                    src={product.imagen} 
                                    alt={product.nombre} 
                                    className="img-fluid" 
                                    style={{ maxHeight: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            
                            <div className="product-info card-body text-center">
                                {}
                                <p 
                                    className="product-name fw-bold mb-1" 
                                    style={{ fontWeight: 'bold' }} 
                                >
                                    {product.nombre}
                                </p> 
                                <p className="product-price text-success">${product.precioCLP.toLocaleString('es-CL')}/{product.unidad}</p>
                            </div>
                        </article>
                    </div>
              ))}
            </section>
        
        </main>
  );
};

export default CategoriesPage;