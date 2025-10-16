import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories'; // <-- Importa el componente

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Categories /> {/* <-- Añade el componente aquí */}
      </main>
    </div>
  );
}

export default App;