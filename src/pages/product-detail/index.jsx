// src/pages/product-detail/index.jsx
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS_HH } from '../../data/productos_huerto.js';
import { useEffect, useState } from 'react';

// 1. Importa el "cerebro" del carrito
import { useCart } from '../../context/CartContext';


function RelatedProductCard({ product, formatMoney }) {
  
  return (
    <Link to={`/productos/${product.code}`} className="producto">
      <div className="thumb">
        <img src={product.imagen} alt={product.nombre} />
      </div>
      <h2>{product.nombre}</h2>
      {}
      {product.rating > 0 && (
        <div className="rating-row" style={{justifyContent: 'center', fontSize: '0.9rem'}}>
          <span 
            className="star-rating" 
            style={{'--rating': product.rating || 0}} 
            aria-label={`Rating: ${product.rating} de 5 estrellas`}
          ></span>
          <span>({product.reviews || 0})</span>
        </div>
      )}
      <span className="precio">{formatMoney(product.precioCLP)}</span>
    </Link>
  );
}


function ProductDetailPage() {
 
  const { addToCart, formatMoney } = useCart();
  
  const { productCode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setQuantity(1); 
    const foundProduct = PRODUCTS_HH.find(p => p.code === productCode);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError(true);
    }
    setLoading(false);
  }, [productCode]); 

  // --- Lógica para "Productos Relacionados" ---
  const relatedProducts = product 
    ? PRODUCTS_HH.filter(p => 
        p.categoriaId === product.categoriaId && p.code !== product.code
      ).slice(0, 4) 
    : [];

  if (loading) {
    return <div className="container" style={{padding: '2rem'}}>Cargando...</div>;
  }

  if (error || !product) {
    return <div className="container" style={{padding: '2rem'}}>Producto no encontrado.</div>;
  }

  const ratingStyle = { '--rating': product.rating || 0 };
  
  // Función para el input de cantidad
  const handleQuantityChange = (e) => {
    let newQty = parseInt(e.target.value, 10);
    if (isNaN(newQty) || newQty < 1) {
      newQty = 1; // Mínimo 1
    }
    setQuantity(newQty);
  };
  
  // Función para el botón de "Añadir"
  const handleAddToCart = () => {
    // Pasa el producto Y la cantidad seleccionada
    addToCart(product, quantity);
  };

  return (
    <div className="container product-detail">
      
      {}

      <div className="pd-grid">
        
        {/* --- Columna Izquierda: Galería --- */}
        <div className="product-gallery">
          <div className="main">
            <img src={product.imagen} alt={product.nombre} />
          </div>
          {/* Thumbnails (Galería pequeña) */}
          <div className="product-thumbs">
            <button className="thumb-btn is-active">
              <img src={product.imagen} alt={product.nombre} />
            </button>
            {}
          </div>
        </div>

        {/* --- Columna Derecha: Info  --- */}
        <div className="product-info">
          <h1>{product.nombre}</h1>
          
          {/* --- Rating Row  --- */}
          <div className="rating-row" style={{gap: '0.35rem'}}> 
            <span 
              className="star-rating" 
              style={ratingStyle} 
              aria-label={`Rating: ${product.rating} de 5 estrellas`}
            ></span>
            <b>{product.rating}</b> 
            <span>({product.reviews || 0} reseñas)</span>
          </div>

          {/* --- Meta/Price -- */}
          <div className="meta">
            <span className="price-lg">{formatMoney(product.precioCLP)}</span>
            <span className="unit"> / {product.unidad}</span>
          </div>
          
          <p className="desc">{product.descripcion}</p>

          {/* --- Facts List (DISEÑO DE 1 COLUMNA) --- */}
          <dl className="facts-list">
            <div className="fact-item">
              <dt>Origen</dt>
              <dd>{product.origen || 'No especificado'}</dd>
            </div>
            <div className="fact-item">
              <dt>Existencias</dt>
              <dd>{product.stock || 0} {product.unidad}</dd>
            </div>
            <div className="fact-item">
              <dt>Prácticas</dt>
              <dd>{product.practicas?.join(', ') || 'No especificadas'}</dd>
            </div>
            <div className="fact-item">
              <dt>Recetas</dt>
              <dd><a href="#">Ver receta</a></dd>
            </div>
          </dl>

          <div className="sustainability-badge">
            <span className="check-icon">✓</span>
            <span>Agricultura responsable</span>
          </div>

          {/* --- Add to Cart Row  --- */}
          <div className="add-to-cart-row">
            <label htmlFor="pd-qty">Cantidad</label>
            <input 
              type="number" 
              id="pd-qty"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button 
              className="btn-primary" 
              type="button"
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
          </div>
          
          {product.stock && product.stock < 20 && ( 
            <p className="stock-alert">¡Quedan pocas unidades!</p>
          )}

        </div>
      </div>

      {/* --- SECCIÓN DE PRODUCTOS RELACIONADOS --- */}
      <section className="related-products">
        <h2>Productos relacionados</h2>
        <div className="productos-grid" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
          {relatedProducts.length > 0 ? (
            relatedProducts.map(relProduct => (
              <RelatedProductCard 
                key={relProduct.code}
                product={relProduct}
                formatMoney={formatMoney}
              />
            ))
          ) : (
            <p>No hay productos relacionados en esta categoría.</p>
          )}
        </div>
      </section>

    </div>
  );
}

export default ProductDetailPage;