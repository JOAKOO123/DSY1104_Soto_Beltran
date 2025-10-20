import ProductCard from './ProductCard';

const mockProducts = [
  { id: 1, name: 'Manzana Fuji (Kg)', price: '$2.490', image: 'https://via.placeholder.com/400x300.png/2E8B57/fff?text=Fruta' },
  { id: 2, name: 'Zanahoria Orgánica (500g)', price: '$1.990', image: 'https://via.placeholder.com/400x300.png/FFD700/000?text=Verdura' },
  { id: 3, name: 'Miel de Quillay (250g)', price: '$4.990', image: 'https://via.placeholder.com/400x300.png/236b45/fff?text=Orgánico' },
];

function FeaturedProducts() {
  return (
    <section className="featured">
      <div className="container">
        <h2 className="section-title">Destacados</h2>
        <div className="cards">
          {mockProducts.map(product => (
            <ProductCard
              key={product.id} // La 'key' es un identificador único que React necesita
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;