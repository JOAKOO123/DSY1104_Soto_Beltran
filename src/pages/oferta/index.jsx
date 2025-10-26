import React, { useState, useEffect } from 'react';

import { getProductsInOffer } from '../../data/productos_huerto'; 
import { useCart } from '../../context/CartContext'; 


const OfertaPage = () => {
    
    // --- 1. ESTADO Y CONTEXTO ---
    const { addToCart } = useCart(); // Para el requisito de Flujo de Compra
    const [offers, setOffers] = useState([]);
    // Estado para la clasificación (Requisito de Interactividad Mejorada)
    const [sortCriterion, setSortCriterion] = useState('none'); 

    // --- 2. LÓGICA DE ORDENACIÓN/CLASIFICACIÓN ---
    const sortOffers = (data, criterion) => {
        let sortedData = [...data];

        if (criterion === 'price-asc') {
            
            sortedData.sort((a, b) => a.offerPriceCLP - b.offerPriceCLP);
        } else if (criterion === 'price-desc') {
            
            sortedData.sort((a, b) => b.offerPriceCLP - a.offerPriceCLP);
        } else if (criterion === 'discount') {
             
            sortedData.sort((a, b) => {
                const discountA = a.precioCLP - a.offerPriceCLP;
                const discountB = b.precioCLP - b.offerPriceCLP;
                return discountB - discountA; 
            });
        }
        return sortedData;
    };

    // --- 3. EFECTOS (CARGA DE DATOS) ---
    useEffect(() => {
        // Carga inicial de datos
        const data = getProductsInOffer();
        setOffers(data);
    }, []);
    
    // --- 4. MANEJADORES DE EVENTOS ---

    const handleSortChange = (e) => {
        const newCriterion = e.target.value;
        setSortCriterion(newCriterion);
        // Aplica la clasificación al array de ofertas
        setOffers(sortOffers(offers, newCriterion));
    };

    const handleAddToCart = (product) => {
        
        addToCart(product); 
        console.log(`Producto ${product.nombre} añadido al carrito.`);
    };


    return (
        <main className="container my-5">
            <h1 className="mb-4 text-center fw-bold">¡Grandes Ofertas Semanales!</h1>
            <p className="lead text-center mb-5">Aprovecha los mejores descuentos en productos frescos y orgánicos.</p>

            {/* --- REQUISITO DE INTERACTIVIDAD MEJORADA: FILTRO DE ORDENACIÓN --- */}
            <div className="d-flex justify-content-end align-items-center mb-4">
                <label htmlFor="sort" className="me-2 text-muted fw-bold">Ordenar por:</label>
                <select 
                    id="sort" 
                    className="form-select w-auto" 
                    value={sortCriterion} 
                    onChange={handleSortChange}
                >
                    <option value="none">Sin Ordenar</option>
                    <option value="discount">Mayor Descuento</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                </select>
            </div>


            {offers.length === 0 ? (
                <div className="alert alert-info text-center mt-5" role="alert">
                    En este momento no hay ofertas disponibles. Vuelve pronto!
                </div>
            ) : (
                
                <section className="product-grid row"> 
                    {}
                    {offers.map(product => (
                        <div key={product.code} className="col-lg-3 col-md-6 mb-4">
                            
                            {}
                            <article className="card h-100 shadow-sm d-flex flex-column position-relative">
                                
                                {}
                                {}
                                {(product.precioCLP && product.offerPriceCLP) && (
                                    <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                                        -{Math.round(((product.precioCLP - product.offerPriceCLP) / product.precioCLP) * 100)}%
                                    </span>
                                )}

                                {/* Contenedor de Imagen */}
                                <div className="p-3 d-flex justify-content-center align-items-center" style={{ height: '200px', flexShrink: 0 }}>
                                    <img 
                                        src={product.imagen} 
                                        className="img-fluid" 
                                        alt={product.nombre} 
                                        style={{ maxHeight: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                
                                {}
                                {}
                                <div className="card-body text-center d-flex flex-column justify-content-end" style={{ flexGrow: 1 }}>
                                    <h5 className="card-title fw-bold">{product.nombre}</h5>
                                    
                                    {/* Mostrar Precios */}
                                    <p className="card-text text-danger mb-3">
                                        {/* Precio Original Tachado */}
                                        <small className="text-muted text-decoration-line-through me-2">
                                            ${product.precioCLP.toLocaleString('es-CL')}
                                        </small>
                                        {/* Precio de Oferta Destacado */}
                                        <strong className="fs-5">
                                            ${product.offerPriceCLP.toLocaleString('es-CL')}
                                        </strong> 
                                        / {product.unidad}
                                    </p>

                                    {/* Botón de "Añadir al Carrito" (Requisito de Flujo de Compra) */}
                                    <button 
                                        className="btn btn-success"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Añadir al Carrito
                                    </button>
                                </div>
                            </article>
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
};

export default OfertaPage;