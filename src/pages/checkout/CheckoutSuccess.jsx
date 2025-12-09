import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { apiPost } from "../../services/api";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const yaRegistrado = useRef(false);

  useEffect(() => {
    if (!state) {
        navigate("/");
        return;
    }

    // 🔥 Recuperar carrito REAL
    const savedCart = JSON.parse(localStorage.getItem("mitienda_cart") || "[]");
    console.log("CARRITO RECUPERADO DESDE LOCALSTORAGE:", savedCart);

    if (yaRegistrado.current) return;
    yaRegistrado.current = true;

    const registrarVenta = async () => {
        try {
            const payload = {
                userId: user?.id,
                buyOrder: state.buy_order,
                token: state.token_ws || state.token,
                amount: state.amount,
                authorizationCode: state.authorization_code,
                transactionDate: state.transaction_date,
                paymentTypeCode: state.payment_type_code,
                responseCode: state.response_code,
                cardLast4: state.card_detail?.card_number,
                status: state.status,
                items: savedCart.map(item => ({
                    productId: item.id,
                    quantity: item.qty,
                    unitPrice: item.precioCLP
                }))
            };

            console.log("🚀 ENVIANDO VENTA AL BACKEND:", payload);

            await apiPost("/sales", payload);

            // LIMPIAR
            localStorage.removeItem("mitienda_cart");
            clearCart();

        } catch (error) {
            console.error("❌ Error guardando venta:", error);
        }
    };

    registrarVenta();
}, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>✔ Pago realizado con éxito</h1>
      <p><b>ID de la venta:</b> {state?.buy_order}</p>
      <p><b>Estado:</b> {state?.status}</p>
      <p><b>Código de autorización:</b> {state?.authorization_code}</p>

      <br />
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
