import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Categories from '../../../components/home/Categories';

describe('Componente Categories', () => {
  it('debería renderizar 4 mosaicos de categorías', () => {
    render(<Categories />);
    // Buscamos todos los elementos que son enlaces (nuestras categorías)
    const categoryTiles = screen.getAllByRole('link');
    // Verificamos que la cantidad de enlaces sea 4
    expect(categoryTiles).toHaveLength(4);
  });
});