# PLAN — Portfolio Alex Cuesta

Estado: propuesto, pendiente de tu aprobación antes de ejecutar.

## 1. Stack (confirmado, sin cambios sobre lo pedido)
- **Astro 5** + TypeScript estricto (`strict: true` en `tsconfig`), salida estática (`output: 'static'`).
- CSS propio con variables CSS globales, sin Tailwind ni librería de UI.
- Contenido en `src/data/*.ts` tipado (no Markdown): todo el copy de este sitio es corto y estructurado (listas de experiencia, principios, capacidades...), no prosa larga con front-matter — un módulo TS tipado es más simple de editar y de tipar en estricto que MDX, y evita una dependencia extra (`@astrojs/mdx`). Si en el futuro Alex quiere escribir casos de estudio adicionales en prosa larga, se puede añadir `src/content/` con Content Collections sin romper nada de esto.
- Fuentes Geist y Geist Mono self-hosted (`@fontsource/geist-sans` + `@fontsource/geist-mono`, o woff2 descargados directo si el paquete no trae los pesos exactos) — pendiente de aprobación como única dependencia nueva fuera de Astro.
- Imágenes con `astro:assets` (`<Image>` / `getImage`) → AVIF/WebP + `srcset`.
- Formulario de Services → **Formspree** (decidido).
- Menú móvil → **nav envolvente** (decidido, igual que el prototipo), sin isla de JS nueva.
- Playwright para E2E, Vitest solo si aparece lógica que lo justifique (cálculo del carrusel es la única candidata).

Nota: encontré `/Users/ac/develop_projects/portfolio/landing/profile.png` (1.9 MB) en la raíz del proyecto, fuera de `handoff/`. No lo voy a usar para nada hasta que confirmes si es la foto real para la sección About — si lo es, lo proceso con `astro:assets` como reemplazo del placeholder rayado.

## 2. Estructura de carpetas
```
src/
  components/
    Header.astro
    Footer.astro
    ThemeToggle.astro          (botón + script inline anti-flash)
    RevealGroup.astro          (helper opcional; o utilidad JS compartida)
    CapabilitiesCarousel.astro (isla de JS: cálculo de perView/slideWidth/index)
    ContactForm.astro          (isla: estados idle/sending/sent/error)
    MetricGrid.astro
    SectionDivider / primitives menores si el patrón se repite ≥3 veces
  layouts/
    BaseLayout.astro           (head, fuentes, script anti-flash, skip link, header/footer slot)
  pages/
    index.astro                 (Home)
    work/briefline.astro        (Case study)
    services.astro
  data/
    site.ts        (constantes: nombre, tagline, nav items, footer)
    config.ts       (placeholders: email, LinkedIn, GitHub, PDF résumé, demo/repo Briefline, endpoint Formspree — todos marcados TODO)
    experience.ts
    work.ts          (Briefline + Chiper selected work)
    principles.ts
    capabilities.ts
    services.ts
    now.ts            (bloque "Now", con fecha)
    caseStudy.ts       (contenido específico de Briefline: meta dl, decisiones, evidencia, trade-offs)
  styles/
    tokens.css        (--canvas, --surface, --ink, --muted, --line, --accent... en :root y [data-theme="dark"])
    global.css        (reset, tipografía base, utilidades .container, .visually-hidden, focus-visible, ::selection)
    fonts.css         (@font-face Geist/Geist Mono, font-display:swap)
  scripts/
    theme.ts           (toggle + persistencia, importado por ThemeToggle)
    reveal.ts           (IntersectionObserver, respeta prefers-reduced-motion)
    carousel.ts          (lógica de layoutCarousel/moveCarousel portada del prototipo)
  assets/
    portrait.{png→avif/webp}, briefline-*.webp (procesadas vía astro:assets)
public/
  favicon, robots.txt, sitemap (Astro genera sitemap con @astrojs/sitemap si se aprueba)
tests/
  e2e/ (Playwright: navegación, tema, carrusel, formulario, teclado)
```

## 3. Inventario de componentes (mapeado 1:1 al README)
| Componente | Usado en | Notas de fidelidad |
|---|---|---|
| Header sticky + nav + toggle + CTA | las 3 páginas | nav activo distinto por página (Work en case study, Services en /services) |
| Skip link | Home (y homogenizar en las 3) | el prototipo solo lo tiene en Home; lo añado a las 3 por accesibilidad, sin inventar copy nuevo |
| Hero portrait-editorial | Home | única variante implementada; hero B documentado como comentario/prop no usada, no como ruta viva |
| Evidence band (4 métricas) | Home | H2 visualmente oculto, no `display:none` |
| About | Home | placeholder rayado hasta tener foto real |
| Experience list | Home | `<ol>` sin bullets, grid de 2 columnas |
| Selected work (Briefline + Chiper) | Home | imagen enlaza a `/work/briefline` |
| Principles | Home | 4 filas |
| Capabilities carousel | Home | única isla de JS con estado no trivial — perView 3/2/1, wrap circular, recálculo en resize, teclado ←/→ |
| Now | Home | fecha editable vía `data/now.ts` |
| Contact (Home) | Home | placeholders `#contact` hasta tener URLs reales |
| Footer | las 3 páginas | nav distinto por página, fondo `--canvas` en Services |
| Case study hero + meta `<dl>` | /work/briefline | |
| Tarjeta de contrato | /work/briefline | `<pre>` semántico, no `<br>` |
| Bloques de decisión + figuras | /work/briefline | 3 bloques con imagen/caption |
| Evidence you can check | /work/briefline | 4 cifras + lista de enlaces (placeholders) |
| Trade-offs / Outcome | /work/briefline | |
| Services hero | /services | |
| 3 engagements | /services | copy exacto del prototipo |
| Proceso (4 pasos) | /services | |
| ContactForm | /services | única isla con estados de formulario real (Formspree) |

## 4. Fases y responsables

**Fase 0 — Setup (yo, directo, sin subagente):** `npm create astro@latest`, TS estricto, estructura de carpetas, `astro.config.mjs`, git init + primer commit. Bloqueante para todo lo demás.

**Fase 1 — Foundation** (`frontend-designer`, un solo agente, serializado antes que el resto):
- Tokens CSS (light/dark), fuentes self-hosted, `global.css`.
- `BaseLayout.astro` con script inline anti-flash de tema en `<head>`.
- `Header.astro`, `Footer.astro`, `ThemeToggle.astro` (con estado activo por página vía prop).
- `scripts/reveal.ts` (IntersectionObserver + reduced-motion) y convención `data-reveal`/`data-reveal-delay` reutilizable en Astro.
- Criterio de aceptación: las 3 páginas (aunque vacías de contenido) comparten header/footer/tema sin flash, navegando entre ellas con `localStorage['ac-theme']` persistente.

**Fase 2 — Content model** (yo, directo): extraer todo el copy de los 3 prototipos a `src/data/*.ts` tipado, incluyendo `config.ts` con los placeholders marcados `TODO`. Se hace antes de las páginas para que Home/Case study/Services solo consuman datos, nunca copy hardcodeado.

**Fase 3 — Home, Case study, Services** (en paralelo, no comparten archivos):
- `frontend-designer` → Home completa (hero, evidence, about, experience, work, principles, carousel, now, contact).
- `frontend-designer` (segunda instancia) → Case study completa.
- `frontend-designer` (tercera instancia) → Services completa + `ContactForm.astro` con Formspree e isla de estados.

**Fase 4 — QA** (`qa-risk-analyzer` + verificación directa mía):
- Accesibilidad: navegación completa por teclado a mano, focus visible, labels/aria-describedby, sin flash de tema, contenido visible sin JS.
- Responsive en 360/768/1024/1440/1920 comparado contra los prototipos abiertos en paralelo.
- Lighthouse (4 categorías, móvil) ≥95.
- Fidelidad visual sección por sección contra los `.dc.html`.

**Fase 5 — Tests** (`unit-test-creator` para Vitest del cálculo del carrusel si aplica; yo o un agente para Playwright):
- E2E: navegación entre páginas, persistencia de tema, carrusel (wrap + resize), envío/validación de formulario, recorrido completo por teclado.

**Fase 6 — Commit final y lista de placeholders** (yo).

## 5. Riesgos
- **Fuentes Geist self-hosted**: confirmar qué paquete npm trae los pesos exactos (400/500/600/700 Sans, 400/500 Mono) en woff2 subset latin; si no existe uno confiable, descargar directo de Vercel/Geist y vendorizar en `public/fonts/`. Lo resuelvo en Fase 1 sin bloquear el resto.
- **Grid con `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`**: técnica sin media queries; replicarla tal cual en CSS vanilla es directo, pero hay que verificar en Safari/Firefox además de Chrome durante QA.
- **Carrusel**: es la única lógica con estado real; portarla del prototipo (`layoutCarousel`/`moveCarousel`) a una isla Astro con `client:load` mínima, sin framework.
- **Hero B (`statement-band`)**: el README pide implementar solo A como definitiva. La dejo documentada en el código (comentario + estructura de datos) pero no como ruta accesible, para no inflar el sitio con una variante no usada.
- `profile.png` en la raíz: no lo toco hasta que confirmes su propósito.

## 6. Placeholders a reunir (recordatorio, no bloquean el desarrollo)
Email real, LinkedIn, GitHub, PDF de résumé, demo y repo de Briefline, 5 documentos de evidencia (contrato OpenAPI, matriz de permisos, modelo de datos, estrategia de testing, notas de accesibilidad), endpoint de Formspree, foto real de About, `og:image` 1200×630, y confirmación sobre `profile.png`.

---

¿Apruebas esta estructura y el orden de fases? Con luz verde arranco por la Fase 0 (scaffolding) y sigo con Foundation.
