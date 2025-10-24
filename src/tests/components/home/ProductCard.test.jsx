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
  code: 'TEST001',
  nombre: 'Producto Test',
  precioCLP: 9990,
  imagen: 'test.jpg'
};

const renderProductCard = (user = null) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user, logout: vi.fn() }}>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <ProductCard
            name={testProductData.nombre}
            price={`$${testProductData.precioCLP.toLocaleString('es-CL')}`}
            image={testProductData.imagen}
            productData={testProductData}
          />
        </CartContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería llamar a addToCart al agregar si hay usuario', () => {
    renderProductCard({ nombre: 'Tester', email: 'test@test.com' });
    fireEvent.click(screen.getByRole('button', { name: /Agregar/i }));
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});