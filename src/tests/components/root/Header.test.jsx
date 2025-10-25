import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../../components/root/Header';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';

const mockLogout = vi.fn();
const mockOpenCart = vi.fn();

const renderHeader = (user = null, cartItems = []) => {
  const authContextValue = { 
    user, 
    logout: mockLogout 
  };
  
  const cartContextValue = {
    cartItems,
    totalCount: cartItems.length,
    openCart: mockOpenCart
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={authContextValue}>
        <CartContext.Provider value={cartContextValue}>
          <Header />
        </CartContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('Header', () => {
  it('should show user name when logged in', () => {
    renderHeader({ nombre: 'Tester' });
    expect(screen.getByText(/Hola, Tester/i)).toBeInTheDocument();
  });
});