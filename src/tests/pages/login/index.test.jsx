import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../../pages/login';
import { AuthContext } from '../../../context/AuthContext';

const userParaExito = [{
  id: 1,
  nombre: 'Test User',
  email: 'test@test.com',
  password: 'password123'
}];

const mockNavigate = vi.fn();
const localStorageMock = {
  // ...existing mock implementation...
};

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    localStorageMock.setItem('mitienda_users', JSON.stringify(userParaExito));
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
    expect(await screen.findByText(/Credenciales incorrectas/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('debería iniciar sesión y redirigir con credenciales correctas', async () => {
    renderLoginPage();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));

    expect(await screen.findByText(/Inicio de sesión exitoso\. Redirigiendo\.\.\./i)).toBeInTheDocument();

    const loggedUser = JSON.parse(localStorageMock.getItem('mitienda_user'));
    expect(loggedUser).not.toBeNull();
    expect(loggedUser.email).toBe('test@test.com');

    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    }, { timeout: 1100 });
  });
});
