// src/components/home/ProductCard.jsx

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ProductCard({ name, price, image, productData }) {

  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!user || !user.correo) {
      console.log('Usuario no autenticado, redirigiendo a login.');
      navigate('/login');
    } else {
      console.log(`Producto ${productData.nombre} añadido al carrito`);
      addToCart(productData);
    }
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