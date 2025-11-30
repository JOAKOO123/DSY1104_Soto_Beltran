// src/pages/CheckoutPage.jsx

import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const iniciarPago = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/v1/transbank/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyOrder: "orden-123",
          sessionId: "sess-123",
          amount: 2000,
        }),
      });

      if (!res.ok) {
        alert("Error iniciando el pago con Webpay");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("INIT RESPONSE:", data);

      // 🔥 Crear formulario POST para redirigir a Webpay
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.url;

      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "token_ws";
      hidden.value = data.token;

      form.appendChild(hidden);
      document.body.appendChild(form);

      form.submit();

    } catch (err) {
      console.error(err);
      alert("Error inesperado con Webpay");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Checkout de prueba</h1>
      <button 
        onClick={iniciarPago}
        disabled={loading}
        style={{ padding: "10px 20px", fontSize: "18px" }}
      >
        {loading ? "Conectando con Webpay..." : "Pagar $2.000"}
      </button>
    </div>
  );
}
