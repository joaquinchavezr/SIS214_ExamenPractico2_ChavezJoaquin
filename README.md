# CV Interactivo — SIS-214 Examen Práctico 2

Landing page interactiva de CV / portafolio profesional de **Joaquin Oscar Chavez Rivamontan**,
desarrollada para la asignatura Tecnologías Web I (SIS-214), Universidad Católica Boliviana.

- **Repositorio:** https://github.com/joaquinchavezr/SIS214_ExamenPractico2_ChavezJoaquin
- **Sitio en producción:** https://joaquinchavezr.github.io/SIS214_ExamenPractico2_ChavezJoaquin/

## Tecnologías utilizadas

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) y WAI-ARIA.
- CSS3 con custom properties, Flexbox, CSS Grid y estrategia mobile-first.
- JavaScript ES6+ con módulos nativos (`type="module"`), sin frameworks ni dependencias.
- Git y GitHub Pages para el control de versiones y el despliegue.

## Arquitectura de la solución

```
SIS214_ExamenPractico2_ChavezJoaquin/
├── index.html              Estructura semántica de toda la página
├── css/
│   ├── variables.css       Tokens de diseño en :root y tema oscuro
│   ├── base.css            Reset universal y estilos base
│   ├── layout.css          Estructura general con CSS Grid y media queries
│   ├── components.css      Componentes (navegación, tarjetas, formulario, etc.)
│   └── animations.css      Transiciones, animaciones y prefers-reduced-motion
├── js/
│   ├── main.js             Punto de entrada: inicializa cada módulo
│   ├── theme.js            Tema claro/oscuro con localStorage (JSON)
│   ├── menu.js             Menú hamburguesa con aria-expanded
│   ├── data.js             Datos originales inmutables de los proyectos
│   ├── filter.js           Filtro en tiempo real con filter() y map()
│   ├── form.js             Validación del formulario de contacto
│   └── github.js           Consumo de la API REST de GitHub (Fetch)
└── assets/images/          Imágenes del sitio
```

El CSS se organiza en capas (variables → base → layout → componentes → animaciones) y cada
funcionalidad de JavaScript vive en su propio módulo, de modo que el código sea legible y
fácil de mantener.

### Diseño responsivo (mobile-first)

| Rango | Media query | Comportamiento |
|---|---|---|
| Móvil (< 768px) | estilos base | Una columna, menú hamburguesa |
| Tablet (768px – 1024px) | `min-width: 768px` | Tarjeta de perfil horizontal, listas en 2 columnas |
| Escritorio (> 1024px) | `min-width: 1025px` | Grid de dos columnas, perfil fijo lateral, menú horizontal |

## Funcionalidades interactivas

1. **Tema claro/oscuro:** alterna `data-theme` en `<html>` y guarda la preferencia en `localStorage`
   con `JSON.stringify()`; se restaura con `JSON.parse()` al recargar.
2. **Menú hamburguesa:** conmuta la clase `is_open` y actualiza `aria-expanded`; se cierra con
   Escape o al elegir una sección.
3. **Filtro de proyectos:** búsqueda por texto y categoría en tiempo real. Los datos originales
   están congelados con `Object.freeze()` y se procesan con la tubería `.filter().filter().map()`.
4. **Formulario de contacto:** `event.preventDefault()` en `submit`, validación nativa de HTML5
   con mensajes en tiempo real mediante el evento `input`. Si los datos son válidos, el mensaje
   se envía con `fetch` al servicio Formspree y llega al correo del autor.
5. **API de GitHub:** `fetch` con `async/await`, `try...catch`, verificación de `response.ok`,
   manejo de los códigos 400, 403, 404 y 500, y estados visibles *loading*, *success* y *error*.

## Accesibilidad

- Enlace de salto al contenido principal y foco visible en todos los controles.
- Atributos `aria-label`, `aria-labelledby`, `aria-expanded`, `aria-pressed`, `aria-describedby`,
  `aria-invalid` y regiones `role="status"` / `aria-live` para mensajes dinámicos.
- Respeto de `prefers-reduced-motion` y de `prefers-color-scheme`.

## Ejecución local

Los módulos ES6 no funcionan abriendo `index.html` con `file://`; sirve la carpeta con un servidor estático:

```bash
python -m http.server 8000
# o bien
npx serve .
```

Luego abre http://localhost:8000.

## Convenciones

- Clases e identificadores CSS/HTML en `snake_case`; variables y funciones JavaScript en `camelCase`.
- Los tokens CSS siguen el formato `--nombre-token`.
- Commits descriptivos siguiendo Conventional Commits (`feat`, `fix`, `style`, `docs`, `a11y`, `chore`).

## Autor

Joaquin Oscar Chavez Rivamontan — Ingeniería en Sistemas, Universidad Católica Boliviana.
