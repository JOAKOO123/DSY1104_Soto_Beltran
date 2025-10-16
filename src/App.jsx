import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero /> {/* <-- 2. Añade el componente aquí */}
        {/* Aquí van secciones como Categorías, Destacados... */}
      </main>
      {/* aca va el footer*/}
    </div>
  );
}

export default App;