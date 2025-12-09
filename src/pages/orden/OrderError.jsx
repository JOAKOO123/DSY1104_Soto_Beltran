import { Link, useParams } from "react-router-dom";

export default function OrderError() {
  const { orderId } = useParams();

  return (
    <div className="container" style={{ padding: "3rem", textAlign: "center" }}>
      <h1 style={{ color: "red" }}>❌ Error en el pago</h1>
      <h2>Orden #{orderId}</h2>

      <p style={{ fontSize: "1.2rem" }}>
        La transacción fue rechazada o no se completó correctamente.
      </p>

      <br />
      <Link
        to="/checkout"
        style={{
          padding: "1rem 2rem",
          background: "red",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1.1rem",
        }}
      >
        Intentar nuevamente
      </Link>
    </div>
  );
}
