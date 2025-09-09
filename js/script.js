// js/script.js (ES Module)
import { PRODUCTS_HH } from './productos_huerto.js';

const $ = (s, r = document) => r.querySelector(s);

const featuredGrid = $('#featured-grid');   // home
const cartPanel    = $('#cart-panel');
const cartItems    = $('#cart-items');
const cartTotal    = $('#cart-total');
const cartCountEl  = $('#cart-count');
const cartIconBtn  = $('.btn-icon');
const closeCartBtn = $('#close-cart');

let cart = JSON.parse(localStorage.getItem('cart') || '[]');
const fmtCLP = n => n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); }
function count(){ return cart.reduce((a,i)=>a+i.cantidad,0); }

function renderCart(){
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  for (const item of cart){
    const subtotal = item.precioCLP * item.cantidad;
    total += subtotal;

    const li = document.createElement('li');
    li.setAttribute('data-code', item.code);
    li.innerHTML = `
      <div class="cart-left">
        <img class="cart-thumb" src="${item.imagen}" alt="${item.nombre}" width="56" height="56" loading="lazy">
        <div class="cart-info">
          <span class="item-name">${item.nombre}</span>
          <div class="cart-qty">
            <button class="cart-action" data-action="dec" data-code="${item.code}" aria-label="Restar 1">−</button>
            <span class="qty" aria-live="polite">${item.cantidad}</span>
            <button class="cart-action" data-action="inc" data-code="${item.code}" aria-label="Sumar 1">+</button>
            <button class="cart-action remove" data-action="remove" data-code="${item.code}" aria-label="Eliminar ${item.nombre}">✕</button>
          </div>
        </div>
      </div>
      <span class="line-total">${fmtCLP(subtotal)}</span>
    `;
    cartItems.appendChild(li);
  }

  cartTotal.textContent = `Total: ${fmtCLP(total)}`;
  if (cartCountEl) cartCountEl.textContent = count();
  saveCart();
}



function addToCart(code){
  const p = PRODUCTS_HH?.find(x => x.code === code);
  if (!p) return;
  const ex = cart.find(x => x.code === code);
  if (ex) ex.cantidad += 1; else cart.push({ ...p, cantidad: 1 });
  renderCart();
  openCart();
}

function renderFeatured(){
  if (!featuredGrid || !Array.isArray(PRODUCTS_HH)) return;
  featuredGrid.innerHTML = '';
  PRODUCTS_HH.slice(0, 3).forEach(prod => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <div class="thumb">
        <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">
      </div>
      <h3>${prod.nombre}</h3>
      <p class="muted">${prod.descripcion}</p>
      <div class="actions">
        <span class="price">${fmtCLP(prod.precioCLP)}</span>
        <button class="btn-outline" data-code="${prod.code}">Añadir</button>
      </div>`;
    featuredGrid.appendChild(article);
  });
}

function openCart(){
  if (!cartPanel) return;
  cartPanel.classList.add('active');
  cartPanel.classList.remove('hidden');   // ⭐️ clave: quita hidden al abrir
}

function closeCart(){
  if (!cartPanel) return;
  cartPanel.classList.remove('active');
  cartPanel.classList.add('hidden');      // ⭐️ clave: vuelve a ocultar
  document.body.style.overflow = '';
}

function attach(){
  if (cartIconBtn)  cartIconBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

  // Delegación: cualquier botón con data-code añade al carrito
 document.addEventListener('click', (e) => {
  // Acciones dentro del carrito: inc / dec / remove
  const actionBtn = e.target.closest('[data-action]');
  if (actionBtn) {
    const action = actionBtn.dataset.action;  // "inc" | "dec" | "remove"
    const code   = actionBtn.dataset.code;

    const idx = cart.findIndex(x => x.code === code);
    if (idx !== -1) {
      if (action === 'inc') {
        cart[idx].cantidad += 1;
      } else if (action === 'dec') {
        cart[idx].cantidad = Math.max(0, cart[idx].cantidad - 1);
        if (cart[idx].cantidad === 0) cart.splice(idx, 1);
      } else if (action === 'remove') {
        cart.splice(idx, 1);
      }
      renderCart();
    }
    return; // ¡importante! no seguir a "añadir"
  }

  // Añadir al carrito (evita capturar los botones del carrito)
  const addBtn = e.target.closest('[data-code]');
  if (addBtn && !addBtn.hasAttribute('data-action')) {
    addToCart(addBtn.dataset.code);
  }
});


  // Header con sombra al hacer scroll (opcional)
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
}

function init(){
  renderFeatured();   // Home
  renderCart();       // Reconstruye carrito desde localStorage
  attach();           // Listeners
}

// Ejecuta init incluso si DOMContentLoaded ya pasó
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

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
