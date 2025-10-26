export const ORDENES = [
  {
    id: "ORD-001",
    fecha: "2024-10-25",
    cliente: "Jax",
    correo: "jax@duocuc.cl",
    total: 45000,
    estado: "Entregado",
    productos: [
      { nombre: "Tomate Orgánico", cantidad: 3, precioUnitario: 5000 },
      { nombre: "Set de Hierbas", cantidad: 1, precioUnitario: 30000 },
    ],
  },
  // ...more orders...
];

export const REPORTES_RESUMEN = {
  ventasMes: 62500,
  ordenesNuevas: 2,
  productosVendidos: 9,
  usuariosActivos: 3,
};
