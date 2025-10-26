import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/root/Footer';

describe('Componente Footer', () => {
  it('debería mostrar el título "HuertoHogar" en el footer', () => {
    render(<Footer />);
      
    const brandTitle = screen.getByRole('heading', { level: 4, name: 'HuertoHogar' });
    expect(brandTitle).toBeInTheDocument();
  });

  it('debería mostrar la información de contacto', () => {
    render(<Footer />);
    // Verificamos que el email y el teléfono estén presentes
    expect(screen.getByText(/contacto@HuertoHogar\.cl/i)).toBeInTheDocument();
    expect(screen.getByText(/\+56 9 1234 5678/i)).toBeInTheDocument();
  });
});