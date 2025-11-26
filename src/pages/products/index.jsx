import { useLoaderData } from "react-router-dom";

export default function ProductsPage() {
  const productos = useLoaderData(); // datos del loader

  return (
    <div className="container py-4">
      <h1 className="mb-4">Productos</h1>

      <div className="row">
        {productos.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={p.image || p.img || "/placeholder.png"}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name || p.title}</h5>
                <p className="fw-bold">${p.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}