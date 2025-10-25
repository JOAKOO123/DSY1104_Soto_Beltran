// src/tests/components/home/ProductCard.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/home/ProductCard';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';

const mockNavigate = vi.fn();
const mockAddToCart = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

const testProductData = {
  nombre: 'Producto Test',
  precioCLP: 9990,
  imagen: 'test.jpg',
  code: 'TEST001'
};

const renderProductCard = (user = null) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user, logout: vi.fn() }}>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <ProductCard 
            name={testProductData.nombre}
            price={`$${testProductData.precioCLP}`}
            image={testProductData.imagen}
            productData={testProductData}
          />
        </CartContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('Componente ProductCard', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('debería mostrar nombre y precio', () => {
    renderProductCard();
    expect(screen.getByText('Producto Test')).toBeInTheDocument();
    expect(screen.getByText('$9990')).toBeInTheDocument();
  });

  it('debería llamar a addToCart al agregar si hay usuario', () => {
    renderProductCard({ nombre: 'Tester' });
    fireEvent.click(screen.getByRole('button', { name: /Agregar/i }));
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('debería redirigir a /login al agregar si no hay usuario', () => {
    renderProductCard(null);
    fireEvent.click(screen.getByRole('button', { name: /Agregar/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});