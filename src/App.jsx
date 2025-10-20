import Header from './components/root/Header';
import Hero from './components/home/Hero';
import Categories from './components/home/Categories';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Categories />
      </main>
    </div>
  );
}

export default App;