// src/pages/WebpayReturnPage.jsx

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function WebpayReturnPage() {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const tokenWs = params.get("token_ws");
  const tbkToken = params.get("TBK_TOKEN");

  useEffect(() => {

    // -------------------------------------------------------
    // 🔥 1. Caso: usuario CANCELÓ el pago en Webpay
    // -------------------------------------------------------
    if (tbkToken) {
      navigate("/orden/error/0");
      return;
    }

    // -------------------------------------------------------
    // 🔥 2. Caso: Webpay APROBÓ → llega token_ws
    // -------------------------------------------------------
    if (tokenWs) {
      commitPago(tokenWs);
    }

  }, [tokenWs, tbkToken]);


  const commitPago = async (token) => {
    try {

      const res = await fetch(
        `http://localhost:8080/api/v1/transbank/return?token_ws=${token}`
      );

      // Si el backend responde error (403, 500, etc.)
      if (!res.ok) {
        navigate("/orden/error/0");
        return;
      }

      const data = await res.json();
      console.log("🔵 RESPUESTA DEL COMMIT:", data);

      // -------------------------------------------------------
      // 💰 Pago autorizado → ir a éxito con ID real de la orden
      // -------------------------------------------------------
      if (data.status === "AUTHORIZED") {

        const orderId =
          data.buyOrder ||
          data.buy_order ||
          data.buy_order_id ||
          0;

        navigate(`/orden/exito/${orderId}`, { state: data });
        return;
      }

      // -------------------------------------------------------
      // ❌ Pago rechazado
      // -------------------------------------------------------
      navigate("/orden/error/0", { state: data });

    } catch (error) {
      console.error("❌ ERROR COMMIT:", error);
      navigate("/orden/error/0");
    }
  };


  return (
    <div style={{ padding: 50 }}>
      <h2>Procesando pago...</h2>
      <p>No cierres esta ventana. Confirmando transacción…</p>
    </div>
  );
}
