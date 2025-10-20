function ProductCard({ image, name, price }) {
  return (
    <div className="card">
      <div className="thumb" style={{ backgroundImage: `url(${image})` }}>
      </div>
      <h3>{name}</h3>
      <div className="actions">
        <span className="price">{price}</span>
        <button className="btn-outline" type="button">Agregar</button>
      </div>
    </div>
  );
}

export default ProductCard;