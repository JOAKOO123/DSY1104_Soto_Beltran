// src/pages/checkout/CheckoutSuccess.jsx

import { useLocation, Link } from "react-router-dom";

export default function CheckoutSuccess() {

  const { state } = useLocation();

  // Datos reales de la transacción
  const buyOrder = state?.buy_order || "Desconocido";
  const status = state?.status || "Sin info";
  const authorizationCode = state?.authorization_code || "N/A";

  return (
    <div className="container" style={{ padding: "50px" }}>
      <h1>✔ Pago realizado con éxito</h1>

      <p><strong>ID de la venta:</strong> {buyOrder}</p>
      <p><strong>Estado:</strong> {status}</p>
      <p><strong>Código de autorización:</strong> {authorizationCode}</p>

      <br />

      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
