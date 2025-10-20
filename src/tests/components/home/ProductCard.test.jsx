import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from '../../../components/home/ProductCard';

describe('Componente ProductCard', () => {
  it('debería mostrar el nombre y el precio del producto pasados por props', () => {
    // 1. Preparamos los datos de prueba
    const productData = {
      name: 'Producto de Prueba',
      price: '$9.990',
      image: 'test-image.png'
    };

    // 2. Renderizamos el componente con esos datos
    render(<ProductCard {...productData} />);

    // 3. Verificamos que el nombre y el precio estén en el documento
    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
    expect(screen.getByText('$9.990')).toBeInTheDocument();
  });
});