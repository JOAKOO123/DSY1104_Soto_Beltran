export async function productoDetalleLoader({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:8080/api/productos/${id}`);

  if (!res.ok) {
    throw new Error("Producto no encontrado");
  }

  return res.json();
}
