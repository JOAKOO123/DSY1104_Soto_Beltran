// js/contacto.js
import { USUARIOS } from './usuarios.js';

(function () {
  const form   = document.getElementById('contactoForm');
  const nombre = document.getElementById('c-nombre');
  const email  = document.getElementById('c-email');
  const texto  = document.getElementById('c-mensaje');
  const msg    = document.getElementById('contacto-msg');

  // 🔒 Dominios permitidos (ajusta esta lista si quieres)
  const ALLOWED_DOMAINS = ['duocuc.cl'];

  const trim = (s) => String(s || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setMsg = (t, type) => {
    msg.textContent = t || '';
    msg.classList.remove('ok', 'error');
    if (type) msg.classList.add(type);
  };

  const mark = (el, invalid) => {
    if (!el) return;
    if (invalid) {
      el.classList.add('is-invalid');
      el.setAttribute('aria-invalid', 'true');
    } else {
      el.classList.remove('is-invalid');
      el.removeAttribute('aria-invalid');
    }
  };

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    setMsg('', '');

    const n  = trim(nombre.value);
    const em = trim(email.value).toLowerCase();
    const tx = trim(texto.value);

    // ——— Validaciones ———
    // Nombre: requerido, máx 100
    if (!n)            { setMsg('❌ Nombre requerido', 'error'); mark(nombre, true);  nombre.focus(); return; }
    if (n.length > 100){ setMsg('❌ El nombre debe tener máximo 100 caracteres', 'error'); mark(nombre, true); nombre.focus(); return; }
    mark(nombre, false);

    // Correo: requerido, máx 100, formato válido y dominio permitido
    if (!em)              { setMsg('❌ Correo requerido', 'error'); mark(email, true);  email.focus();  return; }
    if (em.length > 100)  { setMsg('❌ El correo debe tener máximo 100 caracteres', 'error'); mark(email, true); email.focus(); return; }
    if (!emailRegex.test(em)) { setMsg('❌ Correo inválido', 'error'); mark(email, true); email.focus(); return; }
    const domain = em.split('@')[1] || '';
    if (!ALLOWED_DOMAINS.includes(domain)) {
      setMsg(`❌ Dominio no permitido. Permitidos: ${ALLOWED_DOMAINS.join(', ')}`, 'error');
      mark(email, true); email.focus(); return;
    }
    mark(email, false);

    // Comentario: requerido
    if (!tx) { setMsg('❌ Comentario obligatorio', 'error'); mark(texto, true);  texto.focus(); return; }
    mark(texto, false);

    // ✅ EXTRA: el correo debe existir en la lista de usuarios
    const existe = Array.isArray(USUARIOS) && USUARIOS.some(
      u => String(u.correo || '').toLowerCase() === em
    );
    if (!existe) {
      setMsg('❌ Este correo no está registrado en HuertoHogar.', 'error');
      mark(email, true); email.focus(); return;
    }

    // ——— Envío simulado ———
    setMsg('✅ Mensaje enviado. ¡Gracias por contactarnos!', 'ok');

    // Opcional: simular “guardar” (solo para demo)
    try {
      const payload = { nombre: n, email: em, comentario: tx, ts: Date.now() };
      localStorage.setItem('contacto_last', JSON.stringify(payload));
    } catch {}

    form.reset();
  });
})();
