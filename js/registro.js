// registro.js
import { REGIONES_LIST, COMUNAS_POR_REGION } from "./regiones_comunas.js";

const form = document.getElementById("registroForm");
const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");
const mensaje = document.getElementById("mensaje");

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

// === 3. Validaciones ===
function validarRUN(run) {
  return /^\d{7,8}$/.test(run); // solo números de 7 u 8 dígitos
}

function validarCorreo(correo) {
  return /^[^\s@]+@duocuc\.cl$/.test(correo.toLowerCase());
}


function esMayorDeEdad(fechaNacimiento) {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  const edad = hoy.getFullYear() - fechaNac.getFullYear();
  const m = hoy.getMonth() - fechaNac.getMonth();
  return edad > 18 || (edad === 18 && m >= 0);
}

// === 4. Manejo del formulario ===
form.addEventListener("submit", e => {
  e.preventDefault();

  const run = document.getElementById("run").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const region = regionSelect.value;
  const comuna = comunaSelect.value;

  // Validaciones
  if (!validarRUN(run)) {
    mensaje.textContent = "❌ RUN inválido. Debe tener 7 u 8 dígitos numéricos.";
    mensaje.style.color = "red";
    return;
  }

  if (!nombre || !apellidos) {
    mensaje.textContent = "❌ Nombre y apellidos son obligatorios.";
    mensaje.style.color = "red";
    return;
  }

 if (!validarCorreo(correo)) {
  mensaje.textContent = "❌ Solo se permiten correos institucionales que terminen en @duocuc.cl.";
  mensaje.style.color = "red";
  return;
}


  if (!esMayorDeEdad(fechaNacimiento)) {
    mensaje.textContent = "❌ Debes ser mayor de 18 años para registrarte.";
    mensaje.style.color = "red";
    return;
  }

  if (!region || !comuna) {
    mensaje.textContent = "❌ Debes seleccionar región y comuna.";
    mensaje.style.color = "red";
    return;
  }

  // Si pasa todas las validaciones
  mensaje.textContent = "✅ Registro exitoso.";
  mensaje.style.color = "green";

  // Aquí podrías enviar los datos al servidor con fetch()
  console.log({
    run,
    nombre,
    apellidos,
    correo,
    fechaNacimiento,
    region,
    comuna
  });

  form.reset();
  comunaSelect.innerHTML = `<option value="">Seleccione comuna</option>`;
  comunaSelect.disabled = true;
});
