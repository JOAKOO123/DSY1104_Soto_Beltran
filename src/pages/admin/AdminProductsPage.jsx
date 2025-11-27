// src/pages/admin/AdminProductsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../services/api";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Cargar productos reales desde el backend
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await apiGet("/products?page=0&size=1000");
        const lista = data.content || data; // por si no está paginado
        setProducts(lista);
      } catch (error) {
        console.error("❌ Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  const th = { padding: "10px", border: "1px solid #eee", background: "#f4f4f4" };
  const td = { padding: "8px", border: "1px solid #eee" };

  return (
    <div>
      <h2>Gestión de Productos</h2>

      <Link
        to="/admin/productos/nuevo"
        style={{
          padding: "10px 15px",
          background: "green",
          color: "white",
          borderRadius: "4px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        + Nuevo Producto
      </Link>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Nombre</th>
            <th style={th}>Precio</th>
            <th style={th}>Stock</th>
            <th style={th}>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={td}>{p.id}</td>
              <td style={td}>{p.nombre}</td>
              <td style={td}>${p.precio.toLocaleString("es-CL")}</td>
              <td style={td}>{p.stock}</td>
              <td style={td}>{p.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductsPage;
