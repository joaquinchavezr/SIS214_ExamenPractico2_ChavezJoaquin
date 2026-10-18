/**
 * main.js — Punto de entrada de la aplicación.
 * Cada funcionalidad vive en su propio módulo ES6 y se inicializa desde aquí.
 * Los módulos se cargan con type="module", por lo que el DOM ya está disponible.
 */
import { initTheme } from './theme.js';
import { initMenu } from './menu.js';
import { initProjectFilter } from './filter.js';
import { initContactForm } from './form.js';

initTheme();
initMenu();
initProjectFilter();
initContactForm();
