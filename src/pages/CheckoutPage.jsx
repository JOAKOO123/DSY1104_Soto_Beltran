import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function CheckoutPage() {

  const { cartItems } = useCart();
  const { user } = useAuth();

  // ⛔ SI NO HAY USUARIO → NO SE PUEDE PAGAR
  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Debes iniciar sesión para continuar con el pago.</h2>
      </div>
    );
  }

  const [loading, setLoading] = useState(false);

  // Calcular monto real usando el campo correcto: price
  const total = cartItems.reduce(
    (sum, item) => sum + ((item.price || 0) * item.qty),
    0
  );

  const iniciarPago = async () => {
    try {
      setLoading(true);

      // 1️⃣ Crear venta PENDING en backend
      const resSale = await fetch("http://localhost:8080/api/v1/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems.map(i => ({
            productId: i.id,
            quantity: i.qty,
            unitPrice: i.price    // ESTE ES EL CAMPO REAL
          }))
        })
      });

      const saleData = await resSale.json();
      const saleId = saleData.saleId;

      // 2️⃣ Guardar carrito
      localStorage.setItem("mitienda_cart", JSON.stringify(cartItems));

      // 3️⃣ Iniciar transbank usando saleId real
      const res = await fetch("http://localhost:8080/api/v1/transbank/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saleId }),
      });

      const data = await res.json();

      // 4️⃣ Crear form y enviar a Webpay
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
      alert("Error iniciando pago");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Resumen del Carrito</h1>

      {cartItems.map(item => (
        <p key={item.id}>{item.name} x{item.qty} — ${item.price}</p>
      ))}

      <h2>Total: ${total}</h2>

      <button 
        onClick={iniciarPago}
        disabled={loading}
        style={{ padding: "10px 20px", fontSize: "18px" }}
      >
        {loading ? "Conectando con Webpay..." : "Pagar ahora"}
      </button>
    </div>
  );
}
