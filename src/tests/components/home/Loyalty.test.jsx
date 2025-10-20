// src/tests/components/home/Loyalty.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loyalty from '../../../components/home/Loyalty';

describe('Componente Loyalty', () => {
  it('debería mostrar el título "Puntos & descuentos"', () => {
    render(<Loyalty />);
    const titleElement = screen.getByText('Puntos & descuentos');
    expect(titleElement).toBeInTheDocument();
  });

  it('debería mostrar los botones "Crear cuenta" e "Iniciar sesión"', () => {
    render(<Loyalty />);
    expect(screen.getByText('Crear cuenta')).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });
});