import React from 'react';
import { Link } from 'react-router-dom'; // Usamos <Link> para la navegación

// 1. Importamos tus datos desde la nueva ubicación
// (Asegúrate de que la ruta sea correcta, ../../data/ o ../../../data/)
import { POSTS } from '../../data/posts.mock.js'; 

// 2. Copiamos tu función para formatear la fecha
const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// 3. Copiamos tu lógica para ordenar los posts
const posts = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

function BlogsPage() {
  return (
    // 4. Esta es la estructura de tu blogs.html
    <main className="container" id="contenido" style={{ padding: '1rem 0 2rem' }}>
      <h1 className="section-title blog-hero-title">Noticias importantes</h1>

      <section className="blog-rows">
        {/* 5. Reemplazamos el <div id="blog-list"> por un .map() de React */}
        <div id="blog-list" aria-live="polite">
          {posts.map(post => (
            // 6. Cada fila es un <Link> de React Router
            <Link
              key={post.id} // "key" es obligatorio en un .map
              to={`/blogs/${post.id}`} // La URL dinámica que definimos en routes.jsx
              className="blog-row" // La misma clase de tu <article>
              role="link"
              aria-label={`Abrir post: ${post.title}`}
            >
              {/* 7. Este es tu innerHTML "traducido" a JSX */}
              <div className="blog-info">
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-date muted">{fmtDate(post.date)}</p>
                <p className="blog-excerpt">
                  {post.excerpt}
                </p>
                <span className="cta-button" aria-label={`Ver detalle de ${post.title}`}>
                  Ver caso
                  <span className="caret" aria-hidden="true">▾</span>
                </span>
              </div>

              <figure className="blog-media">
                <img src={post.image} alt={post.alt} />
              </figure>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BlogsPage;

