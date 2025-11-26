export async function productosLoader() {
  const res = await fetch("http://localhost:8080/api/productos");

  if (!res.ok) {
    throw new Error("Error al cargar productos");
  }

  return res.json();
}
