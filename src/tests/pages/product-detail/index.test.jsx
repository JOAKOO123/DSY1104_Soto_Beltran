import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetailPage from '../../../pages/product-detail';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';

const renderWithRouter = (initialEntries = ['/']) => {
  const mockCartContext = {
    addToCart: vi.fn(),
    formatMoney: (val) => `$${val}`
  };

  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <CartContext.Provider value={mockCartContext}>
        <Routes>
          <Route path="/productos/:productCode" element={<ProductDetailPage />} />
        </Routes>
      </CartContext.Provider>
    </MemoryRouter>
  );
};

describe('ProductDetailPage', () => {
  it('should render product details', () => {
    renderWithRouter(['/productos/TEST123']);
    // ...existing test assertions...
  });

  it('should show not found for invalid product', () => {
    renderWithRouter(['/productos/INVALID']);
    // ...existing test assertions...
  });
});