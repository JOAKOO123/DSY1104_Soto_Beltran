// src/tests/components/home/FeaturedProducts.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeaturedProducts from '../../../components/home/FeaturedProducts';
import { PRODUCTS_HH as productos } from '../../../data/productos_huerto.js';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';

const mockAuthContext = { 
  user: null, 
  logout: vi.fn() 
};

const mockCartContext = {
  addToCart: vi.fn(),
  formatMoney: (n) => `$${n.toLocaleString('es-CL')}`
};

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthContext}>
        <CartContext.Provider value={mockCartContext}>
          {ui}
        </CartContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('Componente FeaturedProducts', () => {
  it('debería mostrar el título "Destacados"', () => {
    renderWithProviders(<FeaturedProducts />);
    expect(screen.getByText('Destacados')).toBeInTheDocument();
  });

  it('debería renderizar los primeros 3 productos del archivo de datos', () => {
    renderWithProviders(<FeaturedProducts />);
    
    // 2. Esto ahora funcionará
    const firstProductName = productos[0].nombre;
    const secondProductName = productos[1].nombre;
    const thirdProductName = productos[2].nombre;

    expect(screen.getByText(firstProductName)).toBeInTheDocument();
    expect(screen.getByText(secondProductName)).toBeInTheDocument();
    expect(screen.getByText(thirdProductName)).toBeInTheDocument();
  });
});