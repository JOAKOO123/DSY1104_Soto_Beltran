import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const [estado, setEstado] = useState("Cargando...");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/sales/${orderId}`);
        if (!res.ok) throw new Error("No se pudo cargar venta");

        const sale = await res.json();
        setEstado(sale.estado || "DESCONOCIDO");
      } catch {
        setEstado("ERROR");
      }
    }
    load();
  }, [orderId]);

  return (
    <div className="container" style={{ padding: "3rem", textAlign: "center" }}>
      <h1 style={{ color: "green" }}>✔ Pago realizado con éxito</h1>
      <h2>Orden #{orderId}</h2>

      <p style={{ fontSize: "1.2rem" }}>
        Estado del pago: <strong>{estado}</strong>
      </p>

      <br />
      <Link
        to="/productos"
        style={{
          padding: "1rem 2rem",
          background: "#0d6efd",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1.1rem",
        }}
      >
        Seguir comprando
      </Link>
    </div>
  );
}
