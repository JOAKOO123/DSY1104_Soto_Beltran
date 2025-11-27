// src/services/salesService.js
import { apiPost } from "./api";

// 🔥 Crear venta (token automático desde api.js)
export async function createSale(userId, items) {
  const body = {
    userId,
    items: items.map(i => ({
      productId: i.id,
      cantidad: i.qty
    }))
  };

  return apiPost("/sales", body);
}

// 🔥 Iniciar Transbank (ruta pública)
export async function initTransbank(saleId) {
  return apiPost("/transbank/init", { saleId });
}
