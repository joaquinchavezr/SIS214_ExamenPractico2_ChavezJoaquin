/**
 * menu.js — Menú hamburguesa responsivo (móvil y tablet).
 *
 * Conmuta la clase is_open del <nav> (que controla su visibilidad en CSS) y
 * actualiza aria-expanded en el botón para mantener la accesibilidad.
 */
const DESKTOP_QUERY = '(min-width: 1025px)';

export const initMenu = () => {
  const button = document.getElementById('menu_toggle');
  const nav = document.getElementById('main_nav');
  if (!button || !nav) return;

  const setOpen = (isOpen) => {
    nav.classList.toggle('is_open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
  };

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  // Cierra el menú al elegir una sección.
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  // Cierra con Escape y devuelve el foco al botón.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });

  // Al llegar a escritorio el menú es horizontal: se restablece el estado.
  window.matchMedia(DESKTOP_QUERY).addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
};
