import Header from './components/root/Header';
import HomePage from './pages/home';
import Footer from './components/root/Footer'; // <-- 1. Importa el Footer

function App() {
  return (
    <div>
      <Header />
      <HomePage />
      <Footer /> {}
    </div>
  );
}

export default App;