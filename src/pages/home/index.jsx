import Hero from '../../components/home/Hero';
import Categories from '../../components/home/Categories';
import Loyalty from '../../components/home/Loyalty';
import FeaturedProducts from '../../components/home/FeaturedProducts'; 

function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <Loyalty />
      <FeaturedProducts /> {}
    </main>
  );
}

export default HomePage;