// src/tests/components/products/ProductGrid.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductGrid from '../../../components/products/ProductGrid';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';

const mockProductsForTest = [
  { code: 'P1', nombre: 'Producto 1', precioCLP: 1000, imagen: 'img1.jpg' },
  { code: 'P2', nombre: 'Producto 2', precioCLP: 2000, imagen: 'img2.jpg' }
];

const mockCartContext = {
  addToCart: vi.fn(),
  formatMoney: (n) => `$${n.toLocaleString('es-CL')}`,
  cartItems: []
};

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: null, logout: vi.fn() }}>
        <CartContext.Provider value={mockCartContext}>
          {ui}
        </CartContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('Componente ProductGrid', () => {
  it('debería mostrar la cantidad correcta de productos encontrados', () => {
    renderWithProviders(<ProductGrid products={mockProductsForTest} totalFiltered={2} />);
    expect(screen.getByText('2 productos encontrados')).toBeInTheDocument();
  });

  it('debería renderizar cada producto como un enlace a su página de detalle', () => {
    renderWithProviders(<ProductGrid products={mockProductsForTest} />);

    // Obtenemos todos los enlaces dentro del componente
    const productLinks = screen.getAllByRole('link');

    // Verificamos si el número de enlaces coincide con el número de productos
    expect(productLinks).toHaveLength(mockProductsForTest.length);

    // Verificamos si el primer enlace apunta a la URL de detalle correcta
    expect(productLinks[0]).toHaveAttribute('href', `/productos/${mockProductsForTest[0].code}`);
    // Verificamos si el segundo enlace apunta a la URL de detalle correcta
    expect(productLinks[1]).toHaveAttribute('href', `/productos/${mockProductsForTest[1].code}`);

    // También verificamos si los nombres de los productos están renderizados dentro de los enlaces
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
  });
});