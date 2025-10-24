// src/data/productos_huerto.js

// ====================================================================
// --- 1. DEFINICIÓN DE CATEGORÍAS ---
// ====================================================================
export const CATEGORY_DETAILS = {
    // Estas IDs (FR, VR, PO, PL) deben coincidir con el campo 'categoriaId' de tus productos
    "FR": { name: "Frutas", description: "Frescas, jugosas y ricas en vitaminas.", imageUrl: "/assets/productos/frutas/manzana-fuji.jpg" },
    "VR": { name: "Verduras", description: "Orgánicas y esenciales para una dieta equilibrada.", imageUrl: "/assets/productos/verduras/zanahoria-organica.jpg" },
    "PO": { name: "Productos Orgánicos", description: "Alimentos procesados y granos con certificación orgánica.", imageUrl: "/assets/productos/productos-organicos/miel-organica.jpg" },
    "PL": { name: "Lácteos y Derivados", description: "Leche, yogur y quesos frescos de producción local.", imageUrl: "/assets/productos/lacteos/leche-entera.jpg" },
};

// Array para mapear los tiles del header (es más fácil de iterar en React)
export const CATEGORY_TILES = Object.keys(CATEGORY_DETAILS).map(key => ({
    id: key, 
    ...CATEGORY_DETAILS[key]
}));

// ====================================================================
// --- 2. PRODUCTOS ---
// ====================================================================
export const PRODUCTS_HH = [
  // ================== FRUTAS (FR) ==================
  {
    code: "FR001", nombre: "Manzanas Fuji", categoriaId: "FR",
    precioCLP: 1200, unidad: "kg", stock: 150, origen: "Valle del Maule",
    descripcion: "Manzanas crujientes y dulces; ideales para snack o postres.",
    practicas: ["Agricultura responsable"],
    recetas: ["https://www.bbcgoodfood.com/recipes/apple-strudel"],
    imagen: "/assets/productos/frutas/manzana-fuji.jpg", // Corregido
    rating: 4.7, reviews: 132
  },
  {
    code: "FR002", nombre: "Naranjas Valencia", categoriaId: "FR",
    precioCLP: 1000, unidad: "kg", stock: 200, origen: "Valencia, CL",
    descripcion: "Jugosas y ricas en vitamina C; perfectas para jugos.",
    practicas: ["Buenas prácticas de cosecha"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=orange%20juice"],
    imagen: "/assets/productos/frutas/naranja-valencia.jpg", // Corregido
    rating: 4.5, reviews: 98
  },
  {
    code: "FR003", nombre: "Plátanos", categoriaId: "FR",
    precioCLP: 800, unidad: "kg", stock: 250, origen: "Zona Central",
    descripcion: "Dulces y energéticos; ricos en potasio.",
    practicas: ["Manejo postcosecha"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=banana%20smoothie"],
    imagen: "/assets/productos/frutas/platano-cavendish.jpg", // Corregido
    rating: 4.2, reviews: 76
  },
  {
    code: "FR005", nombre: "Uvas Rojas", categoriaId: "FR",
    precioCLP: 1400, unidad: "kg", stock: 180, origen: "Aconcagua",
    descripcion: "Uvas grandes, dulces y crocantes.",
    practicas: ["Manejo integrado"],
    recetas: ["https://www.allrecipes.com/recipes/142/fruits-and-vegetables/fruits/grapes/"],
    imagen: "/assets/productos/frutas/uvas-redglobe.jpg", rating: 4.6, reviews: 84 // Corregido
  },
  {
    code: "FR006", nombre: "Kiwi Zespri", categoriaId: "FR",
    precioCLP: 1100, unidad: "kg", stock: 130, origen: "Bío-Bío",
    descripcion: "Kiwi con alto contenido de vitamina C.",
    practicas: ["Fertilización controlada"],
    recetas: ["https://www.allrecipes.com/recipes/144/fruits-and-vegetables/fruits/kiwi/"],
    imagen: "/assets/productos/frutas/kiwi-zespri.jpg", rating: 4.5, reviews: 73 // Corregido
  },
  {
    code: "FR007", nombre: "Frutillas", categoriaId: "FR",
    precioCLP: 1800, unidad: "500g", stock: 90, origen: "La Serena",
    descripcion: "Frutillas frescas, dulces e intensas.",
    practicas: ["Uso eficiente del agua"],
    recetas: ["https://www.bbcgoodfood.com/recipes/strawberry-jam"],
    imagen: "/assets/productos/frutas/frutillas.jpg", rating: 4.7, reviews: 155 // Corregido
  },
  {
    code: "FR008", nombre: "Arándanos", categoriaId: "FR",
    precioCLP: 2200, unidad: "500g", stock: 75, origen: "Araucanía",
    descripcion: "Berries antioxidantes de sabor vibrante.",
    practicas: ["Certificación BPA"],
    recetas: ["https://www.bbcgoodfood.com/recipes/blueberry-smoothie"],
    imagen: "/assets/productos/frutas/arandanos.jpg", rating: 4.8, reviews: 189 // Corregido
  },
  {
    code: "FR009", nombre: "Duraznos", categoriaId: "FR",
    precioCLP: 1500, unidad: "kg", stock: 140, origen: "Rancagua",
    descripcion: "Pulpa jugosa y aroma veraniego.",
    practicas: ["Rotación de suelos"],
    recetas: ["https://www.bbcgoodfood.com/recipes/peach-cobbler"],
    imagen: "/assets/productos/frutas/duraznos.jpg", rating: 4.3, reviews: 67 // Corregido
  },
  {
    code: "FR010", nombre: "Ciruelas", categoriaId: "FR",
    precioCLP: 1200, unidad: "kg", stock: 120, origen: "Linares",
    descripcion: "Ciruelas dulces con toque ácido.",
    practicas: ["Compostaje"],
    recetas: ["https://www.bbcgoodfood.com/recipes/plum-crumble"],
    imagen: "/assets/productos/frutas/ciruelas.jpg", rating: 4.2, reviews: 44 // Corregido
  },
  {
    code: "FR011", nombre: "Peras", categoriaId: "FR",
    precioCLP: 1250, unidad: "kg", stock: 110, origen: "Talca",
    descripcion: "Textura mantecosa y sabor suave.",
    practicas: ["Control biológico"],
    recetas: ["https://www.bbcgoodfood.com/recipes/caramelised-pears"],
    imagen: "/assets/productos/frutas/pera-packham.jpg", rating: 4.4, reviews: 58 // Corregido
  },
  {
    code: "FR012", nombre: "Mandarinas", categoriaId: "FR",
    precioCLP: 900, unidad: "kg", stock: 200, origen: "Coquimbo",
    descripcion: "Cítrico fácil de pelar, muy aromático.",
    practicas: ["Cosecha responsable"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=mandarin%20salad"],
    imagen: "/assets/productos/frutas/mandarinas.jpg", rating: 4.6, reviews: 120 // Corregido
  },
  {
    code: "FR013", nombre: "Limones", categoriaId: "FR",
    precioCLP: 700, unidad: "kg", stock: 260, origen: "IV Región",
    descripcion: "Imprescindibles para aderezos y jugos.",
    practicas: ["Reutilización de agua"],
    recetas: ["https://www.bbcgoodfood.com/recipes/easy-lemonade"],
    imagen: "/assets/productos/frutas/limones.jpg", rating: 4.5, reviews: 96 // Corregido
  },

  // ================== VERDURAS (VR) ==================
  {
    code: "VR001", nombre: "Zanahorias Orgánicas", categoriaId: "VR",
    precioCLP: 900, unidad: "kg", stock: 100, origen: "Región de O'Higgins",
    descripcion: "Crujientes y sin pesticidas; excelentes para ensaladas y jugos.",
    practicas: ["Certificación orgánica"],
    recetas: ["https://www.bbcgoodfood.com/recipes/carrot-salad"],
    imagen: "/assets/productos/verduras/zanahoria-organica.jpg", // Corregido
    rating: 4.6, reviews: 54
  },
  {
    code: "VR002", nombre: "Espinacas Frescas", categoriaId: "VR",
    precioCLP: 700, unidad: "0.5kg", stock: 80, origen: "Zona Sur",
    descripcion: "Hojas tiernas y nutritivas; ideales para ensaladas y batidos.",
    practicas: ["Riego eficiente"],
    recetas: ["https://www.allrecipes.com/recipes/1080/fruits-and-vegetables/vegetables/leafy-greens/spinach/"],
    imagen: "/assets/productos/verduras/espinaca-fresca.jpg", // Corregido
    rating: 4.1, reviews: 33
  },
  {
    code: "VR003", nombre: "Pimientos Tricolores", categoriaId: "VR",
    precioCLP: 1500, unidad: "kg", stock: 120, origen: "V Región",
    descripcion: "Rojos, amarillos y verdes; aportan color y antioxidantes.",
    practicas: ["Rotación de cultivos"],
    recetas: ["https://www.allrecipes.com/recipes/1111/fruits-and-vegetables/vegetables/peppers/"],
    imagen: "/assets/productos/verduras/pimientos-tricolores.jpg", // Corregido
    rating: 4.3, reviews: 41
  },
  {
    code: "VR004", nombre: "Tomates", categoriaId: "VR",
    precioCLP: 1200, unidad: "kg", stock: 170, origen: "Quillota",
    descripcion: "Tomates maduros, carnosos y aromáticos.",
    practicas: ["Fertirriego"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=tomato%20salsa"],
    imagen: "/assets/productos/verduras/tomates.jpg", rating: 4.4, reviews: 88 // Corregido
  },
  {
    code: "VR005", nombre: "Lechuga Escarola", categoriaId: "VR",
    precioCLP: 700, unidad: "unidad", stock: 140, origen: "Metropolitana",
    descripcion: "Crujiente, ideal para ensaladas frescas.",
    practicas: ["Uso de compost"],
    recetas: ["https://www.allrecipes.com/recipes/96/salad/lettuce-salad/"],
    imagen: "/assets/productos/verduras/lechuga-escarola.jpg", rating: 4.2, reviews: 39 // Corregido
  },
  {
    code: "VR006", nombre: "Pepino", categoriaId: "VR",
    precioCLP: 850, unidad: "kg", stock: 120, origen: "San Felipe",
    descripcion: "Refrescante y de baja caloría.",
    practicas: ["Manejo integrado"],
    recetas: ["https://www.allrecipes.com/recipes/15635/salad/cucumber-salad/"],
    imagen: "/assets/productos/verduras/pepino.jpg", rating: 4.1, reviews: 28 // Corregido
  },
  {
    code: "VR007", nombre: "Brócoli", categoriaId: "VR",
    precioCLP: 1100, unidad: "unidad", stock: 100, origen: "La Serena",
    descripcion: "Rico en fibra y vitaminas.",
    practicas: ["Cobertura vegetal"],
    recetas: ["https://www.bbcgoodfood.com/recipes/broccoli-soup"],
    imagen: "/assets/productos/verduras/brocoli.jpg", rating: 4.5, reviews: 64 // Corregido
  },
  {
    code: "VR008", nombre: "Coliflor", categoriaId: "VR",
    precioCLP: 1000, unidad: "unidad", stock: 95, origen: "Talca",
    descripcion: "Textura suave; ideal para purés.",
    practicas: ["Control biológico"],
    recetas: ["https://www.bbcgoodfood.com/recipes/cauliflower-cheese"],
    imagen: "/assets/productos/verduras/coliflor.jpg", rating: 4.0, reviews: 22 // Corregido
  },
  {
    code: "VR009", nombre: "Cebolla Morada", categoriaId: "VR",
    precioCLP: 900, unidad: "kg", stock: 160, origen: "Copiapó",
    descripcion: "Sabor suave y color intenso.",
    practicas: ["Riego por goteo"],
    recetas: ["https://www.bbcgoodfood.com/recipes/pickled-red-onions"],
    imagen: "/assets/productos/verduras/cebolla-morada.jpg", rating: 4.3, reviews: 51 // Corregido
  },
  {
    code: "VR010", nombre: "Ajo", categoriaId: "VR",
    precioCLP: 1200, unidad: "kg", stock: 110, origen: "Illapel",
    descripcion: "Condimento clásico con múltiples usos.",
    practicas: ["Secado natural"],
    recetas: ["https://www.bbcgoodfood.com/recipes/roasted-garlic"],
    imagen: "/assets/productos/verduras/ajo.jpg", rating: 4.6, reviews: 72 // Corregido
  },
  {
    code: "VR011", nombre: "Papas", categoriaId: "VR",
    precioCLP: 850, unidad: "kg", stock: 300, origen: "Chiloé",
    descripcion: "Harinosas, perfectas para puré o fritas.",
    practicas: ["Rotación de cultivos"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=mashed%20potatoes"],
    imagen: "/assets/productos/verduras/papas.jpg", rating: 4.4, reviews: 90 // Corregido
  },
  {
    code: "VR012", nombre: "Zapallo Italiano", categoriaId: "VR",
    precioCLP: 950, unidad: "kg", stock: 140, origen: "Cachapoal",
    descripcion: "Suave y versátil para salteados.",
    practicas: ["Mulching"],
    recetas: ["https://www.allrecipes.com/recipes/201/fruit-and-vegetable/vegetable-recipes/squash/summer-squash/zucchini/"],
    imagen: "/assets/productos/verduras/zapallo-italiano.jpg", rating: 4.2, reviews: 37 // Corregido
  },
  {
    code: "VR013", nombre: "Betarraga", categoriaId: "VR",
    precioCLP: 900, unidad: "kg", stock: 130, origen: "Ñuble",
    descripcion: "Dulce y de color intenso, rica en hierro.",
    practicas: ["Siembra escalonada"],
    recetas: ["https://www.bbcgoodfood.com/recipes/beetroot-salad"],
    imagen: "/assets/productos/verduras/betarraga.jpg", rating: 4.3, reviews: 42 // Corregido
  },

  // ================== ORGÁNICOS (PO) ==================
  {
    code: "PO001", nombre: "Miel Orgánica", categoriaId: "PO",
    precioCLP: 5000, unidad: "500g", stock: 50, origen: "Apicultores locales",
    descripcion: "Miel pura y aromática; rica en antioxidantes.",
    practicas: ["Apicultura sostenible"],
    recetas: ["https://www.bbcgoodfood.com/recipes/hot-lemon-honey-drink"],
    imagen: "/assets/productos/productos-organicos/miel-organica.jpg", // Corregido
    rating: 4.8, reviews: 210
  },
  {
    code: "PO003", nombre: "Quinua Orgánica", categoriaId: "PO",
    precioCLP: 3200, unidad: "kg", stock: 70, origen: "Altiplano",
    descripcion: "Grano andino de alto valor nutritivo.",
    practicas: ["Producción responsable"],
    recetas: ["https://www.bbcgoodfood.com/recipes/quinoa-salad"],
    imagen: "/assets/productos/productos-organicos/quinua-organica.jpg", // Corregido
    rating: 4.4, reviews: 65
  },
  {
    code: "PO005", nombre: "Harina de Almendra Orgánica", categoriaId: "PO",
    precioCLP: 4800, unidad: "500g", stock: 70, origen: "Productores certificados",
    descripcion: "Alternativa sin gluten para repostería.",
    practicas: ["Trazabilidad"],
    recetas: ["https://www.kingarthurbaking.com/recipes/almond-flour-pancakes-recipe"],
    imagen: "/assets/productos/productos-organicos/harina-almendra.jpg", // Corregido
    rating: 4.7, reviews: 136
  },
  {
    code: "PO006", nombre: "Avena Integral Orgánica", categoriaId: "PO",
    precioCLP: 2200, unidad: "1kg", stock: 200, origen: "Zona Centro-Sur",
    descripcion: "Fibra natural para desayunos saludables.",
    practicas: ["Rotación sustentable"],
    recetas: ["https://www.bbcgoodfood.com/recipes/overnight-oats"],
    imagen: "/assets/productos/productos-organicos/avena-integral.jpg", // Corregido
    rating: 4.6, reviews: 190
  },
  {
    code: "PO007", nombre: "Arroz Integral Orgánico", categoriaId: "PO",
    precioCLP: 2600, unidad: "1kg", stock: 150, origen: "Zona Sur",
    descripcion: "Grano entero con mayor contenido de fibra.",
    practicas: ["Uso eficiente del agua"],
    recetas: ["https://www.allrecipes.com/recipes/1540/ingredients/grains/rice/brown-rice/"],
    imagen: "/assets/productos/productos-organicos/arroz-integral.jpg", // Corregido
    rating: 4.3, reviews: 74
  },
  {
    code: "PO008", nombre: "Semillas de Chía Orgánica", categoriaId: "PO",
    precioCLP: 2800, unidad: "500g", stock: 110, origen: "Altiplano",
    descripcion: "Ricas en omega-3 y antioxidantes.",
    practicas: ["Certificación orgánica"],
    recetas: ["https://www.bbcgoodfood.com/recipes/chia-pudding"],
    imagen: "/assets/productos/productos-organicos/chia.jpg", // Corregido
    rating: 4.7, reviews: 145
  },
  {
    code: "PO009", nombre: "Semillas de Linaza Orgánica", categoriaId: "PO",
    precioCLP: 2000, unidad: "500g", stock: 130, origen: "Zona Centro",
    descripcion: "Buena fuente de fibra y grasas saludables.",
    practicas: ["Buenas prácticas"],
    recetas: ["https://www.allrecipes.com/search?q=flax%20bread"],
    imagen: "/assets/productos/productos-organicos/linaza.jpg", // Corregido
    rating: 4.4, reviews: 58
  },
  {
    code: "PO010", nombre: "Mantequilla de Maní Orgánica", categoriaId: "PO",
    precioCLP: 4200, unidad: "450g", stock: 95, origen: "Productores locales",
    descripcion: "100% maní, sin azúcar añadida.",
    practicas: ["Etiquetado limpio"],
    recetas: ["https://www.bbcgoodfood.com/recipes/peanut-butter-cookies"],
    imagen: "/assets/productos/productos-organicos/mantequilla-mani.jpg", // Corregido
    rating: 4.8, reviews: 230
  },
  {
    code: "PO012", nombre: "Té Verde Orgánico", categoriaId: "PO",
    precioCLP: 3500, unidad: "100g", stock: 120, origen: "Exportación certificada",
    descripcion: "Aromático, con suaves notas herbales.",
    practicas: ["Cosecha selectiva"],
    recetas: ["https://www.allrecipes.com/search?q=iced%20green%20tea"],
    imagen: "/assets/productos/productos-organicos/te-verde.jpg", // Corregido
    rating: 4.5, reviews: 90
  },

  // ================== LÁCTEOS (PL) ==================
  {
    code: "PL001", nombre: "Leche Entera", categoriaId: "PL",
    precioCLP: 1100, unidad: "1L", stock: 90, origen: "Lecherías locales",
    descripcion: "Leche fresca, ideal para consumo diario.",
    practicas: ["Bienestar animal"],
    recetas: ["https://www.bbcgoodfood.com/recipes/rice-pudding"],
    imagen: "/assets/productos/lacteos/leche-entera.jpg", // Corregido
    rating: 4.0, reviews: 47
  },
  {
    code: "PL002", nombre: "Yogur Natural", categoriaId: "PL",
    precioCLP: 900, unidad: "1L", stock: 80, origen: "Los Ríos",
    descripcion: "Cremoso y sin azúcar añadida.",
    practicas: ["Fermentación natural"],
    recetas: ["https://www.allrecipes.com/search?q=yogurt%20parfait"],
    imagen: "/assets/productos/lacteos/yogur-natural.jpg", rating: 4.4, reviews: 64 // Corregido
  },
  {
    code: "PL003", nombre: "Queso Fresco", categoriaId: "PL",
    precioCLP: 3200, unidad: "500g", stock: 70, origen: "Osorno",
    descripcion: "Suave y versátil para ensaladas.",
    practicas: ["Buenas prácticas lácteas"],
    recetas: ["https://www.allrecipes.com/search?q=queso%20fresco%20salad"],
    imagen: "/assets/productos/lacteos/queso-fresco.jpg", rating: 4.5, reviews: 88 // Corregido
  },
  {
    code: "PL006", nombre: "Mantequilla", categoriaId: "PL",
    precioCLP: 2600, unidad: "250g", stock: 100, origen: "Valdivia",
    descripcion: "Batida a partir de crema fresca.",
    practicas: ["Trazabilidad"],
    recetas: ["https://www.bbcgoodfood.com/recipes/shortbread-biscuits"],
    imagen: "/assets/productos/lacteos/mantequilla.jpg", rating: 4.3, reviews: 59 // Corregido
  },
];