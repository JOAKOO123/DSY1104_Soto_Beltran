// js/carrito.js
// Carrito con CRUD y persistencia en localStorage

const STORAGE_KEY = 'hh_cart_v1';

function safeParse(json, fallback) {
  try { return JSON.parse(json) ?? fallback; } catch { return fallback; }
}
const money = (n) => new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP'}).format(n);

export const Cart = {
  _items: [],           // [{code, name, price, qty, image?}]
  _subs: new Set(),

  // === Estado / persistencia ===
  load() {
    this._items = safeParse(localStorage.getItem(STORAGE_KEY), []);
    this._notify();
    return this._items;
  },
  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items));
  },

  // === API CRUD ===
  get(code) {
    return this._items.find(it => it.code === code);
  },
  add(item, qty = 1) {
    if (!item || !item.code) return;
    const q = Math.max(1, Number(qty) || 1);
    const cur = this.get(item.code);
    if (cur) {
      cur.qty += q;
    } else {
      this._items.push({
        code: item.code,
        name: item.name,
        price: Number(item.price) || 0,
        qty: q,
        image: item.image || ''
      });
    }
    this.save(); this._notify();
  },
  update(code, qty) {
    const it = this.get(code);
    if (!it) return;
    const q = Number(qty) || 0;
    if (q <= 0) {
      this.remove(code);
    } else {
      it.qty = q;
      this.save(); this._notify();
    }
  },
  remove(code) {
    this._items = this._items.filter(it => it.code !== code);
    this.save(); this._notify();
  },
  clear() {
    this._items = [];
    this.save(); this._notify();
  },

  // === Derivados ===
  count() { return this._items.reduce((a, it) => a + it.qty, 0); },
  total() { return this._items.reduce((a, it) => a + it.qty * it.price, 0); },

  // === Suscripción para actualizar UI ===
  subscribe(fn) { this._subs.add(fn); fn(this.snapshot()); return () => this._subs.delete(fn); },
  _notify() { const s = this.snapshot(); this._subs.forEach(fn => fn(s)); },
  snapshot() {
    return {
      items: this._items.map(it => ({...it, subtotal: it.qty * it.price})),
      count: this.count(),
      total: this.total()
    };
  }
};
