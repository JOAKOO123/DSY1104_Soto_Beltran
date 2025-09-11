// js/script.js (ES Module)
import { PRODUCTS_HH } from './productos_huerto.js';

const $ = (s, r = document) => r.querySelector(s);

// Elementos que pueden (o no) existir según la página
const featuredGrid = $('#featured-grid');   // home
const cartPanel    = $('#cart-panel');
const cartItems    = $('#cart-items');
const cartTotal    = $('#cart-total');
const cartCountEl  = $('#cart-count');
const cartIconBtn  = $('.btn-icon');
const closeCartBtn = $('#close-cart');

// Opcionales (si existen en el HTML)
const clearCartBtn  = document.getElementById('clear-cart');
const feedbackEl    = document.getElementById('cart-feedback');
const confirmModal  = document.getElementById('confirm-modal');
const confirmYesBtn = document.getElementById('confirm-yes');
const confirmNoBtn  = document.getElementById('confirm-no');

let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let lastFocus = null;

const fmtCLP = n =>
  n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));
const count    = () => cart.reduce((a,i)=> a + i.cantidad, 0);

// ===== Utilidades: stock + feedback =====
const getStock = (code) => {
  const p = PRODUCTS_HH.find(x => x.code === code);
  return typeof p?.stock === 'number' ? p.stock : Infinity;
};

const toast = (msg, type='ok') => {
  if (!feedbackEl) return;
  feedbackEl.className = `cart-feedback ${type}`;
  feedbackEl.textContent = msg;
};

// ===== Sesión (login requerido para añadir) =====
const SESSION_KEY = 'mitienda_user';
const getSession  = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
};
const isLoggedIn  = () => !!getSession()?.email;

function requireLogin(){
  // aviso visual
  toast('Debes iniciar sesión para añadir productos.', 'warn');

  // si tienes modal de login en la página
  const loginModal = document.getElementById('login-modal');
  if (loginModal){
    loginModal.classList.remove('hidden');
    setTimeout(() => loginModal.querySelector('#correo-login, input[type="email"]')?.focus(), 50);
    return;
  }

  // si no, redirige a login y vuelve a donde estaba
  const next = `${location.pathname}${location.search}${location.hash}`;
  window.location.href = `./login.html?next=${encodeURIComponent(next)}`;
}

// ===== Carrito: render =====
function renderCart(){
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  if (!cart.length){
    cartItems.innerHTML = `<li class="muted">Tu carrito está vacío</li>`;
  }

  for (const item of cart){
    const subtotal = item.precioCLP * item.cantidad;
    total += subtotal;
    const stock = getStock(item.code);
    const disableInc = item.cantidad >= stock;
    const disableDec = item.cantidad <= 1;

    const li = document.createElement('li');
    li.setAttribute('data-code', item.code);
    li.innerHTML = `
      <div class="cart-left">
        <img class="cart-thumb" src="${item.imagen}" alt="${item.nombre}" width="56" height="56" loading="lazy">
        <div class="cart-info">
          <span class="item-name">${item.nombre}</span>
          <div class="cart-qty">
            <button class="cart-action" data-action="dec" data-code="${item.code}" aria-label="Restar 1" ${disableDec ? 'disabled' : ''}>−</button>
            <span class="qty" aria-live="polite">${item.cantidad}</span>
            <button class="cart-action" data-action="inc" data-code="${item.code}" aria-label="Sumar 1" ${disableInc ? 'disabled' : ''}>+</button>
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

// ===== Carrito: abrir/cerrar =====
function openCart(){
  if (!cartPanel) return;
  cartPanel.classList.add('active');
  cartPanel.classList.remove('hidden'); // por si venía oculta
  document.body.style.overflow = '';    // permitimos scroll
}

function closeCart(){
  if (!cartPanel) return;
  cartPanel.classList.remove('active');
  cartPanel.classList.add('hidden');
  document.body.style.overflow = '';
}

/* ===== API Carrito (CRUD + persistencia) ===== */
// alias a tu add existente
function cartAdd(code, qty = 1) {
  addToCart(code, qty);          // reutiliza tu lógica con stock + feedback
}

// actualizar cantidad (respeta stock y mínimo 1)
function cartUpdate(code, qty) {
  const it = cart.find(x => x.code === code);
  if (!it) return;
  const stock = getStock(code);
  const q = Math.min(Math.max(1, Number(qty) || 1), stock);
  it.cantidad = q;
  renderCart();
  toast('Cantidad actualizada.', 'ok');
}

// eliminar por code
function cartRemove(code) {
  cart = cart.filter(x => x.code !== code);
  renderCart();
  toast('Producto eliminado del carrito.', 'ok');
}

// vaciar por completo
function cartClear() {
  cart = [];
  renderCart();
  toast('Carrito vaciado.', 'ok');
}

// (opcional) expón para debug en consola
window.CartAPI = { add: cartAdd, update: cartUpdate, remove: cartRemove, clear: cartClear };


// ===== Carrito: añadir =====
function addToCart(code, qty = 1){
  // ⛔ Requiere sesión antes de poder añadir
  if (!isLoggedIn()){
    requireLogin();
    return;
  }

  if (qty <= 0){
    toast('La cantidad debe ser al menos 1.', 'error');
    return;
  }
  const p = PRODUCTS_HH?.find(x => x.code === code);
  if (!p) return;

  const stock   = getStock(code);
  const ex      = cart.find(x => x.code === code);
  const current = ex ? ex.cantidad : 0;
  const desired = current + qty;

  if (desired > stock){
    const canAdd = Math.max(0, stock - current);
    if (canAdd > 0){
      if (ex) ex.cantidad += canAdd; else cart.push({ ...p, cantidad: canAdd });
      renderCart();
      toast(`Solo hay ${stock} en stock. Se añadieron ${canAdd}.`, 'warn');
    } else {
      toast('No hay más stock disponible.', 'error');
    }
    openCart();
    return;
  }

  if (ex) ex.cantidad += qty; else cart.push({ ...p, cantidad: qty });
  renderCart();
  toast('Producto añadido al carrito.', 'ok');
  openCart();
}


// ===== Home: destacados por rating =====
function renderFeatured(){
  if (!featuredGrid || !Array.isArray(PRODUCTS_HH)) return;
  featuredGrid.innerHTML = '';

  const top = [...PRODUCTS_HH]
    .sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviews ?? 0) - (a.reviews ?? 0))
    .slice(0, 3);

  top.forEach(prod => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <a class="card-link" href="producto.html?code=${prod.code}" aria-label="Ver ${prod.nombre}">
        <div class="thumb">
          <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy"
               style="width:100%;height:100%;object-fit:cover;border-radius:12px;">
        </div>
        <h3>${prod.nombre}</h3>
      </a>

      <div class="rating-row">
        <span class="star-rating" style="--rating:${prod.rating ?? 0}"></span>
        <span>${(prod.rating ?? 0).toFixed(1)} · ${prod.reviews ?? 0} reseñas</span>
      </div>

      <p class="muted">${prod.descripcion}</p>
      <div class="actions">
        <span class="price">${fmtCLP(prod.precioCLP)}</span>
        <button class="btn-outline" data-code="${prod.code}">Añadir</button>
      </div>`;
    featuredGrid.appendChild(article);
  });
}

// ===== Home: hero destacado =====
function renderHeroFeatured(){
  const heroBox = document.querySelector('.hero-visual');
  if (!heroBox || !Array.isArray(PRODUCTS_HH) || !PRODUCTS_HH.length) return;
  const p = PRODUCTS_HH[Math.floor(Math.random() * PRODUCTS_HH.length)];

  heroBox.innerHTML = `
    <a class="hero-card" href="producto.html?code=${p.code}" aria-label="Ver ${p.nombre}">
      <div class="hero-card__img">
        <img src="${p.imagen}" alt="${p.nombre}" loading="eager">
      </div>
      <div class="hero-card__body">
        <span class="badge-small">Producto destacado</span>
        <h3>${p.nombre}</h3>
        <p class="price">${fmtCLP(p.precioCLP)} <span class="unit">/ ${p.unidad}</span></p>
        <span class="cta-link">Ver detalle →</span>
      </div>
    </a>
  `;
}

// ===== Listeners globales =====
function attach(){
  if (cartIconBtn)  cartIconBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

  // Delegación de clicks
  document.addEventListener('click', (e) => {
    // Acciones dentro del carrito ( + / − / eliminar )
const actionBtn = e.target.closest('[data-action]');
if (actionBtn) {
  const { action, code } = actionBtn.dataset; // "inc" | "dec" | "remove"
  const it = cart.find(x => x.code === code);
  if (!it) return;

  if (action === 'inc') {
    cartUpdate(code, it.cantidad + 1);
  } else if (action === 'dec') {
    cartUpdate(code, it.cantidad - 1);
  } else if (action === 'remove') {
    cartRemove(code);
  }
  return; // no continuar a "añadir"
}


    // Añadir al carrito (evita botones del propio carrito)
    const addBtn = e.target.closest('[data-code]');
    if (addBtn && !addBtn.hasAttribute('data-action')) {
      const qty = Math.max(1, parseInt(addBtn.dataset.qty || '1', 10));
      cartAdd(addBtn.dataset.code, qty);

    }
  });

  // Header sombra al hacer scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Confirmación "Vaciar carrito"
  if (clearCartBtn){
    clearCartBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (confirmModal){
        lastFocus = document.activeElement;
        confirmModal.classList.remove('hidden');
        confirmYesBtn?.focus();

        const onYes = () => {
          cartClear();
          toast('Carrito vaciado.', 'ok');
          confirmModal.classList.add('hidden');
          lastFocus?.focus();
          confirmYesBtn?.removeEventListener('click', onYes);
        };
        const onNo = () => {
          confirmModal.classList.add('hidden');
          lastFocus?.focus();
          confirmNoBtn?.removeEventListener('click', onNo);
        };

        confirmYesBtn?.addEventListener('click', onYes, { once: true });
        confirmNoBtn?.addEventListener('click', onNo, { once: true });

        const backdropClose = (e) => {
          if (e.target === confirmModal){
            confirmModal.classList.add('hidden');
            lastFocus?.focus();
            confirmModal.removeEventListener('click', backdropClose);
          }
        };
        confirmModal.addEventListener('click', backdropClose);

        const escToClose = (ev2) => {
          if (ev2.key === 'Escape' && !confirmModal.classList.contains('hidden')){
            confirmModal.classList.add('hidden');
            lastFocus?.focus();
            document.removeEventListener('keydown', escToClose);
          }
        };
        document.addEventListener('keydown', escToClose);
      } else {
        if (window.confirm('¿Seguro que deseas vaciar el carrito?')){
          cartClear();
        }

      }
    });
  }

  // (Opcional) Modales de login/registro si existen
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const loginModal = document.getElementById('login-modal');
  const registerModal = document.getElementById('register-modal');

  if (loginLink && loginModal) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.classList.remove('hidden');
    });
  }
  if (registerLink && registerModal) {
    registerLink.addEventListener('click', (e) => {
      e.preventDefault();
      registerModal.classList.remove('hidden');
    });
  }
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });
}

// ===== Catálogo: render + filtros + orden + tabs (solo en productos.html) =====
function initCatalogoFilters(){
  const grid        = document.getElementById('productos-grid');
  if (!grid) return; // solo corre en productos.html

  
  const resultCount = document.getElementById('result-count');
  const searchInput = document.getElementById('search');
  const orderSelect = document.getElementById('order');
  const catChecks   = Array.from(document.querySelectorAll('input[name="cat"]'));
  const clearBtn    = document.getElementById('clear-filters');
  const tabBar      = document.querySelector('.cat-tabs');
  const pagerEl     = document.getElementById('pager');

  const PAGE_SIZE = 12;

  const params = new URLSearchParams(location.search);
  const initialCat = params.get('cat');               // FR | VR | PO | PL | null
  const initialQ   = params.get('q') || '';
  const initialPg  = Math.max(1, parseInt(params.get('page') || '1', 10));

  // helpers
  const norm = s => (s || '').toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const debounce = (fn, delay = 250) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), delay); }; };
  const stableSortByPrice = (list, dir='asc') => {
    const mul = dir==='asc' ? 1 : -1;
    return list
      .map((item, idx) => ({ item, idx }))
      .sort((a, b) => {
        const diff = ((a.item.precioCLP ?? 0) - (b.item.precioCLP ?? 0)) * mul;
        return diff !== 0 ? diff : a.idx - b.idx; // orden estable
      })
      .map(x => x.item);
  };

  const state = {
    q: initialQ,
    cats: new Set(),
    order: 'priceAsc',
    page: initialPg
  };

  // UI inicial desde la URL
  if (initialCat) {
    const match = catChecks.find(c => c.value === initialCat);
    if (match) { match.checked = true; state.cats.add(initialCat); }
  }
  if (searchInput) searchInput.value = state.q;
  if (orderSelect) orderSelect.value = state.order;

  function applyFilters(){
    const qn = norm(state.q);
    let list = PRODUCTS_HH;

    if (state.cats.size) {
      list = list.filter(p => state.cats.has(p.categoriaId));
    }
    if (qn) {
      list = list.filter(p => norm(p.nombre).includes(qn) || p.code.toLowerCase().includes(qn));
    }
    list = state.order === 'priceAsc'
      ? stableSortByPrice(list, 'asc')
      : stableSortByPrice(list, 'desc');

    return list;
  }

  function renderList(allItems){
    // clamp de página
    const totalPages = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = allItems.slice(start, start + PAGE_SIZE);

    grid.innerHTML = '';
    if (!pageItems.length){
      grid.innerHTML = `<p class="muted">No hay resultados para los filtros seleccionados.</p>`;
      resultCount && (resultCount.textContent = `0 productos`);
      renderPager(0, 0); // limpia la paginación
      return;
    }

    pageItems.forEach(prod => {
      const article = document.createElement('article');
      article.classList.add('producto');
      article.innerHTML = `
        <a class="prod-click" href="producto.html?code=${prod.code}" aria-label="Ver ${prod.nombre}">
          <div class="thumb">
            <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy" />
          </div>
          <h2>${prod.nombre}</h2>
        </a>

        <div class="rating-row" title="${(prod.rating ?? 0).toFixed(1)} de 5">
          <span class="star-rating" style="--rating:${prod.rating ?? 0}"></span>
          <span>${(prod.rating ?? 0).toFixed(1)} · ${prod.reviews ?? 0}</span>
        </div>

        <p>${prod.descripcion}</p>
        <p class="precio">${fmtCLP(prod.precioCLP)} / ${prod.unidad}</p>
        <button data-code="${prod.code}">Añadir al carrito</button>
      `;
      grid.appendChild(article);
    });

    // "x–y de N" o "N productos"
    const from = start + 1;
    const to   = start + pageItems.length;
    resultCount && (resultCount.textContent =
      allItems.length > PAGE_SIZE
        ? `${from}–${to} de ${allItems.length} productos`
        : `${allItems.length} producto${allItems.length === 1 ? '' : 's'}`
    );

    renderPager(state.page, Math.ceil(allItems.length / PAGE_SIZE));
  }

  function renderPager(current, totalPages){
    if (!pagerEl) return;
    if (!totalPages || totalPages <= 1){
      pagerEl.innerHTML = '';
      return;
    }

    let html = '';
    html += `<button type="button" data-page="${current-1}" ${current<=1?'disabled':''} aria-label="Página anterior">‹</button>`;

    // páginas (simple: todas; si quieres, puedes hacer ventana 1..total)
    for (let p = 1; p <= totalPages; p++){
      html += `<button type="button" data-page="${p}" class="${p===current?'is-active':''}" aria-current="${p===current?'page':''}">${p}</button>`;
    }

    html += `<button type="button" data-page="${current+1}" ${current>=totalPages?'disabled':''} aria-label="Página siguiente">›</button>`;
    pagerEl.innerHTML = html;

    pagerEl.onclick = (e) => {
      const btn = e.target.closest('button[data-page]');
      if (!btn) return;
      const next = parseInt(btn.dataset.page, 10);
      if (Number.isNaN(next) || next < 1 || next > totalPages) return;
      state.page = next;
      refresh(true);
    };
  }


  function updateURLFromState(){
    const url = new URL(location.href);
    if (state.cats.size === 1) url.searchParams.set('cat', [...state.cats][0]);
    else url.searchParams.delete('cat');

    state.q ? url.searchParams.set('q', state.q) : url.searchParams.delete('q');

    state.page > 1 ? url.searchParams.set('page', String(state.page)) : url.searchParams.delete('page');

    history.replaceState({}, '', url);
  }

  function syncTabsWithState(){
    if (!tabBar) return;
    const active = state.cats.size === 1 ? [...state.cats][0] : '';
    tabBar.querySelectorAll('.tab').forEach(t =>
      t.classList.toggle('is-active', t.dataset.cat === active)
    );
  }

  function refresh(scrolling = false){
    const all = applyFilters();
    renderList(all);
    updateURLFromState();
    syncTabsWithState();

    // scroll al inicio del grid al cambiar de página
    if (scrolling) {
      const y = grid.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // Tabs
  if (tabBar){
    tabBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab');
      if (!btn) return;
      const cat = btn.dataset.cat; // "" => Todos
      state.cats.clear();
      if (cat) state.cats.add(cat);

      // Sync checkboxes
      catChecks.forEach(c => (c.checked = state.cats.has(c.value)));

      state.page = 1;
      refresh();
    });
  }

  // Listeners
  if (searchInput){
    searchInput.addEventListener('input', debounce(e => {
      state.q = e.target.value.trim();
      state.page = 1;
      refresh();
    }, 250));
  }

  if (orderSelect){
    orderSelect.addEventListener('change', () => {
      state.order = orderSelect.value; // priceAsc | priceDesc
      state.page = 1;
      refresh();
    });
  }

  catChecks.forEach(chk => {
    chk.addEventListener('change', () => {
      if (chk.checked) state.cats.add(chk.value);
      else state.cats.delete(chk.value);
      state.page = 1;
      refresh();
    });
  });

  if (clearBtn){
    clearBtn.addEventListener('click', () => {
      state.q = '';
      state.cats.clear();
      state.order = 'priceAsc';
      state.page = 1;
      if (searchInput)  searchInput.value = '';
      if (orderSelect)  orderSelect.value = 'priceAsc';
      catChecks.forEach(c => (c.checked = false));
      refresh();
    });
  }

  // Primer render
  refresh();
}
// ===== ÚNICO init =====
function init(){
  renderFeatured();       // Home (si no existe, no hace nada)
  renderHeroFeatured();   // Home (si no existe, no hace nada)
  renderCart();           // Reconstruye carrito desde localStorage
  attach();               // Listeners globales
  initCatalogoFilters();  // Catálogo (solo corre en productos.html si existe el grid)
}

// Ejecutar al cargar el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
  function syncAccountLinks() {
  const perfil   = document.getElementById('link-perfil');
  const login    = document.getElementById('link-login');
  const registro = document.getElementById('link-registro');
  const logout   = document.getElementById('link-logout');

  let session = null;
  try { session = JSON.parse(localStorage.getItem('mitienda_user') || 'null'); } catch {}
  const logged = !!session?.email;

  // Mostrar/Ocultar
  if (logged) {
    perfil?.classList.remove('hidden');
    logout?.classList.remove('hidden');
    login?.classList.add('hidden');
    registro?.classList.add('hidden');
  } else {
    perfil?.classList.add('hidden');
    logout?.classList.add('hidden');
    login?.classList.remove('hidden');
    registro?.classList.remove('hidden');
  }

  // Cerrar sesión
  logout?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('mitienda_user');
    // (opcional) también: localStorage.removeItem('mitienda_user_profile');
    location.reload(); // refresca para que se oculte "Perfil"
  }, { once: true });
}

// Llama a esto dentro de init()
function init(){
  renderFeatured();
  renderHeroFeatured();
  renderCart();
  attach();
  initCatalogoFilters();
  syncAccountLinks();   // <<--- AÑADE ESTA LÍNEA
}


  
}
