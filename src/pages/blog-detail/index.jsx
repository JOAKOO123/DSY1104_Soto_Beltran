// src/pages/blog-detail/index.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { POSTS } from '../../data/posts.mock.js';

// Función para la fecha
const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function BlogDetailPage() {
  const { blogId } = useParams();
  const post = POSTS.find(p => p.id === blogId);

  // --- Página de Error (si no se encuentra el post) ---
  if (!post) {
    return (
      <main className="container" id="contenido" style={{ padding: '2rem 0' }}>
        <h1 className="section-title">Post no encontrado</h1>
        <p style={{ textAlign: 'center' }}>
          <Link to="/blogs" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Volver a Noticias
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="container" id="contenido" style={{ padding: '1rem 0 2rem' }}>
      
      {/* Título */}
      <h1 className="section-title blog-hero-title">{post.title}</h1>
      
      {/* Meta Data (Fecha y Tiempo) */}
      <div className="blog-detail-meta">
        <p className="blog-date muted" style={{ margin: 0 }}>
          {fmtDate(post.date)}
        </p>
        <span className="muted" style={{ margin: '0 0.5rem' }}> - </span>
        <p className="blog-read-time muted" style={{ margin: 0 }}>
          {post.readTime} 
        </p>
      </div>

      {/* Imagen Principal */}
      <figure className="post-hero">
        <img src={post.image} alt={post.alt} />
      </figure>

      {/* Subtítulo */}
      <p className="blog-detail-subtitle">
        <strong>{post.subtitle}</strong>
      </p>

      {/* Contenido del Post */}
      <article 
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

      {/* --- NAVEGACIÓN  --- */}
      <nav className="blog-detail-nav">
        
        {/* Botón "Volver" (Usa "cta-button" para el estilo blanco) */}
        <Link to="/blogs" className="cta-button">
          Volver al blog
        </Link>
        
        {/* Botón "Anterior" (Usa "btn-primary" para el estilo verde) */}
        {post.prevPost && (
          <Link to={`/blogs/${post.prevPost.id}`} className="btn btn-primary">
            Anterior: {post.prevPost.title}
          </Link>
        )}
        
        {/* Botón "Siguiente" (Usa "btn-primary" para el estilo verde) */}
        {post.nextPost && (
          <Link to={`/blogs/${post.nextPost.id}`} className="btn btn-primary">
            Siguiente: {post.nextPost.title}
          </Link>
        )}
      </nav>

    </main>
  );
}

export default BlogDetailPage;