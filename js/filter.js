/**
 * filter.js — Buscador / filtro de proyectos en tiempo real.
 *
 * Los datos originales (data.js) son inmutables. Cada evento de entrada
 * procesa la colección con una tubería funcional: .filter() -> .filter() -> .map(),
 * que devuelve un arreglo nuevo sin alterar el original.
 */
import { projects, categoryLabels } from './data.js';

/** Minúsculas y sin tildes, para que "base" encuentre "Base" y "automatización". */
const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (char) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]
  ));

const matchesCategory = (project, category) =>
  category === 'all' || project.category === category;

const matchesQuery = (project, query) =>
  normalizeText([project.title, project.description, ...project.tags].join(' ')).includes(query);

/** Convierte un proyecto en el HTML de su tarjeta. */
const renderProjectCard = (project) => `
  <li>
    <article class="project_card">
      <h3 class="project_title">${escapeHtml(project.title)}</h3>
      <p class="project_meta">${escapeHtml(categoryLabels[project.category])} · ${project.year}</p>
      <p>${escapeHtml(project.description)}</p>
      <ul class="tag_list" aria-label="Tecnologías">
        ${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}
      </ul>
    </article>
  </li>`;

/** Tubería funcional: filtra por categoría, filtra por texto y mapea a HTML. */
const getVisibleCards = (query, category) =>
  projects
    .filter((project) => matchesCategory(project, category))
    .filter((project) => matchesQuery(project, query))
    .map(renderProjectCard);

export const initProjectFilter = () => {
  const form = document.getElementById('project_filter');
  const searchInput = document.getElementById('project_search');
  const categorySelect = document.getElementById('project_category');
  const list = document.getElementById('project_list');
  const status = document.getElementById('project_status');
  if (!form || !searchInput || !categorySelect || !list || !status) return;

  const render = () => {
    const cards = getVisibleCards(normalizeText(searchInput.value), categorySelect.value);
    list.innerHTML = cards.join('');
    status.textContent =
      cards.length === 0
        ? 'No se encontraron proyectos con ese criterio.'
        : `Mostrando ${cards.length} de ${projects.length} proyectos.`;
  };

  searchInput.addEventListener('input', render);
  categorySelect.addEventListener('change', render);
  form.addEventListener('submit', (event) => event.preventDefault());

  render();
};
