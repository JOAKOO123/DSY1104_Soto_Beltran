// Cerrar menú al hacer click fuera
document.addEventListener('click', function(e) {
  if (!themeToggle.contains(e.target) && !themeMenu.contains(e.target)) {
    themeMenu.classList.remove('show');
    themeToggle.setAttribute('aria-expanded', 'false');
  }
});

// Teclado: ESC para cerrar el menú
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && themeMenu.classList.contains('show')) {
    themeMenu.classList.remove('show');
    themeToggle.setAttribute('aria-expanded', 'false');
    themeToggle.focus();
  }
});


  import { PRODUCTS_HH } from './js/productos_huerto.js';

  const featuredGrid = document.getElementById('featured-grid');

  // Escoger 3 productos destacados (ejemplo: los primeros 3)
  const destacados = PRODUCTS_HH.slice(0, 3);

  destacados.forEach(prod => {
    const article = document.createElement('article');
    article.classList.add('card');
    article.innerHTML = `
      <div class="thumb"><img src="${prod.imagen}" alt="${prod.nombre}"></div>
      <h3>${prod.nombre}</h3>
      <p class="muted">${prod.descripcion}</p>
      <div class="actions">
        <span class="price">$${prod.precioCLP}</span>
        <button class="btn-outline add-to-cart" data-code="${prod.code}">Añadir</button>
      </div>
    `;
    featuredGrid.appendChild(article);
  });

  let cart = [];

const cartIcon = document.querySelector('.btn-icon'); // asegúrate que el carrito tenga esta clase
const cartPanel = document.getElementById('cart-panel');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Abrir carrito
cartIcon.addEventListener('click', () => {
  cartPanel.classList.add('active');
});

// Cerrar carrito
closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('active');
});

// Añadir productos
document.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart')) {
    const code = e.target.dataset.code;
    const product = PRODUCTS_HH.find(p => p.code === code);

    // Revisar si ya está en el carrito
    const existing = cart.find(item => item.code === code);
    if (existing) {
      existing.cantidad++;
    } else {
      cart.push({ ...product, cantidad: 1 });
    }

    renderCart();
  }
});

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.precioCLP * item.cantidad;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} 
      <span>$${item.precioCLP * item.cantidad}</span>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: $${total}`;
}



