import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Filters from '../../../components/products/Filters';

describe('Componente Filters', () => {
  it('debería mostrar el título "Filtros"', () => {
    render(<Filters />);
    const title = screen.getByRole('heading', { level: 2, name: 'Filtros' });
    expect(title).toBeInTheDocument();
  });

  it('debería mostrar el campo de búsqueda', () => {
    render(<Filters />);
    const searchInput = screen.getByLabelText('Buscar por nombre:');
    expect(searchInput).toBeInTheDocument();
  });
});