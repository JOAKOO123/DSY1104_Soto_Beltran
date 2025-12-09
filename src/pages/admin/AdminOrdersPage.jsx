import React, { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function AdminOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  async function loadOrders() {
    try {
      const token = localStorage.getItem("mitienda_token");  // 🔥 token
      const data = await apiGet("/sales", token);             // 🔥 token enviado
      setOrders(data);
    } catch (err) {
      console.error("❌ Error cargando órdenes:", err);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h2>Gestión de Órdenes</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Estado</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.fecha}</td>
              <td>{o.userId}</td>
              <td>{o.estado}</td>
              <td>${o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrdersPage;
