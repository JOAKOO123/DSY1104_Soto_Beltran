import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

// Mock localStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
        removeItem: vi.fn((key) => { delete store[key]; }),
        clear: vi.fn(() => { store = {}; }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Update useAuth mock setup
let mockUser = null;
vi.mock('../../context/AuthContext', () => ({
    useAuth: vi.fn(() => ({
        user: mockUser,
    })),
}));

// Test data
const productA = { code: 'P001', nombre: 'Manzana', precioCLP: 1000, imagen: 'img/a' };
const productB = { code: 'P002', nombre: 'Plátano', precioCLP: 500, imagen: 'img/b' };
const initialCart = [
    { ...productA, price: 1000, qty: 2 },
    { ...productB, price: 500, qty: 3 },
];

beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockUser = { id: 1, nombre: 'TestUser' };
    vi.mocked(useAuth).mockReturnValue({ user: mockUser });
});

// Test Component
const CartConsumer = () => {
    const { 
        cartItems, totalPrice, formatMoney, addToCart, 
        updateQuantity, removeFromCart, clearCart, isOpen, 
        openCart, closeCart 
    } = useCart();

    return (
        <div>
            <span data-testid="cart-count">{cartItems.length}</span>
            <span data-testid="total-price">{formatMoney(totalPrice)}</span>
            <span data-testid="is-open">{isOpen ? 'open' : 'closed'}</span>
            <button data-testid="add-A-btn" onClick={() => addToCart(productA)}></button>
            <button data-testid="add-B-btn" onClick={() => addToCart(productB)}></button>
            <button data-testid="update-qty-btn" onClick={() => updateQuantity('P001', 5)}></button>
            <button data-testid="remove-btn" onClick={() => removeFromCart('P001')}></button>
            <button data-testid="clear-btn" onClick={clearCart}></button>
            <button data-testid="open-btn" onClick={openCart}></button>
            <button data-testid="close-btn" onClick={closeCart}></button>
        </div>
    );
};

// Tests
describe('CartContext', () => {
    it('calculates totalPrice correctly when loading cart', () => {
        localStorage.setItem('mitienda_cart', JSON.stringify(initialCart));
        render(<CartProvider><CartConsumer /></CartProvider>);
        expect(screen.getByTestId('total-price')).toHaveTextContent('$3.500');
    });

    it('saves items to localStorage when cart changes', async () => {
        render(<CartProvider><CartConsumer /></CartProvider>);
        await act(async () => {
            await screen.getByTestId('add-A-btn').click();
        });
        expect(localStorage.setItem).toHaveBeenCalled();
        const stored = JSON.parse(localStorage.getItem('mitienda_cart'));
        expect(stored.length).toBe(1);
        expect(stored[0].code).toBe('P001');
    });

    // ...all other test cases as provided...
});
