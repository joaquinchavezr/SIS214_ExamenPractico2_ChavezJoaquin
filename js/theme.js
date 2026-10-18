/**
 * theme.js — Conmutador de tema claro / oscuro.
 *
 * Alterna el atributo data-theme del elemento <html> y guarda la preferencia
 * en localStorage como un objeto JSON (JSON.stringify) que se restaura al
 * recargar la página (JSON.parse).
 */
const STORAGE_KEY = 'cv_preferences';
const VALID_THEMES = ['light', 'dark'];

/** Lee y deserializa las preferencias guardadas; devuelve null si no hay o fallan. */
const readPreferences = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('No se pudo leer la preferencia de tema:', error);
    return null;
  }
};

/** Serializa y guarda las preferencias. */
const savePreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('No se pudo guardar la preferencia de tema:', error);
  }
};

/** Tema guardado o, en su defecto, el que prefiere el sistema operativo. */
const getInitialTheme = () => {
  const stored = readPreferences();
  if (stored && VALID_THEMES.includes(stored.theme)) {
    return stored.theme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Aplica el tema al documento y sincroniza el estado accesible del botón. */
const applyTheme = (theme, button) => {
  document.documentElement.setAttribute('data-theme', theme);
  button.setAttribute('aria-pressed', String(theme === 'dark'));
};

export const initTheme = () => {
  const button = document.getElementById('theme_toggle');
  if (!button) return;

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme, button);

  button.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme, button);
    savePreferences({ theme: currentTheme });
  });
};
