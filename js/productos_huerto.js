// js/productos_huerto.js
export const PRODUCTS_HH = [
  // ================== FRUTAS (FR) ==================
  {
    code: "FR001", nombre: "Manzanas Fuji", categoriaId: "FR",
    precioCLP: 1200, unidad: "kg", stock: 150, origen: "Valle del Maule",
    descripcion: "Manzanas crujientes y dulces; ideales para snack o postres.",
    practicas: ["Agricultura responsable"],
    recetas: ["https://www.bbcgoodfood.com/recipes/apple-strudel"],
    imagen: "assets/productos/frutas/manzana-fuji.jpg",
    rating: 4.7, reviews: 132
  },
  {
    code: "FR002", nombre: "Naranjas Valencia", categoriaId: "FR",
    precioCLP: 1000, unidad: "kg", stock: 200, origen: "Valencia, CL",
    descripcion: "Jugosas y ricas en vitamina C; perfectas para jugos.",
    practicas: ["Buenas prácticas de cosecha"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=orange%20juice"],
    imagen: "assets/productos/frutas/naranja-valencia.jpg",
    rating: 4.5, reviews: 98
  },
  {
    code: "FR003", nombre: "Plátanos Cavendish", categoriaId: "FR",
    precioCLP: 800, unidad: "kg", stock: 250, origen: "Zona Central",
    descripcion: "Dulces y energéticos; ricos en potasio.",
    practicas: ["Manejo postcosecha"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=banana%20smoothie"],
    imagen: "assets/productos/frutas/platano-cavendish.jpg",
    rating: 4.2, reviews: 76
  },
  {
    code: "FR004", nombre: "Peras Williams", categoriaId: "FR",
    precioCLP: 1300, unidad: "kg", stock: 120, origen: "Curicó",
    descripcion: "Peras aromáticas y jugosas, perfectas para postres.",
    practicas: ["Riego eficiente"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=poached%20pears"],
    imagen: "assets/productos/frutas/pera-williams.jpg", rating: 4.4, reviews: 61
  },
  {
    code: "FR005", nombre: "Uvas Red Globe", categoriaId: "FR",
    precioCLP: 1400, unidad: "kg", stock: 180, origen: "Aconcagua",
    descripcion: "Uvas grandes, dulces y crocantes.",
    practicas: ["Manejo integrado"],
    recetas: ["https://www.allrecipes.com/recipes/142/fruits-and-vegetables/fruits/grapes/"],
    imagen: "assets/productos/frutas/uvas-redglobe.jpg", rating: 4.6, reviews: 84
  },
  {
    code: "FR006", nombre: "Kiwi Zespri", categoriaId: "FR",
    precioCLP: 1100, unidad: "kg", stock: 130, origen: "Bío-Bío",
    descripcion: "Kiwi con alto contenido de vitamina C.",
    practicas: ["Fertilización controlada"],
    recetas: ["https://www.allrecipes.com/recipes/144/fruits-and-vegetables/fruits/kiwi/"],
    imagen: "assets/productos/frutas/kiwi-zespri.jpg", rating: 4.5, reviews: 73
  },
  {
    code: "FR007", nombre: "Frutillas", categoriaId: "FR",
    precioCLP: 1800, unidad: "500g", stock: 90, origen: "La Serena",
    descripcion: "Frutillas frescas, dulces e intensas.",
    practicas: ["Uso eficiente del agua"],
    recetas: ["https://www.bbcgoodfood.com/recipes/strawberry-jam"],
    imagen: "assets/productos/frutas/frutillas.jpg", rating: 4.7, reviews: 155
  },
  {
    code: "FR008", nombre: "Arándanos", categoriaId: "FR",
    precioCLP: 2200, unidad: "500g", stock: 75, origen: "Araucanía",
    descripcion: "Berries antioxidantes de sabor vibrante.",
    practicas: ["Certificación BPA"],
    recetas: ["https://www.bbcgoodfood.com/recipes/blueberry-smoothie"],
    imagen: "assets/productos/frutas/arandanos.jpg", rating: 4.8, reviews: 189
  },
  {
    code: "FR009", nombre: "Duraznos", categoriaId: "FR",
    precioCLP: 1500, unidad: "kg", stock: 140, origen: "Rancagua",
    descripcion: "Pulpa jugosa y aroma veraniego.",
    practicas: ["Rotación de suelos"],
    recetas: ["https://www.bbcgoodfood.com/recipes/peach-cobbler"],
    imagen: "assets/productos/frutas/duraznos.jpg", rating: 4.3, reviews: 67
  },
  {
    code: "FR010", nombre: "Ciruelas", categoriaId: "FR",
    precioCLP: 1200, unidad: "kg", stock: 120, origen: "Linares",
    descripcion: "Ciruelas dulces con toque ácido.",
    practicas: ["Compostaje"],
    recetas: ["https://www.bbcgoodfood.com/recipes/plum-crumble"],
    imagen: "assets/productos/frutas/ciruelas.jpg", rating: 4.2, reviews: 44
  },
  {
    code: "FR011", nombre: "Peras Packham", categoriaId: "FR",
    precioCLP: 1250, unidad: "kg", stock: 110, origen: "Talca",
    descripcion: "Textura mantecosa y sabor suave.",
    practicas: ["Control biológico"],
    recetas: ["https://www.bbcgoodfood.com/recipes/caramelised-pears"],
    imagen: "assets/productos/frutas/pera-packham.jpg", rating: 4.4, reviews: 58
  },
  {
    code: "FR012", nombre: "Mandarinas", categoriaId: "FR",
    precioCLP: 900, unidad: "kg", stock: 200, origen: "Coquimbo",
    descripcion: "Cítrico fácil de pelar, muy aromático.",
    practicas: ["Cosecha responsable"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=mandarin%20salad"],
    imagen: "assets/productos/frutas/mandarinas.jpg", rating: 4.6, reviews: 120
  },
  {
    code: "FR013", nombre: "Limones", categoriaId: "FR",
    precioCLP: 700, unidad: "kg", stock: 260, origen: "IV Región",
    descripcion: "Imprescindibles para aderezos y jugos.",
    practicas: ["Reutilización de agua"],
    recetas: ["https://www.bbcgoodfood.com/recipes/easy-lemonade"],
    imagen: "assets/productos/frutas/limones.jpg", rating: 4.5, reviews: 96
  },

  // ================== VERDURAS (VR) ==================
  {
    code: "VR001", nombre: "Zanahorias Orgánicas", categoriaId: "VR",
    precioCLP: 900, unidad: "kg", stock: 100, origen: "Región de O'Higgins",
    descripcion: "Crujientes y sin pesticidas; excelentes para ensaladas y jugos.",
    practicas: ["Certificación orgánica"],
    recetas: ["https://www.bbcgoodfood.com/recipes/carrot-salad"],
    imagen: "assets/productos/verduras/zanahoria-organica.jpg",
    rating: 4.6, reviews: 54
  },
  {
    code: "VR002", nombre: "Espinacas Frescas", categoriaId: "VR",
    precioCLP: 700, unidad: "0.5kg", stock: 80, origen: "Zona Sur",
    descripcion: "Hojas tiernas y nutritivas; ideales para ensaladas y batidos.",
    practicas: ["Riego eficiente"],
    recetas: ["https://www.allrecipes.com/recipes/1080/fruits-and-vegetables/vegetables/leafy-greens/spinach/"],
    imagen: "assets/productos/verduras/espinaca-fresca.jpg",
    rating: 4.1, reviews: 33
  },
  {
    code: "VR003", nombre: "Pimientos Tricolores", categoriaId: "VR",
    precioCLP: 1500, unidad: "kg", stock: 120, origen: "V Región",
    descripcion: "Rojos, amarillos y verdes; aportan color y antioxidantes.",
    practicas: ["Rotación de cultivos"],
    recetas: ["https://www.allrecipes.com/recipes/1111/fruits-and-vegetables/vegetables/peppers/"],
    imagen: "assets/productos/verduras/pimientos-tricolores.jpg",
    rating: 4.3, reviews: 41
  },
  {
    code: "VR004", nombre: "Tomates", categoriaId: "VR",
    precioCLP: 1200, unidad: "kg", stock: 170, origen: "Quillota",
    descripcion: "Tomates maduros, carnosos y aromáticos.",
    practicas: ["Fertirriego"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=tomato%20salsa"],
    imagen: "assets/productos/verduras/tomates.jpg", rating: 4.4, reviews: 88
  },
  {
    code: "VR005", nombre: "Lechuga Escarola", categoriaId: "VR",
    precioCLP: 700, unidad: "unidad", stock: 140, origen: "Metropolitana",
    descripcion: "Crujiente, ideal para ensaladas frescas.",
    practicas: ["Uso de compost"],
    recetas: ["https://www.allrecipes.com/recipes/96/salad/lettuce-salad/"],
    imagen: "assets/productos/verduras/lechuga-escarola.jpg", rating: 4.2, reviews: 39
  },
  {
    code: "VR006", nombre: "Pepino", categoriaId: "VR",
    precioCLP: 850, unidad: "kg", stock: 120, origen: "San Felipe",
    descripcion: "Refrescante y de baja caloría.",
    practicas: ["Manejo integrado"],
    recetas: ["https://www.allrecipes.com/recipes/15635/salad/cucumber-salad/"],
    imagen: "assets/productos/verduras/pepino.jpg", rating: 4.1, reviews: 28
  },
  {
    code: "VR007", nombre: "Brócoli", categoriaId: "VR",
    precioCLP: 1100, unidad: "unidad", stock: 100, origen: "La Serena",
    descripcion: "Rico en fibra y vitaminas.",
    practicas: ["Cobertura vegetal"],
    recetas: ["https://www.bbcgoodfood.com/recipes/broccoli-soup"],
    imagen: "assets/productos/verduras/brocoli.jpg", rating: 4.5, reviews: 64
  },
  {
    code: "VR008", nombre: "Coliflor", categoriaId: "VR",
    precioCLP: 1000, unidad: "unidad", stock: 95, origen: "Talca",
    descripcion: "Textura suave; ideal para purés.",
    practicas: ["Control biológico"],
    recetas: ["https://www.bbcgoodfood.com/recipes/cauliflower-cheese"],
    imagen: "assets/productos/verduras/coliflor.jpg", rating: 4.0, reviews: 22
  },
  {
    code: "VR009", nombre: "Cebolla Morada", categoriaId: "VR",
    precioCLP: 900, unidad: "kg", stock: 160, origen: "Copiapó",
    descripcion: "Sabor suave y color intenso.",
    practicas: ["Riego por goteo"],
    recetas: ["https://www.bbcgoodfood.com/recipes/pickled-red-onions"],
    imagen: "assets/productos/verduras/cebolla-morada.jpg", rating: 4.3, reviews: 51
  },
  {
    code: "VR010", nombre: "Ajo", categoriaId: "VR",
    precioCLP: 1200, unidad: "kg", stock: 110, origen: "Illapel",
    descripcion: "Condimento clásico con múltiples usos.",
    practicas: ["Secado natural"],
    recetas: ["https://www.bbcgoodfood.com/recipes/roasted-garlic"],
    imagen: "assets/productos/verduras/ajo.jpg", rating: 4.6, reviews: 72
  },
  {
    code: "VR011", nombre: "Papas", categoriaId: "VR",
    precioCLP: 850, unidad: "kg", stock: 300, origen: "Chiloé",
    descripcion: "Harinosas, perfectas para puré o fritas.",
    practicas: ["Rotación de cultivos"],
    recetas: ["https://www.bbcgoodfood.com/search/recipes?q=mashed%20potatoes"],
    imagen: "assets/productos/verduras/papas.jpg", rating: 4.4, reviews: 90
  },
  {
    code: "VR012", nombre: "Zapallo Italiano", categoriaId: "VR",
    precioCLP: 950, unidad: "kg", stock: 140, origen: "Cachapoal",
    descripcion: "Suave y versátil para salteados.",
    practicas: ["Mulching"],
    recetas: ["https://www.allrecipes.com/recipes/201/fruit-and-vegetable/vegetable-recipes/squash/summer-squash/zucchini/"],
    imagen: "assets/productos/verduras/zapallo-italiano.jpg", rating: 4.2, reviews: 37
  },
  {
    code: "VR013", nombre: "Betarraga", categoriaId: "VR",
    precioCLP: 900, unidad: "kg", stock: 130, origen: "Ñuble",
    descripcion: "Dulce y de color intenso, rica en hierro.",
    practicas: ["Siembra escalonada"],
    recetas: ["https://www.bbcgoodfood.com/recipes/beetroot-salad"],
    imagen: "assets/productos/verduras/betarraga.jpg", rating: 4.3, reviews: 42
  },

  // ================== ORGÁNICOS (PO) ==================
  {
    code: "PO001", nombre: "Miel Orgánica", categoriaId: "PO",
    precioCLP: 5000, unidad: "500g", stock: 50, origen: "Apicultores locales",
    descripcion: "Miel pura y aromática; rica en antioxidantes.",
    practicas: ["Apicultura sostenible"],
    recetas: ["https://www.bbcgoodfood.com/recipes/hot-lemon-honey-drink"],
    imagen: "assets/productos/productos-organicos/miel-organica.jpg",
    rating: 4.8, reviews: 210
  },
  {
    code: "PO003", nombre: "Quinua Orgánica", categoriaId: "PO",
    precioCLP: 3200, unidad: "kg", stock: 70, origen: "Altiplano",
    descripcion: "Grano andino de alto valor nutritivo.",
    practicas: ["Producción responsable"],
    recetas: ["https://www.bbcgoodfood.com/recipes/quinoa-salad"],
    imagen: "assets/productos/productos-organicos/quinua-organica.jpg",
    rating: 4.4, reviews: 65
  },
  {
    code: "PO002", nombre: "Polen de Abeja Orgánico", categoriaId: "PO",
    precioCLP: 4500, unidad: "250g", stock: 60, origen: "Colmenas locales",
    descripcion: "Superalimento natural, fuente de proteínas.",
    practicas: ["Apicultura responsable"],
    recetas: ["https://downshiftology.com/recipes/bee-pollen-smoothie/"],
    imagen: "assets/productos/productos-organicos/polen-abeja.jpg",
    rating: 4.6, reviews: 88
  },
  {
    code: "PO004", nombre: "Aceite de Coco Orgánico", categoriaId: "PO",
    precioCLP: 5900, unidad: "500ml", stock: 80, origen: "Exportación certificada",
    descripcion: "Ideal para cocina y cosmética natural.",
    practicas: ["Comercio justo"],
    recetas: ["https://www.bbcgoodfood.com/recipes/coconut-macaroons"],
    imagen: "assets/productos/productos-organicos/aceite-coco.jpg",
    rating: 4.5, reviews: 102
  },
  {
    code: "PO005", nombre: "Harina de Almendra Orgánica", categoriaId: "PO",
    precioCLP: 4800, unidad: "500g", stock: 70, origen: "Productores certificados",
    descripcion: "Alternativa sin gluten para repostería.",
    practicas: ["Trazabilidad"],
    recetas: ["https://www.kingarthurbaking.com/recipes/almond-flour-pancakes-recipe"],
    imagen: "assets/productos/productos-organicos/harina-almendra.jpg",
    rating: 4.7, reviews: 136
  },
  {
    code: "PO006", nombre: "Avena Integral Orgánica", categoriaId: "PO",
    precioCLP: 2200, unidad: "1kg", stock: 200, origen: "Zona Centro-Sur",
    descripcion: "Fibra natural para desayunos saludables.",
    practicas: ["Rotación sustentable"],
    recetas: ["https://www.bbcgoodfood.com/recipes/overnight-oats"],
    imagen: "assets/productos/productos-organicos/avena-integral.jpg",
    rating: 4.6, reviews: 190
  },
  {
    code: "PO007", nombre: "Arroz Integral Orgánico", categoriaId: "PO",
    precioCLP: 2600, unidad: "1kg", stock: 150, origen: "Zona Sur",
    descripcion: "Grano entero con mayor contenido de fibra.",
    practicas: ["Uso eficiente del agua"],
    recetas: ["https://www.allrecipes.com/recipes/1540/ingredients/grains/rice/brown-rice/"],
    imagen: "assets/productos/productos-organicos/arroz-integral.jpg",
    rating: 4.3, reviews: 74
  },
  {
    code: "PO008", nombre: "Semillas de Chía Orgánica", categoriaId: "PO",
    precioCLP: 2800, unidad: "500g", stock: 110, origen: "Altiplano",
    descripcion: "Ricas en omega-3 y antioxidantes.",
    practicas: ["Certificación orgánica"],
    recetas: ["https://www.bbcgoodfood.com/recipes/chia-pudding"],
    imagen: "assets/productos/productos-organicos/chia.jpg",
    rating: 4.7, reviews: 145
  },
  {
    code: "PO009", nombre: "Semillas de Linaza Orgánica", categoriaId: "PO",
    precioCLP: 2000, unidad: "500g", stock: 130, origen: "Zona Centro",
    descripcion: "Buena fuente de fibra y grasas saludables.",
    practicas: ["Buenas prácticas"],
    recetas: ["https://www.allrecipes.com/search?q=flax%20bread"],
    imagen: "assets/productos/productos-organicos/linaza.jpg",
    rating: 4.4, reviews: 58
  },
  {
    code: "PO010", nombre: "Mantequilla de Maní Orgánica", categoriaId: "PO",
    precioCLP: 4200, unidad: "450g", stock: 95, origen: "Productores locales",
    descripcion: "100% maní, sin azúcar añadida.",
    practicas: ["Etiquetado limpio"],
    recetas: ["https://www.bbcgoodfood.com/recipes/peanut-butter-cookies"],
    imagen: "assets/productos/productos-organicos/mantequilla-mani.jpg",
    rating: 4.8, reviews: 230
  },
  {
    code: "PO011", nombre: "Cacao en Polvo Orgánico", categoriaId: "PO",
    precioCLP: 5200, unidad: "300g", stock: 85, origen: "Comercio justo",
    descripcion: "Intenso sabor a chocolate, sin azúcar.",
    practicas: ["Trazabilidad"],
    recetas: ["https://www.bbcgoodfood.com/recipes/best-ever-chocolate-brownies-recipe"],
    imagen: "assets/productos/productos-organicos/cacao-polvo.jpg",
    rating: 4.6, reviews: 124
  },
  {
    code: "PO012", nombre: "Té Verde Orgánico", categoriaId: "PO",
    precioCLP: 3500, unidad: "100g", stock: 120, origen: "Exportación certificada",
    descripcion: "Aromático, con suaves notas herbales.",
    practicas: ["Cosecha selectiva"],
    recetas: ["https://www.allrecipes.com/search?q=iced%20green%20tea"],
    imagen: "assets/productos/productos-organicos/te-verde.jpg",
    rating: 4.5, reviews: 90
  },

  // ================== LÁCTEOS (PL) ==================
  {
    code: "PL001", nombre: "Leche Entera", categoriaId: "PL",
    precioCLP: 1100, unidad: "1L", stock: 90, origen: "Lecherías locales",
    descripcion: "Leche fresca, ideal para consumo diario.",
    practicas: ["Bienestar animal"],
    recetas: ["https://www.bbcgoodfood.com/recipes/rice-pudding"],
    imagen: "assets/productos/lacteos/leche-entera.jpg",
    rating: 4.0, reviews: 47
  },
  {
    code: "PL002", nombre: "Yogur Natural", categoriaId: "PL",
    precioCLP: 900, unidad: "1L", stock: 80, origen: "Los Ríos",
    descripcion: "Cremoso y sin azúcar añadida.",
    practicas: ["Fermentación natural"],
    recetas: ["https://www.allrecipes.com/search?q=yogurt%20parfait"],
    imagen: "assets/productos/lacteos/yogur-natural.jpg", rating: 4.4, reviews: 64
  },
  {
    code: "PL003", nombre: "Queso Fresco", categoriaId: "PL",
    precioCLP: 3200, unidad: "500g", stock: 70, origen: "Osorno",
    descripcion: "Suave y versátil para ensaladas.",
    practicas: ["Buenas prácticas lácteas"],
    recetas: ["https://www.allrecipes.com/search?q=queso%20fresco%20salad"],
    imagen: "assets/productos/lacteos/queso-fresco.jpg", rating: 4.5, reviews: 88
  },
  {
    code: "PL004", nombre: "Queso Mantecoso", categoriaId: "PL",
    precioCLP: 5200, unidad: "500g", stock: 60, origen: "Los Lagos",
    descripcion: "Textura mantecosa y sabor suave.",
    practicas: ["Maduración controlada"],
    recetas: ["https://www.bbcgoodfood.com/recipes/ultimate-grilled-cheese-sandwich"],
    imagen: "assets/productos/lacteos/queso-mantecoso.jpg", rating: 4.6, reviews: 72
  },
  {
    code: "PL005", nombre: "Queso Gouda", categoriaId: "PL",
    precioCLP: 5900, unidad: "500g", stock: 55, origen: "Araucanía",
    descripcion: "Sabor balanceado, ideal para tablas.",
    practicas: ["Control de calidad"],
    recetas: ["https://www.bbcgoodfood.com/howto/guide/perfect-cheeseboard"],
    imagen: "assets/productos/lacteos/queso-gouda.jpg", rating: 4.7, reviews: 81
  },
  {
    code: "PL006", nombre: "Mantequilla", categoriaId: "PL",
    precioCLP: 2600, unidad: "250g", stock: 100, origen: "Valdivia",
    descripcion: "Batida a partir de crema fresca.",
    practicas: ["Trazabilidad"],
    recetas: ["https://www.bbcgoodfood.com/recipes/shortbread-biscuits"],
    imagen: "assets/productos/lacteos/mantequilla.jpg", rating: 4.3, reviews: 59
  },
  {
    code: "PL007", nombre: "Yogur Griego", categoriaId: "PL",
    precioCLP: 1400, unidad: "500g", stock: 90, origen: "Osorno",
    descripcion: "Extra cremoso, alto en proteínas.",
    practicas: ["Fermentación lenta"],
    recetas: ["https://www.bbcgoodfood.com/recipes/tzatziki"],
    imagen: "assets/productos/lacteos/yogur-griego.jpg", rating: 4.6, reviews: 112
  },
  {
    code: "PL008", nombre: "Leche Descremada", categoriaId: "PL",
    precioCLP: 1100, unidad: "1L", stock: 120, origen: "Los Ríos",
    descripcion: "Bajo contenido graso, fortificada.",
    practicas: ["Fortificación"],
    recetas: ["https://www.bbcgoodfood.com/recipes/banana-smoothie"],
    imagen: "assets/productos/lacteos/leche-descremada.jpg", rating: 4.2, reviews: 41
  },
  {
    code: "PL009", nombre: "Leche Semidescremada", categoriaId: "PL",
    precioCLP: 1100, unidad: "1L", stock: 110, origen: "Los Lagos",
    descripcion: "Equilibrio entre sabor y ligereza.",
    practicas: ["Buenas prácticas"],
    recetas: ["https://www.bbcgoodfood.com/howto/guide/how-to-make-cappuccino-at-home"],
    imagen: "assets/productos/lacteos/leche-semi.jpg", rating: 4.3, reviews: 46
  },
  {
    code: "PL010", nombre: "Kéfir", categoriaId: "PL",
    precioCLP: 1900, unidad: "500ml", stock: 60, origen: "Valdivia",
    descripcion: "Bebida fermentada con probióticos.",
    practicas: ["Fermentos vivos"],
    recetas: ["https://www.allrecipes.com/search?q=kefir%20smoothie"],
    imagen: "assets/productos/lacteos/kefir.jpg", rating: 4.5, reviews: 53
  },
  {
    code: "PL011", nombre: "Quesillo", categoriaId: "PL",
    precioCLP: 2800, unidad: "500g", stock: 80, origen: "Araucanía",
    descripcion: "Suave, ideal para desayunos.",
    practicas: ["Maduración corta"],
    recetas: ["https://www.allrecipes.com/search?q=queso%20fresco%20jam%20dessert"],
    imagen: "assets/productos/lacteos/quesillo.jpg", rating: 4.4, reviews: 62
  }
];
