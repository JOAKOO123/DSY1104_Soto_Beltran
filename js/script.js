// Cerrar menú al hacer click fuera
document.addEventListener('click', function(e) {
  if (!themeToggle.contains(e.target) && !themeMenu.contains(e.target)) {
    themeMenu.classList.remove('show');
    themeToggle.setAttribute('aria-expanded', 'false');
  }
});

// Teclado: ESC para cerrar el menú
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && themeMenu.classList.contains('show')) {
    themeMenu.classList.remove('show');
    themeToggle.setAttribute('aria-expanded', 'false');
    themeToggle.focus();
  }
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
