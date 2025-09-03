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
