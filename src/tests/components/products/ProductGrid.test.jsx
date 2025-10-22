// src/tests/components/products/ProductGrid.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductGrid from '../../../components/products/ProductGrid';

// Datos simulados para la prueba (solo 2 productos para simplificar)
const mockProductsForTest = [
  { code: "FR001", nombre: "Manzana Test", unidad: "kg", precioCLP: 1000, imagen: "/fake/img1.jpg" },
  { code: "VR001", nombre: "Zanahoria Test", unidad: "kg", precioCLP: 800, imagen: "/fake/img2.jpg" },
];

describe('Componente ProductGrid', () => {
  it('debería mostrar la cantidad correcta de productos encontrados', () => {
    render(<ProductGrid products={mockProductsForTest} />);
    // Buscamos el texto que indica cuántos productos hay
    const countText = screen.getByText('2 productos encontrados');
    expect(countText).toBeInTheDocument();
  });

  it('debería renderizar una tarjeta para cada producto', () => {
    render(<ProductGrid products={mockProductsForTest} />);
    // Buscamos los nombres de los productos simulados
    const product1 = screen.getByText('Manzana Test');
    const product2 = screen.getByText('Zanahoria Test');
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });
});