// js/login.js
(function () {
  const form  = document.getElementById('loginForm');
  const email = document.getElementById('correo-login');
  const pass  = document.getElementById('contrasena-login');
  const msg   = document.getElementById('login-mensaje');

  const trim = (s) => String(s || '').trim();
  const isEmpty = (s) => trim(s) === '';
  const emailFmtOk = (c) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trim(c));  // formato general
  const emailDuoc  = (c) => /@duocuc\.cl$/i.test(trim(c));              // dominio requerido
  const passLenOk  = (p) => { const n = String(p).length; return n >= 4 && n <= 10; };

  const setMsg = (text, type) => {
    msg.textContent = text;
    msg.classList.remove('error','ok');
    if (type) msg.classList.add(type);
  };
  const clearMsg = () => setMsg('', '');

  // 🔹 PREFILL y mensaje cuando vienes desde registro
  try {
    const params = new URLSearchParams(window.location.search);
    const pre = localStorage.getItem('prefill_email');
    if (pre) {
      email.value = pre;                // pre-cargar email
      localStorage.removeItem('prefill_email');
    }
    if (params.get('registro') === 'ok') {
      setMsg('✅ Registro exitoso. Ahora inicia sesión.', 'ok');
    }
  } catch {}

  // limpiar mensaje mientras escribe
  email?.addEventListener('input', clearMsg);
  pass?.addEventListener('input',  clearMsg);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMsg();

    const eVal = trim(email.value);
    const pVal = String(pass.value);

    // si ambos campos están vacíos
    if (isEmpty(eVal) && isEmpty(pVal)) {
      setMsg('Campos requeridos', 'error');
      email.focus();
      return;
    }

    // Validaciones en orden
    if (isEmpty(eVal)) {
      setMsg('Email requerido', 'error'); email.focus(); return;
    }
    if (eVal.length > 100) {
      setMsg('El email debe tener máximo 100 caracteres', 'error'); email.focus(); return;
    }
    if (!emailFmtOk(eVal)) {
      setMsg('Correo inválido', 'error'); email.focus(); return;
    }
    if (!emailDuoc(eVal)) {
      setMsg('El correo debe ser institucional (@duocuc.cl)', 'error'); email.focus(); return;
    }
    if (!passLenOk(pVal)) {
      setMsg('Contraseña debe tener entre 4 y 10 caracteres', 'error'); pass.focus(); return;
    }

    // ✅ Éxito
    setMsg('✅ Inicio de sesión exitoso.', 'ok');

    // Guardar "sesión" (demo sin backend) y volver al Home
    try {
      localStorage.setItem('mitienda_user', JSON.stringify({ email: eVal, ts: Date.now() }));
    } catch {}
    setTimeout(() => { window.location.href = './'; }, 700);
  });
})();
