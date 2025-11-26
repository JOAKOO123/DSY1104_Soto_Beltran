// src/services/productService.js
const API_URL = "http://localhost:8080/api/v1";

// 🔥 Traer todos los productos desde Spring Boot (PAGINADO)
export async function fetchAllProducts(page = 0, size = 1000) {
  const res = await fetch(`${API_URL}/products?page=${page}&size=${size}`);

  if (!res.ok) throw new Error("Error cargando productos");

  const data = await res.json();

  const productos = data.content; // 👈 AQUÍ ESTABA EL PROBLEMA

  // Mapear formato backend → frontend
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


// 🔥 Traer producto por ID
export async function fetchProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`);

  if (!res.ok) throw new Error("Producto no encontrado");

  const p = await res.json();

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
