/**
 * data.js — Datos originales de los proyectos.
 * Se congelan con Object.freeze() para garantizar su inmutabilidad: el filtro
 * nunca modifica esta colección, solo genera nuevas a partir de ella.
 */
export const categoryLabels = Object.freeze({
  web: 'Desarrollo web',
  datos: 'Base de datos',
});

export const projects = Object.freeze([
  Object.freeze({
    id: 'esports_db',
    title: 'Sistema de gestión de torneos de esports',
    category: 'datos',
    year: 2026,
    description:
      'Diseño e implementación de una base de datos relacional para la gestión de equipos, ' +
      'jugadores y torneos, con informe técnico formal. Desarrollado con MySQL.',
    tags: Object.freeze(['MySQL', 'SQL', 'Modelo relacional']),
  }),
  Object.freeze({
    id: 'gestor_academico',
    title: 'Gestor académico',
    category: 'web',
    year: 2026,
    description:
      'Diseño y desarrollo de un gestor académico para facilitar la inscripción de estudiantes, ' +
      'el inicio de sesión, la creación de cuentas y la validación de materias.',
    tags: Object.freeze(['Web', 'Autenticación', 'Formularios']),
  }),
  Object.freeze({
    id: 'cv_interactivo',
    title: 'CV interactivo',
    category: 'web',
    year: 2026,
    description:
      'Este mismo sitio: landing page responsiva con tema claro/oscuro, filtro de proyectos, ' +
      'formulario validado y consumo de la API de GitHub.',
    tags: Object.freeze(['HTML5', 'CSS3', 'JavaScript']),
  }),
]);
