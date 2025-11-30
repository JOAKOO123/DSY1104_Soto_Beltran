// src/pages/WebpayReturnPage.jsx

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function WebpayReturnPage() {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token_ws");
  const tbkToken = params.get("TBK_TOKEN");

  useEffect(() => {

    // 🔥 Caso: usuario canceló el pago
    if (tbkToken) {
      navigate("/checkout/error");
      return;
    }

    // 🔥 Caso: Webpay aprobó y envió token_ws
    if (token) {
      commitPago(token);
    }

  }, [token, tbkToken]);

  const commitPago = async (tokenWS) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/transbank/return?token_ws=${tokenWS}`
      );

      const data = await res.json();
      console.log("RESPUESTA DEL COMMIT:", data);

      if (data.status === "AUTHORIZED") {
        navigate("/checkout/success", { state: data });
      } else {
        navigate("/checkout/error", { state: data });
      }

    } catch (error) {
      console.error(error);
      navigate("/checkout/error");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Procesando pago...</h2>
      <p>No cierres esta ventana. Confirmando transacción…</p>
    </div>
  );
}
