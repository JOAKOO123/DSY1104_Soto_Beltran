import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../../../components/root/Header';

describe('Componente Header', () => {
  it('debería mostrar el nombre de la marca "HuertoHogar"', () => {
    render(<Header />);
    const brandElement = screen.getByText('HuertoHogar');
    expect(brandElement).toBeInTheDocument();
  });
});