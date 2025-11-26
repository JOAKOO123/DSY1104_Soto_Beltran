import { useLoaderData } from "react-router-dom";

export default function ProductDetailPage() {
  const product = useLoaderData();

  return (
    <div className="container py-5">
      <div className="row">

        {/* Columna Izquierda (Imagen) */}
        <div className="col-md-6">
          <img
            src={product.image || product.img || "/placeholder.png"}
            alt={product.name || product.nombre}
            className="img-fluid rounded"
          />
        </div>

        {/* Columna Derecha (Información) */}
        <div className="col-md-6 product-info">
          <h1>{product.name || product.nombre}</h1>

          <p className="text-muted">{product.category || product.categoria}</p>

          <p>{product.description || product.descripcion}</p>

          <h3 className="mt-3">${product.price || product.precioCLP}</h3>

          <button className="btn btn-success mt-3">
            Agregar al carrito
          </button>
        </div>

      </div>
    </div>
  );
}