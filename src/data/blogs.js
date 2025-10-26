// js/blogs.js
import { POSTS } from "./posts.mock.js";

// Contenedor donde imprimimos las filas
const list = document.getElementById("blog-list");

// Orden descendente por fecha
const posts = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

// Utilidad para mostrar fecha legiblee
const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Render fila estilo wireframe
posts.forEach((p) => {
  // fila clicable accesible
  const row = document.createElement("article");
  row.className = "blog-row";
  row.tabIndex = 0;
  row.setAttribute("role", "link");
  row.setAttribute("aria-label", `Abrir post: ${p.title}`);
  row.addEventListener("click", () => (window.location.href = p.href));
  row.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = p.href;
    }
  });

  row.innerHTML = `
    <div class="blog-info">
      <h2 class="blog-title">${p.title}</h2>
      <p class="blog-date muted">${fmtDate(p.date)}</p>
      <p class="blog-excerpt">
        ${p.excerpt}
      </p>
      <button class="cta-button" aria-label="Ver detalle de ${p.title}">
        Ver caso
        <span class="caret" aria-hidden="true">▾</span>
      </button>
    </div>

    <figure class="blog-media">
      <img src="${p.image}" alt="${p.alt}" />
    </figure>
  `;

  list.appendChild(row);
});
