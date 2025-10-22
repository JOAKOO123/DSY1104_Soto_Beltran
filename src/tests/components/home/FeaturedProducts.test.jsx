// src/tests/components/home/FeaturedProducts.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeaturedProducts from '../../../components/home/FeaturedProducts';
// 1. Importamos el nombre correcto y le ponemos el alias "productos"
import { PRODUCTS_HH as productos } from '../../../data/productos_huerto.js';

describe('Componente FeaturedProducts', () => {
  it('debería mostrar el título "Destacados"', () => {
    render(<FeaturedProducts />);
    expect(screen.getByText('Destacados')).toBeInTheDocument();
  });

  it('debería renderizar los primeros 3 productos del archivo de datos', () => {
    render(<FeaturedProducts />);
    
    // 2. Esto ahora funcionará
    const firstProductName = productos[0].nombre;
    const secondProductName = productos[1].nombre;
    const thirdProductName = productos[2].nombre;

    expect(screen.getByText(firstProductName)).toBeInTheDocument();
    expect(screen.getByText(secondProductName)).toBeInTheDocument();
    expect(screen.getByText(thirdProductName)).toBeInTheDocument();
  });
});