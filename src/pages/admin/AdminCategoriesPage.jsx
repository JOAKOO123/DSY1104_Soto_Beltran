// src/pages/admin/AdminCategoriesPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIAS } from "../../data/categories.js";

function AdminCategoriesPage() {
  const th = { padding: "10px", border: "1px solid #eee", background: "#f4f4f4" };
  const td = { padding: "8px", border: "1px solid #eee" };

  return (
    <div>
      <h2>Gestión de Categorías</h2>

      <Link
        to="/admin/categorias/nueva"
        style={{
          padding: "10px 15px",
          background: "green",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        + Nueva Categoría
      </Link>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Nombre</th>
            <th style={th}>Slug</th>
            <th style={th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORIAS.map((cat) => (
            <tr key={cat.id}>
              <td style={td}>{cat.id}</td>
              <td style={td}>{cat.nombre}</td>
              <td style={td}>{cat.slug}</td>
              <td style={td}>
                <Link to={`/admin/categorias/${cat.id}/editar`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCategoriesPage;
