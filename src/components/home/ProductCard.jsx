// src/components/home/ProductCard.jsx

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ProductCard({ name, price, image, productData }) {

  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
    } else {
      const itemToAdd = {
        code: productData.code,
        nombre: productData.nombre,
        precioCLP: productData.precioCLP,
        imagen: productData.imagen,
      };
      addToCart(itemToAdd);
      console.log(`Producto ${itemToAdd.nombre} añadido al carrito`);
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