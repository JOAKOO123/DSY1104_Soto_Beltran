// src/services/productService.js
import { apiGet } from "./api";

// 🔥 Traer todos los productos desde el backend
export async function fetchAllProducts(page = 0, size = 1000) {
  const data = await apiGet(`/products?page=${page}&size=${size}`);

  const productos = data.content || data; // fallback por si no viene paginado

  return productos.map(p => ({
    code: p.id,
    nombre: p.nombre,
    categoriaId: p.categoria,
    descripcion: p.descripcion,
    precioCLP: p.precio,
    stock: p.stock,
    unidad: p.unidad || "unidad",
    imagen: "/assets/default.jpg",
    isOffer: false,
    offerPriceCLP: null,
  }));
}

// 🔥 Traer producto por id
export async function fetchProductById(id) {
  const p = await apiGet(`/products/${id}`);

  return {
    code: p.id,
    nombre: p.nombre,
    categoriaId: p.categoria,
    descripcion: p.descripcion,
    precioCLP: p.precio,
    stock: p.stock,
    unidad: p.unidad || "unidad",
    imagen: "/assets/default.jpg",
    isOffer: false,
    offerPriceCLP: null,
  };
}
