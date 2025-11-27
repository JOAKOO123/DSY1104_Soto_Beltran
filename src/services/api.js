// src/services/api.js

const API_URL = "http://localhost:8080/api/v1";

/**
 * Obtiene token siempre desde localStorage
 * para evitar tener que enviarlo desde cada servicio.
 */
function getToken() {
  return localStorage.getItem("mitienda_token");
}

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    console.error("❌ API ERROR:", text);
    throw new Error(text || "Error en la API");
  }
  return res.json();
}

// 🔹 GET
export async function apiGet(path) {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  return handleResponse(res);
}

// 🔹 POST
export async function apiPost(path, body = {}) {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });

  return handleResponse(res);
}
