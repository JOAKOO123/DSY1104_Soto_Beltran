// src/pages/checkout/index.jsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate, Link } from "react-router-dom";

import { createSale, initTransbank } from "../../services/salesService";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, formatMoney, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (cartItems.length === 0) {
    return <Navigate to="/productos" replace />;
  }

  async function handlePay(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const userId = user?.id || 1;

      console.log("🛒 CARRITO ACTUAL:", cartItems);

      // 1️⃣ Crear venta en backend
      const sale = await createSale(userId, cartItems);
      console.log("✔ Venta creada:", sale);

      // 2️⃣ Iniciar Transbank
      const init = await initTransbank(sale.id);
      console.log("✔ Transbank init:", init);

      // 3️⃣ Limpiar carrito ANTES de redirigir
      clearCart();

      // 4️⃣ Redirigir
      window.location.href = init.urlRedireccion;

    } catch (err) {
      console.error("❌ ERROR EN CHECKOUT:", err);
      setErrorMsg("Hubo un error procesando el pago.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h1>Finalizar compra</h1>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <h2>Total: {formatMoney(totalPrice)}</h2>

      <form onSubmit={handlePay}>
        <button
          disabled={loading}
          style={{
            padding: "1rem",
            fontSize: "1.3rem",
            background: "green",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          {loading ? "Procesando..." : `Pagar ${formatMoney(totalPrice)}`}
        </button>
      </form>

      {!user && (
        <p style={{ marginTop: "1rem" }}>
          Estás comprando como invitado.{" "}
          <Link to="/login">Inicia sesión</Link> para guardar tu historial.
        </p>
      )}
    </div>
  );
}

export default CheckoutPage;
