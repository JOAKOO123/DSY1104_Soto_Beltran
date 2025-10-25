import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from '../../../pages/register';

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

const renderRegisterPage = () => render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<RegisterPage />} />
    </Routes>
  </MemoryRouter>
);

describe('Page: RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('debería mostrar el formulario de registro', () => {
    renderRegisterPage();
    expect(screen.getByRole('heading', { name: /Registrar Usuario/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
  });

  it('debería registrar un nuevo usuario y redirigir al login', async () => {
    renderRegisterPage();
    
    fireEvent.change(screen.getByLabelText(/Nombre/i), { 
      target: { value: 'Nuevo Usuario' } 
    });
    fireEvent.change(screen.getByLabelText(/RUT/i), { 
      target: { value: '11111111-1' } 
    });
    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'nuevo@duocuc.cl' } // Updated to use @duocuc.cl
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { 
      target: { value: 'newpass123' } 
    });

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    expect(await screen.findByText(/Registro exitoso/i)).toBeInTheDocument();

    const users = JSON.parse(localStorageMock.getItem('mitienda_users'));
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('nuevo@duocuc.cl');

    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    }, { timeout: 1600 });
  });

  it('debería mostrar error si el email ya existe', async () => {
    localStorageMock.setItem('mitienda_users', JSON.stringify([
      { email: 'existe@duocuc.cl', password: 'p' } // Updated to use @duocuc.cl
    ]));
    
    renderRegisterPage();
    
    fireEvent.change(screen.getByLabelText(/Nombre/i), { 
      target: { value: 'Usuario Existente' } 
    });
    fireEvent.change(screen.getByLabelText(/RUT/i), { 
      target: { value: '11111111-1' } 
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'existe@duocuc.cl' } // Updated to use @duocuc.cl
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    
    expect(await screen.findByText(/Este correo electrónico ya está registrado/i))
      .toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
