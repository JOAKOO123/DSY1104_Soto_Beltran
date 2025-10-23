// src/data/posts.mock.js
// (¡ACTUALIZADO CON MÁS DATOS!)

export const POSTS = [
  {
    id: "huerto-casa",
    title: "Cómo armar tu primer huerto en casa",
    date: "2025-09-05",
    readTime: "5 min de lectura", // <-- NUEVO
    subtitle: "Pequeño es la clave: macetas, buena tierra y riego regular.", // <-- NUEVO
    excerpt: "Pasos simples para comenzar con macetas, sustratos y riego.",
    image: "/assets/blogs/HuertoCasa.png",
    alt: "Cajoneras de madera con un huerto casero plantado",
    
    content: `
      <p>Arrancar un huerto casero es más fácil de lo que parece. Comienza con 3-4 macetas, sustrato con buen drenaje y cultivos nobles como lechuga, rabanitos y ciboulette.</p>
      <p>Ubica tu huerto en un lugar con 4-6 horas de sol y riega cuando la primera capa de tierra esté seca. Recuerda rotar cultivos y aprovechar restos orgánicos para hacer compost.</p>
    `,

    // --- Navegación ---
    prevPost: null, // No hay post anterior
    nextPost: {
      id: "verduras-organicas",
      title: "Blog de verduras orgánicas"
    }
  },
  {
    id: "verduras-organicas",
    title: "Verduras orgánicas: beneficios y cuidados",
    date: "2025-08-22",
    readTime: "4 min de lectura",
    
    // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
    subtitle: "Orgánico: producir sin pesticidas sintéticos y con prácticas regenerativas.", // <-- Subtítulo de tu foto
    
    excerpt: "Qué significa “orgánico” y cómo reconocer productos frescos.",
    image: "/assets/blogs/VerdurasOrganicas.png",
    alt: "Variedad de verduras orgánicas frescas",
    
    // --- ¡AQUÍ ESTÁ EL OTRO CAMBIO! ---
    content: `
      <p>Las verduras orgánicas priorizan el suelo vivo, la biodiversidad y el uso responsable del agua. Para cuidarlas, evita químicos agresivos y usa acolchados que mantengan la humedad.</p>
      <p>Compra a productores locales, revisa etiquetas y conserva en frío suave. La frescura es clave: procura consumir dentro de los primeros días para aprovechar al máximo sus nutrientes.</p>
    `, // <-- Contenido de tu foto

    // --- Navegación ---
    prevPost: {
      id: "huerto-casa",
      title: "Blog de huerto en casa" // <-- Título para el botón "Anterior"
    },
    nextPost: null // No hay post siguiente
  }
];