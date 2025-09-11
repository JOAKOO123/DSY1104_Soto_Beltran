// js/perfil.js
import { REGIONES_LIST, COMUNAS_POR_REGION } from './regiones_comunas.js';

(function () {
  const form     = document.getElementById('perfilForm');
  const msgEl    = document.getElementById('perfil-msg');
  const guardEl  = document.getElementById('perfil-guard');

  const nombre   = document.getElementById('p-nombre');
  const email    = document.getElementById('p-email');
  const telefono = document.getElementById('p-telefono');
  const region   = document.getElementById('p-region');
  const comuna   = document.getElementById('p-comuna');
  const resetBtn = document.getElementById('perfil-reset');

  // Claves de almacenamiento
  const SESSION_KEY = 'mitienda_user';
  const PROFILE_KEY = 'mitienda_user_profile';

  // Sesión actual
  const session = (() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
    catch { return null; }
  })();

  // Si no hay sesión, muestra aviso y oculta el form
  if (!session?.email) {
    if (form) form.style.display = 'none';
    if (guardEl) guardEl.style.display = 'block';
    return;
  }

  // ---------- Helpers de validación ----------
  const trim        = (s) => String(s || '').trim();
  const emailFmtOk  = (c) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trim(c)); // formato general
  const emailDuoc   = (c) => /@duocuc\.cl$/i.test(trim(c));             // dominio requerido
  const telRegex    = /^[\s\d()+-]{7,20}$/; // simple, opcional

  const setMsg = (text, type='') => {
    if (!msgEl) return;
    msgEl.textContent = text || '';
    msgEl.classList.remove('ok', 'error');
    if (type) msgEl.classList.add(type);
  };

  const mark = (el, invalid) => {
    if (!el) return;
    if (invalid) { el.classList.add('is-invalid'); el.setAttribute('aria-invalid','true'); }
    else { el.classList.remove('is-invalid'); el.removeAttribute('aria-invalid'); }
  };

  // ---------- Regiones / comunas ----------
  function fillRegiones() {
    region.innerHTML = `<option disabled selected>-- Seleccione la región --</option>`;
    REGIONES_LIST.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r; opt.textContent = r;
      region.appendChild(opt);
    });
  }

  function fillComunas(regionName, selected = '') {
    comuna.innerHTML = `<option disabled selected>-- Seleccione la comuna --</option>`;
    const list = COMUNAS_POR_REGION[regionName] || [];
    list.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      if (c === selected) opt.selected = true;
      comuna.appendChild(opt);
    });
  }

  function resetToEmpty() {
  // Limpia mensaje y marcas de error
  setMsg('');
  [nombre, email, telefono, region, comuna].forEach(el => mark(el, false));

  // Vacía campos
  nombre.value   = '';
  email.value    = '';         // si prefieres mantener el email de sesión:  session?.email || ''
  telefono.value = '';

  // Regiones y comunas en estado inicial (sin seleccionar)
  region.innerHTML = `<option disabled selected>-- Seleccione la región --</option>`;
  REGIONES_LIST.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r; opt.textContent = r;
    region.appendChild(opt);
  });

  comuna.innerHTML = `<option disabled selected>-- Seleccione la comuna --</option>`;
}


  // ---------- Carga inicial ----------
  function loadProfile() {
    fillRegiones();

    let profile = null;
    try { profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null'); }
    catch {}

    // Precarga desde perfil guardado o, al menos, email de la sesión
    nombre.value   = trim(profile?.nombre)   || '';
    email.value    = trim(profile?.email)    || trim(session.email) || '';
    telefono.value = trim(profile?.telefono) || '';

    if (profile?.region && REGIONES_LIST.includes(profile.region)) {
      region.value = profile.region;
      fillComunas(profile.region, profile.comuna || '');
    }

    region.addEventListener('change', () => {
      fillComunas(region.value, '');
    });
  }

  // ---------- Validación + guardado ----------
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    setMsg('');

    const n   = trim(nombre.value);
    const em  = trim(email.value).toLowerCase();
    const tel = trim(telefono.value);
    const rg  = region.value;
    const cm  = comuna.value;

    // Nombre: requerido, máx 100
    if (!n)                 { setMsg('❌ Nombre requerido','error');        mark(nombre,true);   nombre.focus(); return; }
    if (n.length > 100)     { setMsg('❌ Máximo 100 caracteres','error');    mark(nombre,true);   nombre.focus(); return; }
    mark(nombre,false);

    // Correo: requerido, máx 100, formato, dominio @duocuc.cl
    if (!em)                { setMsg('❌ Correo requerido','error');        mark(email,true);    email.focus();  return; }
    if (em.length > 100)    { setMsg('❌ El correo debe tener máximo 100 caracteres','error'); mark(email,true); email.focus(); return; }
    if (!emailFmtOk(em))    { setMsg('❌ Correo inválido','error');         mark(email,true);    email.focus();  return; }
    if (!emailDuoc(em))     { setMsg('❌ El correo debe ser institucional (@duocuc.cl)','error'); mark(email,true); email.focus(); return; }
    mark(email,false);

    // Teléfono: opcional, pero si viene debe cumplir regex simple
    if (tel && !telRegex.test(tel)) {
      setMsg('❌ Teléfono inválido','error'); mark(telefono,true); telefono.focus(); return;
    }
    mark(telefono,false);

    // Región / Comuna: requeridas
    if (!REGIONES_LIST.includes(rg))                   { setMsg('❌ Selecciona una región','error'); region.focus(); return; }
    if (!COMUNAS_POR_REGION[rg]?.includes(cm))         { setMsg('❌ Selecciona una comuna','error'); comuna.focus(); return; }

    // Guardar
    const payload = { nombre:n, email:em, telefono:tel, region:rg, comuna:cm, updatedAt: Date.now() };

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(payload));
      // Sincroniza el email en la "sesión"
      const sess = { ...(session||{}), email: em, ts: session?.ts || Date.now() };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sess));
      setMsg('✅ Datos actualizados con éxito.', 'ok');
    } catch {
      setMsg('❌ No se pudo guardar. Revisa permisos del navegador.', 'error');
    }
  });

  resetBtn?.addEventListener('click', () => {
  resetToEmpty();   // deja todo en blanco y selects sin elegir
});


  // Go!
  loadProfile();
})();
