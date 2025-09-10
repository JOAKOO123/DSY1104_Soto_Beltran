/// js/registro.js
import { REGIONES_LIST, COMUNAS_POR_REGION } from "./regiones_comunas.js";

const form         = document.getElementById("registroForm");
const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");
const mensaje      = document.getElementById("mensaje");
// 🔹 nuevos campos
const pass  = document.getElementById("password");
const pass2 = document.getElementById("password2");

// Deshabilitar comuna hasta elegir región (UX)
comunaSelect.disabled = true;

// === 1. Cargar las regiones al iniciar ===
REGIONES_LIST.forEach(region => {
  const option = document.createElement("option");
  option.value = region;
  option.textContent = region;
  regionSelect.appendChild(option);
});

// === 2. Cuando cambia la región, mostrar comunas ===
regionSelect.addEventListener("change", () => {
  const regionSeleccionada = regionSelect.value;

  // limpiar comunas anteriores
  comunaSelect.innerHTML = `<option value="">Seleccione comuna</option>`;

  const comunas = COMUNAS_POR_REGION[regionSeleccionada];
  if (regionSeleccionada && Array.isArray(comunas)) {
    // Habilitar el select
    comunaSelect.disabled = false;

    // (opcional) orden alfabético
    comunas.slice().sort().forEach(comuna => {
      const option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      comunaSelect.appendChild(option);
    });
  } else {
    // Si no hay región válida, mantenerlo deshabilitado
    comunaSelect.disabled = true;
  }
});

// === helpers de validación/mensajes ===
function setMsg(text, color) {
  if (!mensaje) return;
  mensaje.textContent = text || "";
  mensaje.style.color = color || "";
}

function validarRUN(run) {
  // solo números de 7 a 9 dígitos (sin puntos ni guion)
  return /^\d{7,9}$/.test(String(run).trim());
}

function validarCorreo(correo) {
  return /^[^\s@]+@duocuc\.cl$/i.test(String(correo).trim().toLowerCase());
}

function esMayorDeEdad(fechaNacimiento) {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  const edad = hoy.getFullYear() - fechaNac.getFullYear();
  const m = hoy.getMonth() - fechaNac.getMonth();
  return edad > 18 || (edad === 18 && m >= 0);
}

function validarPassword(p) {
  const n = String(p || "").length;
  return n >= 4 && n <= 10;
}

// Limpia el mensaje mientras se escribe
form?.addEventListener("input", () => setMsg("", ""));

// === 4. Manejo del formulario ===
form.addEventListener("submit", e => {
  e.preventDefault();

  const run             = document.getElementById("run").value.trim();
  const nombre          = document.getElementById("nombre").value.trim();
  const apellidos       = document.getElementById("apellidos").value.trim();
  const correo          = document.getElementById("correo").value.trim();
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const region          = regionSelect.value;
  const comuna          = comunaSelect.value;
  const password        = pass?.value || "";
  const confirm         = pass2?.value || "";

  // Validaciones (en orden)
  if (!validarRUN(run)) {
    setMsg("❌ RUN inválido. Debe tener 7 a 9 dígitos numéricos (sin puntos ni guion)", "red");
    return;
  }

  if (!nombre || !apellidos) {
    setMsg("❌ Nombre y apellidos son obligatorios.", "red");
    return;
  }

  if (!validarCorreo(correo)) {
    setMsg("❌ Solo se permiten correos institucionales que terminen en @duocuc.cl.", "red");
    return;
  }
  
 if (!validarPassword(password)) {
    setMsg("❌ La contraseña debe tener entre 4 y 10 caracteres.", "red");
    return;
  }

  if (password !== confirm) {
    setMsg("❌ Las contraseñas no coinciden.", "red");
    return;
  }

  if (!esMayorDeEdad(fechaNacimiento)) {
    setMsg("❌ Debes ser mayor de 18 años para registrarte.", "red");
    return;
  }

  if (!region || !comuna) {
    setMsg("❌ Debes seleccionar región y comuna.", "red");
    return;
  }

 
  // ✅ Si pasa todas las validaciones
  setMsg("✅ Registro exitoso.", "green");

  // Prefill del email y redirección al login
  try { localStorage.setItem("prefill_email", correo.toLowerCase()); } catch {}
  setTimeout(() => { window.location.href = "./login.html?registro=ok"; }, 700);

  // (Si NO redirigieras, podrías resetear el form)
  // form.reset();
  // comunaSelect.innerHTML = `<option value="">Seleccione comuna</option>`;
  // comunaSelect.disabled = true;

  // (Opcional) enviar al servidor con fetch()
  console.log({
    run, nombre, apellidos, correo, fechaNacimiento, region, comuna
    // contraseña NO se loguea por seguridad
  });
});
