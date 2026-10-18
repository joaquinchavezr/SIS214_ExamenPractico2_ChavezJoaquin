/**
 * github.js — Módulo asíncrono: consumo de la API REST pública de GitHub.
 *
 * - Fetch API con async/await dentro de bloques try...catch.
 * - Evaluación de response.ok y manejo explícito de códigos HTTP (400, 403, 404, 500).
 * - Interfaz con tres estados visibles: loading, success y error.
 */
const GITHUB_USER = 'joaquinchavezr';
const REPOS_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`;

const HTTP_ERROR_MESSAGES = new Map([
  [400, 'La solicitud a GitHub no es válida (error 400).'],
  [403, 'GitHub limitó temporalmente las consultas (error 403). Intenta de nuevo en unos minutos.'],
  [404, `No se encontró el usuario «${GITHUB_USER}» en GitHub (error 404).`],
  [500, 'GitHub tuvo un problema interno (error 500). Intenta de nuevo más tarde.'],
]);

/** Error que conserva el código de estado HTTP de una respuesta no exitosa. */
class HttpError extends Error {
  constructor(status) {
    super(`HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

/** Convierte cualquier error en un mensaje claro para la persona usuaria. */
const getErrorMessage = (error) => {
  if (error instanceof HttpError) {
    if (HTTP_ERROR_MESSAGES.has(error.status)) return HTTP_ERROR_MESSAGES.get(error.status);
    if (error.status >= 500) return HTTP_ERROR_MESSAGES.get(500);
    return `No se pudo obtener la información (error ${error.status}).`;
  }
  if (error instanceof TypeError) {
    return 'No hay conexión con GitHub. Revisa tu internet e inténtalo de nuevo.';
  }
  return 'Ocurrió un error inesperado al cargar los repositorios.';
};

/** Pide los repositorios; lanza HttpError si la respuesta no es 2xx. */
const fetchRepositories = async () => {
  const response = await fetch(REPOS_URL, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Respuesta inesperada de la API.');
  }
  return data;
};

const formatDate = (isoDate) =>
  isoDate
    ? new Intl.DateTimeFormat('es-BO', { dateStyle: 'medium' }).format(new Date(isoDate))
    : 'sin fecha';

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};

/** Construye con nodos del DOM (textContent) la tarjeta de un repositorio. */
const createRepoItem = (repo) => {
  const item = document.createElement('li');
  const card = createElement('article', 'repo_card');

  const title = createElement('h3', 'repo_name');
  const link = createElement('a', '', repo.name);
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  title.append(link);

  const meta = createElement('p', 'repo_meta');
  meta.append(
    createElement('span', '', repo.language ?? 'Sin lenguaje'),
    createElement('span', '', `★ ${repo.stargazers_count}`),
    createElement('span', '', `Actualizado: ${formatDate(repo.pushed_at)}`),
  );

  card.append(title, createElement('p', '', repo.description ?? 'Sin descripción.'), meta);
  item.append(card);
  return item;
};

export const initGithubRepos = () => {
  const status = document.getElementById('repo_status');
  const list = document.getElementById('repo_list');
  const retryButton = document.getElementById('repo_retry');
  if (!status || !list || !retryButton) return;

  /** Refleja en la interfaz el estado de la petición: loading | success | error. */
  const setState = (state, message) => {
    status.dataset.state = state;
    status.textContent = message;
    list.setAttribute('aria-busy', String(state === 'loading'));
    retryButton.hidden = state !== 'error';
    if (state !== 'success') list.replaceChildren();
  };

  const loadRepositories = async () => {
    setState('loading', 'Cargando repositorios…');
    try {
      const repos = await fetchRepositories();
      list.replaceChildren(...repos.map(createRepoItem));
      setState(
        'success',
        repos.length === 0
          ? `@${GITHUB_USER} aún no tiene repositorios públicos.`
          : `Mostrando ${repos.length} repositorios públicos de @${GITHUB_USER}.`,
      );
    } catch (error) {
      console.error('Error al consultar la API de GitHub:', error);
      setState('error', getErrorMessage(error));
    }
  };

  retryButton.addEventListener('click', loadRepositories);
  loadRepositories();
};
