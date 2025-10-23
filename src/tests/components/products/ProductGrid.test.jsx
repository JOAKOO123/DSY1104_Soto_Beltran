// src/tests/components/products/ProductGrid.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importa MemoryRouter
import ProductGrid from '../../../components/products/ProductGrid';

// Datos simulados como antes
const mockProductsForTest = [
  { code: "FR001", nombre: "Manzana Test", unidad: "kg", precioCLP: 1000, imagen: "/fake/img1.jpg" },
  { code: "VR001", nombre: "Zanahoria Test", unidad: "kg", precioCLP: 800, imagen: "/fake/img2.jpg" },
];

// Función auxiliar para renderizar dentro de MemoryRouter porque ProductGrid ahora usa <Link>
const renderWithRouterContext = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Componente ProductGrid', () => {
  it('debería mostrar la cantidad correcta de productos encontrados', () => {
    renderWithRouterContext(<ProductGrid products={mockProductsForTest} />);
    expect(screen.getByText('2 productos encontrados')).toBeInTheDocument();
  });

  it('debería renderizar cada producto como un enlace a su página de detalle', () => {
    renderWithRouterContext(<ProductGrid products={mockProductsForTest} />);

    // Obtenemos todos los enlaces dentro del componente
    const productLinks = screen.getAllByRole('link');

    // Verificamos si el número de enlaces coincide con el número de productos
    expect(productLinks).toHaveLength(mockProductsForTest.length);

    // Verificamos si el primer enlace apunta a la URL de detalle correcta
    expect(productLinks[0]).toHaveAttribute('href', `/productos/${mockProductsForTest[0].code}`);
    // Verificamos si el segundo enlace apunta a la URL de detalle correcta
    expect(productLinks[1]).toHaveAttribute('href', `/productos/${mockProductsForTest[1].code}`);

    // También verificamos si los nombres de los productos están renderizados dentro de los enlaces
    expect(screen.getByText('Manzana Test')).toBeInTheDocument();
    expect(screen.getByText('Zanahoria Test')).toBeInTheDocument();
  });
});