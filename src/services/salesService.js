// src/services/salesService.js
const API_URL = "http://localhost:8080/api/v1";

// 🔹 1. Crear venta
export async function createSale(userId, items) {
  const body = {
    userId,
    items: items.map(i => ({
      productId: i.id,    // ← AQUÍ EL FIX
      cantidad: i.qty
    }))
  };

  console.log("CARRITO:", items);
  console.log("BODY QUE SE ENVÍA A BACKEND:", body);

  const res = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("ERROR AL CREAR VENTA:", text);
    throw new Error("Error creando venta");
  }

  return res.json();
}


// 🔹 2. Iniciar Transbank
export async function initTransbank(saleId) {
  const res = await fetch(`${API_URL}/transbank/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ saleId })
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("ERROR INICIANDO TBK:", text);
    throw new Error("Error iniciando Transbank");
  }

  return res.json();
}
