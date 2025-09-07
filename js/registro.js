import { REGIONES } from "./regiones_comunas.js";

const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");
const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

// Cargar regiones en el select
Object.keys(REGIONES).forEach(r => {
  const opt = document.createElement("option");
  opt.value = r;
  opt.textContent = r;
  regionSelect.appendChild(opt);
});

// Cargar comunas cuando cambia región
regionSelect.addEventListener("change", e => {
  comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
  REGIONES[e.target.value].forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    comunaSelect.appendChild(opt);
  });
});

// === Validador RUN (con DV, sin puntos ni guion) ===
function validarRUN(run) {
  if (!/^\d{7,9}[0-9kK]$/.test(run)) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1).toLowerCase();

  let suma = 0, multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(cuerpo[i]);
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? "0" : resto === 10 ? "k" : String(resto);

  return dv === dvEsperado;
}

// Validaciones en el submit
form.addEventListener("submit", e => {
  e.preventDefault();

  const run = document.getElementById("run").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if (!validarRUN(run)) {
    mensaje.textContent = "❌ RUN inválido (verifique dígito verificador)";
    mensaje.style.color = "red";
    return;
  }

  if (correo.length > 100) {
    mensaje.textContent = "❌ El correo excede 100 caracteres";
    mensaje.style.color = "red";
    return;
  }

  mensaje.textContent = "✅ Registro exitoso";
  mensaje.style.color = "green";
});

import { REGIONES } from "./regiones_comunas.js";

const modal = document.getElementById("modalRegistro");
const btnRegister = document.getElementById("btnRegister");
const closeModal = document.getElementById("closeModal");

// Abrir modal
btnRegister.addEventListener("click", () => {
  modal.style.display = "block";
});

// Cerrar modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar si hace clic fuera del modal
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});