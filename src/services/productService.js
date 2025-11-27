// src/services/productService.js
import { apiGet } from "./api";

// 🔥 Traer todos los productos desde el backend
export async function fetchAllProducts(page = 0, size = 1000) {
  const data = await apiGet(`/products?page=${page}&size=${size}`);

  const productos = data.content || data;

  return productos.map(p => ({
    id: p.id,
    nombre: p.nombre,
    categoria: p.categoria,
    descripcion: p.descripcion,
    precio: p.precio,
    stock: p.stock,
    unidad: p.unidad || "unidad",

    urlImagen: p.urlImagen || null,  // 👈 imagen real

    isOffer: false,
    offerPriceCLP: null,
  }));
}

// 🔥 Traer producto por id
export async function fetchProductById(id) {
  const p = await apiGet(`/products/${id}`);

  return {
    id: p.id,
    nombre: p.nombre,
    categoria: p.categoria,
    descripcion: p.descripcion,
    precio: p.precio,
    stock: p.stock,
    unidad: p.unidad || "unidad",

    urlImagen: p.urlImagen || null,  // 👈 imagen real

    isOffer: false,
    offerPriceCLP: null,
  };
}
