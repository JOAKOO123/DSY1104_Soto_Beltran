import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetailPage from '../../../pages/product-detail';
import { PRODUCTS_HH } from '../../../data/productos_huerto.js';

const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/productos/:productCode" element={<ProductDetailPage />} />
        <Route path="*" element={<div>Página no encontrada en test</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Page: ProductDetailPage', () => {
  it('debería mostrar los detalles del producto cuando se proporciona un código de producto válido', async () => {
    const testProduct = PRODUCTS_HH[0];
    const testUrl = `/productos/${testProduct.code}`;
    renderWithRouter([testUrl]);
    expect(await screen.findByText(testProduct.nombre)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testProduct.precioCLP.toLocaleString('es-CL')))).toBeInTheDocument(); 
    expect(screen.getByText(new RegExp(testProduct.stock.toString()))).toBeInTheDocument(); 
    expect(screen.getByText(new RegExp(testProduct.reviews.toString()))).toBeInTheDocument(); 
  });

  it('debería mostrar "Producto no encontrado" cuando se proporciona un código inválido', async () => {
    const invalidUrl = '/productos/INVALID_CODE';
    renderWithRouter([invalidUrl]);
    expect(await screen.findByText('Producto no encontrado.')).toBeInTheDocument();
  });
});