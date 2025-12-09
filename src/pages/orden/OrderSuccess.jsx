import { useLocation, useParams, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();
  const { orderId } = useParams();

  const status = state?.status || "AUTHORIZED";

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h1 style={{ color: "green" }}>✓ Pago realizado con éxito</h1>

      <h2>Orden #{orderId}</h2>

      <p>Estado del pago: <strong>{status}</strong></p>

      <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>
        Seguir comprando
      </Link>
    </div>
  );
}
