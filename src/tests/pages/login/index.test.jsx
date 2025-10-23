import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../../pages/login';

// Mock para useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock para localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key) => { delete store[key]; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const renderLoginPage = () => render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  </MemoryRouter>
);

describe('Page: LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    const testUsers = [{ id: 1, nombre: 'Test User', email: 'test@test.com', password: 'password123' }];
    localStorageMock.setItem('mitienda_users', JSON.stringify(testUsers));
  });

  it('debería mostrar el formulario de login', () => {
    renderLoginPage();
    expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
  });

  it('debería mostrar mensaje de error con credenciales incorrectas', async () => {
    renderLoginPage();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));
    expect(await screen.findByText(/Email o contraseña incorrectos/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('debería iniciar sesión y redirigir con credenciales correctas', async () => {
    renderLoginPage();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));

    expect(await screen.findByText(/Inicio de sesión exitoso/i)).toBeInTheDocument();
    
    const loggedUser = JSON.parse(localStorageMock.getItem('mitienda_user'));
    expect(loggedUser).not.toBeNull();
    expect(loggedUser.email).toBe('test@test.com');

    await vi.waitFor(() => {
       expect(mockNavigate).toHaveBeenCalledWith('/');
    }, { timeout: 1100 });
  });
});
