import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CartPanel } from '../../../components/root/CartPanel';
import { CartContext } from '../../../context/CartContext';

const mockUpdateQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockClearCart = vi.fn();
const mockFormatMoney = vi.fn(amount => `$${amount}`);

const mockCartContext = {
  cartItems: [],
  totalPrice: 0,
  formatMoney: mockFormatMoney,
  updateQuantity: mockUpdateQuantity,
  removeFromCart: mockRemoveFromCart,
  clearCart: mockClearCart
};

describe('CartPanel', () => {
  it('should render empty cart message when no items', () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <CartPanel isOpen={true} onClose={() => {}} />
      </CartContext.Provider>
    );
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });
  // ...more tests
});
