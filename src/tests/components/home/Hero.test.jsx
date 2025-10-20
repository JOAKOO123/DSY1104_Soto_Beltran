import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../../../components/home/Hero';

describe('Componente Hero', () => {
  it('debería renderizar el título principal', () => {
    render(<Hero />);
    const title = screen.getByText('Frescura y calidad para tu día');
    expect(title).toBeInTheDocument();
  });
});