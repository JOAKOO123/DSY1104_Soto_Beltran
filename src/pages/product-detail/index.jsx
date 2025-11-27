// src/pages/product-detail/index.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById } from "../../services/productService";
import { useCart } from "../../context/CartContext";

function ProductDetailPage() {

  const { productCode } = useParams();
  const { addToCart, formatMoney } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const p = await fetchProductById(productCode);
        setProduct(p);
      } catch (err) {
        console.error("Error cargando producto", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productCode]);

  if (loading) {
    return <div className="container">Cargando...</div>;
  }

  if (!product) {
    return <div className="container">Producto no encontrado.</div>;
  }

  const handleQuantityChange = (e) => {
    let q = parseInt(e.target.value);
    if (isNaN(q) || q < 1) q = 1;
    setQuantity(q);
  };

  const handleAddToCart = () => {
    // 🔥 ESTRUCTURA CORRECTA PARA CartContext
    const item = {
      id: product.id,                // ID real del backend
      name: product.nombre,          // nombre que usa tu carrito
      price: product.precioCLP,      // precio que viene de productService
      image: product.imagen || "/assets/default.jpg",
      qty: quantity
    };

    addToCart(item);
  };

  return (
    <div className="container product-detail">

      <div className="pd-grid">

        {/* Imagen */}
        <div className="product-gallery">
          <div className="main">
            <img src={product.imagen || "/assets/default.jpg"} alt={product.nombre} />
          </div>
        </div>

        {/* Información */}
        <div className="product-info">

          <h1>{product.nombre}</h1>

          <div className="meta">
            <span className="price-lg">{formatMoney(product.precioCLP)}</span>
          </div>

          <p className="desc">{product.descripcion}</p>

          <div className="fact-item">
            <dt>Stock disponible</dt>
            <dd>{product.stock}</dd>
          </div>

          {/* Añadir al carrito */}
          <div className="add-to-cart-row">
            <label>Cantidad</label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />

            <button className="btn-primary" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
          </div>

          {product.stock < 10 && (
            <p className="stock-alert">¡Quedan pocas unidades!</p>
          )}

        </div>
      </div>

    </div>
  );
}

export default ProductDetailPage;
