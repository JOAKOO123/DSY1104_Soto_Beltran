import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import React from 'react';

// Mock localStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: vi.fn((key) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('mitienda_users', '[]');
    vi.clearAllMocks();
});

// Test Component
const TestComponent = ({ initialUser = null }) => {
    if (initialUser) {
        localStorage.setItem('mitienda_user', JSON.stringify(initialUser));
    }
    return (
        <AuthProvider>
            <AuthConsumer />
        </AuthProvider>
    );
};

const AuthConsumer = () => {
    const { user, login, logout } = useAuth();
    const isAuthenticated = !!user;
    
    // Update login data to match expected structure
    const mockLoginData = { id: 1, nombre: 'TestUser', rol: 'cliente' };

    return (
        <div>
            <span data-testid="auth-status">
                {isAuthenticated ? `Autenticado: ${user.nombre}` : 'No Autenticado'}
            </span>
            <button data-testid="login-btn" onClick={() => login(mockLoginData)} />
            <button data-testid="logout-btn" onClick={logout} />
        </div>
    );
};

// Tests
describe('AuthContext', () => {
    // Update mock user to match expected structure
    const mockUser = { id: 1, nombre: 'TestUser', rol: 'cliente' };
    const userKey = 'mitienda_user';

    it('initializes with null user when localStorage is empty', () => {
        render(<TestComponent />);
        expect(screen.getByTestId('auth-status')).toHaveTextContent('No Autenticado');
    });

    it('loads user from localStorage on mount', () => {
        localStorage.setItem(userKey, JSON.stringify(mockUser));
        render(<TestComponent />);
        expect(screen.getByTestId('auth-status')).toHaveTextContent(`Autenticado: ${mockUser.nombre}`);
    });

    it('login() saves user to localStorage and updates state', async () => {
        render(<TestComponent />);
        
        await act(async () => {
            await screen.getByTestId('login-btn').click();
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent('Autenticado: TestUser');
        
        // Check second call specifically (first call is from useEffect)
        expect(localStorage.setItem).toHaveBeenNthCalledWith(2, userKey, JSON.stringify(mockUser));
        
        const storedUser = JSON.parse(localStorage.getItem(userKey));
        expect(storedUser.nombre).toBe('TestUser');
    });

    it('logout() removes user from localStorage and resets state', async () => {
        localStorage.setItem(userKey, JSON.stringify(mockUser));
        render(<TestComponent />);

        await act(async () => {
            await screen.getByTestId('logout-btn').click();
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent('No Autenticado');
        expect(localStorage.removeItem).toHaveBeenCalledWith(userKey);
    });

    it('useAuth() throws error outside AuthProvider', () => {
        const TestOutsideProvider = () => {
            try {
                useAuth();
                return <div>No error</div>;
            } catch (e) {
                return <div>{e.message}</div>;
            }
        };
        render(<TestOutsideProvider />);
        expect(screen.getByText('useAuth must be used within an AuthProvider')).toBeInTheDocument();
    });
});
