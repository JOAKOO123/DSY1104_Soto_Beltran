import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeaturedProducts from '../../../components/home/FeaturedProducts';

describe('Componente FeaturedProducts', () => {
  it('debería mostrar el título "Destacados"', () => {
    render(<FeaturedProducts />);
    expect(screen.getByText('Destacados')).toBeInTheDocument();
  });

  it('debería renderizar 3 tarjetas de producto', () => {
    render(<FeaturedProducts />);
    // Buscamos los botones "Agregar", ya que cada tarjeta tiene uno.
    const productCards = screen.getAllByText('Agregar');
    // Verificamos que se hayan encontrado 3 botones, lo que significa que hay 3 tarjetas.
    expect(productCards).toHaveLength(3);
  });
})