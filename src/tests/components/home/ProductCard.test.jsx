// src/tests/components/home/ProductCard.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from '../../../components/home/ProductCard';

describe('Componente ProductCard', () => {
  it('debería mostrar el nombre y el precio del producto', () => {
    // 1. Usamos la estructura de datos real
    const productData = {
      nombre: 'Producto de Prueba',
      precio: 9990,
      image: 'test-image.png'
    };

    // 2. Renderizamos el componente
    render(
      <ProductCard 
        name={productData.nombre} 
        price={`$${productData.precio}`} 
        image={productData.image} 
      />
    );

    // 3. Verificamos que los datos estén en el documento
    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
    expect(screen.getByText('$9990')).toBeInTheDocument();
  });
});