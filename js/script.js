// js/script.js (ESM)

// ====== Imports ======
import { PRODUCTS_HH } from './productos_huerto.js';

// ====== Utilidades ======
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const fmtCLP = (n) => n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

// ====== State: Carrito (con persistencia) ======
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function cartItemCount() {
  return cart.reduce((acc, item) => acc + item.cantidad, 0);
}

// ====== DOM refs seguros (según página) ======
const featuredGrid = $('#featured-grid');      // Solo existe en index.html
const cartPanel   = $('#cart-panel');
const cartItems   = $('#cart-items');
const cartTotal   = $('#cart-total');
const cartCountEl = $('#cart-count');
const cartIconBtn = $('.btn-icon');
const closeCartBtn= $('#close-cart');

// Theme toggle (opcional)
const themeToggle = $('#theme-toggle');
const themeMenu   = $('#theme-menu');

// ====== Render ======
function renderCart() {
  if (!cartItems || !cartTotal) return; // Si no estamos en una página con carrito visible

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    const subtotal = item.precioCLP * item.cantidad;
    total += subtotal;

    li.innerHTML = `
      <span>${item.nombre} ×${item.cantidad}</span>
      <span>${fmtCLP(subtotal)}</span>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: ${fmtCLP(total)}`;
  updateCartCount();
  saveCart();
}

function updateCartCount() {
  if (!cartCountEl) return;
  cartCountEl.textContent = cartItemCount();
}

function renderFeatured() {
  // Solo para index.html
  if (!featuredGrid) return;

  // Toma 3 productos (puedes cambiar la lógica si quieres aleatorios)
  const destacados = PRODUCTS_HH.slice(0, 3);

  destacados.forEach(prod => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <div class="thumb">
        <img src="${prod.imagen}" alt="${prod.nombre}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">
      </div>
      <h3>${prod.nombre}</h3>
      <p class="muted">${prod.descripcion}</p>
      <div class="actions">
        <span class="price">${fmtCLP(prod.precioCLP)}</span>
        <button class="btn-outline" data-code="${prod.code}">Añadir</button>
      </div>
    `;
    featuredGrid.appendChild(article);
  });
}

// ====== Acciones de Carrito ======
function addToCartByCode(code) {
  const product = PRODUCTS_HH.find(p => p.code === code);
  if (!product) return;

  const existing = cart.find(item => item.code === code);
  if (existing) {
    existing.cantidad += 1;
  } else {
    cart.push({ ...product, cantidad: 1 });
  }
  renderCart();
}

function openCart() {
  if (!cartPanel) return;
  cartPanel.classList.add('active');
  cartPanel.classList.remove('hidden');
}

function closeCart() {
  if (!cartPanel) return;
  cartPanel.classList.remove('active');
}

// ====== Listeners globales ======
function attachGlobalListeners() {
  // Abrir carrito
  if (cartIconBtn) {
    cartIconBtn.addEventListener('click', openCart);
  }

  // Cerrar carrito
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCart);
  }

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartPanel?.classList.contains('active')) {
      closeCart();
    }
    if (e.key === 'Escape' && themeMenu?.classList.contains('show')) {
      themeMenu.classList.remove('show');
      themeToggle?.setAttribute('aria-expanded', 'false');
      themeToggle?.focus();
    }
  });

  // Añadir al carrito por delegación (botones con data-code)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-code]');
    if (btn) {
      const code = btn.dataset.code;
      if (code) addToCartByCode(code);
    }

    // Cerrar theme menu al click fuera
    if (themeToggle && themeMenu) {
      const clickInsideToggle = themeToggle.contains(e.target);
      const clickInsideMenu   = themeMenu.contains(e.target);
      if (themeMenu.classList.contains('show') && !clickInsideToggle && !clickInsideMenu) {
        themeMenu.classList.remove('show');
        themeToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Abrir/cerrar theme menu (si existe en el DOM)
  if (themeToggle && themeMenu) {
    themeToggle.addEventListener('click', () => {
      const isOpen = themeMenu.classList.toggle('show');
      themeToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
}

// ====== Init ======
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();   // Solo afecta index.html si #featured-grid existe
  renderCart();       // Reconstruye carrito (y contador) desde localStorage
  attachGlobalListeners();
});

//Abrir y cerrar modales de iniciar sesion y registrar usuario
document.getElementById("login-link").addEventListener("click", () => {
  document.getElementById("login-modal").classList.remove("hidden");
});

document.getElementById("register-link").addEventListener("click", () => {
  document.getElementById("register-modal").classList.remove("hidden");
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
