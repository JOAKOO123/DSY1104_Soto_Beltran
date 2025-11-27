export default function CheckoutSuccess() {
  // Leer parámetros desde el HASH (porque usamos HashRouter)
  const hash = window.location.hash;  
  console.log("HASH:", hash);

  // Extraer solo la parte después de "?"
  const queryString = hash.split("?")[1] || "";
  console.log("QUERYSTRING:", queryString);

  const params = new URLSearchParams(queryString);
  const saleId = params.get("saleId");

  return (
    <div className="container py-5">
      <h1 className="text-success mb-3">✅ Pago realizado con éxito</h1>

      <p style={{ fontSize: "18px" }}>
        <strong>ID de la venta: </strong>
        {saleId ? saleId : "Desconocido"}
      </p>

      <a className="btn btn-success mt-3" href="#/">
        Volver al inicio
      </a>
    </div>
  );
}
