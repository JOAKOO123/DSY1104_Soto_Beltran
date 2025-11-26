// src/components/home/ProductCard.jsx

import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ProductCard({ name, price, image, productData }) {

  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    addToCart(productData); // SIEMPRE agrega, sea invitado o usuario
    openCart(); // opcional: abre el carrito al agregar
  };

  return (
    <div className="card">
      <div className="thumb" style={{ backgroundImage: `url(${image})` }} />
      <h3>{name}</h3>
      <div className="actions">
        <span className="price">{price}</span>
        <button className="btn-outline" type="button" onClick={handleAddToCart}>
          Agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
