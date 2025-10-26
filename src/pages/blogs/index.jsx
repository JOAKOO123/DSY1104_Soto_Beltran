import React from 'react';
import { Link } from 'react-router-dom'; 
// 1. Importamos tus datos desde la nueva ubicación

import { POSTS } from '../../data/posts.mock.js'; 

const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


const posts = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

function BlogsPage() {
  return (
   
    <main className="container" id="contenido" style={{ padding: '1rem 0 2rem' }}>
      <h1 className="section-title blog-hero-title">Noticias importantes</h1>

      <section className="blog-rows">
        {}
        <div id="blog-list" aria-live="polite">
          {posts.map(post => (
            // 6. Cada fila es un <Link> de React Router
            <Link
              key={post.id} 
              to={`/blogs/${post.id}`} 
              className="blog-row" 
              role="link"
              aria-label={`Abrir post: ${post.title}`}
            >
              {}
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

