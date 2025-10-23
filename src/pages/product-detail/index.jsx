import { useParams } from 'react-router-dom';
import { PRODUCTS_HH } from '../../data/productos_huerto.js';
import { useEffect, useState } from 'react';

function ProductDetailPage() {
  const { productCode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const foundProduct = PRODUCTS_HH.find(p => p.code === productCode);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError(true);
    }
    setLoading(false);
  }, [productCode]);

  if (loading) {
    return <div className="container" style={{padding: '2rem'}}>Cargando...</div>;
  }

  if (error || !product) {
    return <div className="container" style={{padding: '2rem'}}>Producto no encontrado.</div>;
  }

  // --- Calcula el rating para el estilo CSS ---
  const ratingStyle = { '--rating': product.rating || 0 };

  // src/pages/product-detail/index.jsx
// ... (los imports y la lógica de useEffect no cambian) ...

return (
  <div className="container product-detail">
    <div className="pd-grid">
      <div className="product-gallery">
        <div className="main">
          <img src={product.imagen} alt={product.nombre} />
        </div>
      </div>
      <div className="product-info">
        <h1>{product.nombre}</h1>
        
        <div className="rating-row"> 
          <span 
            className="star-rating" 
            style={ratingStyle} 
            aria-label={`Rating: ${product.rating} de 5 estrellas`}
          >
          </span>
          <span>({product.reviews || 0} reseñas)</span>
        </div>

        <div className="meta">
          <span className="price-lg">${product.precioCLP.toLocaleString('es-CL')}</span>
          <span className="unit"> / {product.unidad}</span>
        </div>
        <p className="desc">{product.descripcion}</p>

        <dl className="facts">
          <dt>Origen:</dt>
          <dd>{product.origen || 'No especificado'}</dd>
          <dt>Prácticas:</dt>
          <dd>{product.practicas?.join(', ') || 'No especificadas'}</dd>
          {/* --- NUEVO: Stock --- */}
          <dt>Stock Disponible:</dt>
          {/* Mostramos el stock y la unidad */}
          <dd>{product.stock || 0} {product.unidad}</dd> 
          {/* --- Fin Stock --- */}
        </dl>

        {/* --- NUEVO: Alerta de Stock Bajo (condicional) --- */}
        {/* Muestra si el stock es menor a 20 (puedes ajustar el número) */}
        {product.stock && product.stock < 20 && ( 
          <p className="stock-alert">¡Quedan pocas unidades!</p>
        )}
        {/* --- Fin Alerta de Stock --- */}

        <button className="btn-primary" type="button" style={{marginTop: '1rem'}}>
          Agregar al carrito
        </button>
      </div>
    </div>
  </div>
);
}

export default ProductDetailPage;