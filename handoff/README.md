# Handoff: Portfolio Alex Cuesta (Home · Case study · Services)

## Overview
Sitio personal de Pedro Alexander Cuesta Rivas ("Alex Cuesta"), Senior Full-Stack & Product Engineer. Objetivo: convertir visitas de recruiters, CTOs y dueños de agencias en conversaciones, apoyando cada afirmación con evidencia verificable (métricas, tests, contratos, capturas). Tres vistas:

1. **Home** — posicionamiento, evidencia profesional, experiencia, trabajo seleccionado, principios, capacidades, "now", contacto.
2. **Briefline case study** — caso de estudio full-stack independiente, con decisiones técnicas y evidencia.
3. **Services** — tres engagements de alcance fijo + formulario de contacto.

## About the Design Files
Los archivos en `design/` son **referencias de diseño creadas en HTML**: prototipos que muestran el aspecto y el comportamiento previstos, **no código de producción para copiar tal cual**. Están escritos con un runtime propio (`support.js`, etiquetas `<x-dc>`, `<sc-if>`, `{{ holes }}`, atributos `style-hover`), que **no debe portarse**.

La tarea es **recrear estos diseños en el entorno real elegido**, con sus patrones y librerías. Si aún no existe codebase, elegir el stack adecuado. Recomendación para este proyecto (sitio de contenido, SEO importante, poca interactividad):

- **Astro** o **Next.js (App Router)** con contenido en Markdown/MDX o en constantes TypeScript.
- CSS: **CSS variables + módulos/vanilla CSS** o Tailwind con los tokens de abajo mapeados. El diseño ya está expresado en variables CSS, así que el port es directo.
- Sin librería de UI: no hay componentes complejos (un carrusel simple, un toggle de tema, un formulario).
- Despliegue estático (Vercel/Netlify/Cloudflare Pages). Formulario vía Formspree / Resend / Netlify Forms.

## Fidelity
**High-fidelity (hifi).** Colores, tipografía, escalas, espaciados, estados y copy son finales. Reproducir la UI con precisión; el copy en inglés es el definitivo (el sitio es en inglés). Todos los valores están en este README y en el HTML de referencia.

---

## Design Tokens

Definir en `:root` (light) y sobreescribir en `[data-theme="dark"]`.

| Token | Light | Dark |
|---|---|---|
| `--canvas` (fondo página) | `#F7F8F5` | `#101411` |
| `--surface` (bandas/tarjetas) | `#FFFFFF` | `#171D19` |
| `--ink` (texto principal) | `#111713` | `#F1F4F1` |
| `--muted` (texto secundario) | `#58635D` | `#AAB4AD` |
| `--line` (bordes/divisores) | `#D8DEDA` | `#303A33` |
| `--accent` | `#2257D6` | `#7FA2FF` |
| `--accent-hover` | `#1845AD` | `#A6BCFF` |
| `--accent-soft` (selección) | `#EAF0FF` | `#1C2B51` |
| `--accent-ink` (texto sobre accent) | `#FFFFFF` | `#101411` |
| `--shadow` | `0 18px 50px rgba(17,23,19,0.10)` | `0 18px 50px rgba(0,0,0,0.45)` |

Acentos alternativos previstos (variantes de marca, opcionales): verde `#1C5E4A`, terracota `#8A3B12`. El accent alternativo solo se aplica en modo light.

### Tipografía
- **Geist** (Google Fonts, pesos 400/500/600/700) — todo el texto. Fallback: `Arial, 'Helvetica Neue', sans-serif`.
- **Geist Mono** (400/500) — etiquetas, metadatos, stacks, captions, footer. Fallback: `SFMono-Regular, Consolas, monospace`.
- Base body: `17px / 1.6`.
- Escala (todas fluidas con `clamp`, valores exactos en el HTML):
  - H1 hero: `clamp(44px, 5.4vw, 68px)`, weight 600, `line-height:1.0`, `letter-spacing:-0.035em`
  - H1 páginas internas: `clamp(36px, 4.4vw, 56px)`, 600, `1.02–1.04`, `-0.03em`
  - H2 sección: `clamp(32px, 3.4vw, 40px)`, 600, `1.1`, `-0.02em`
  - H2 secundario: `clamp(28px, 3vw, 34px)`, 600, `1.12`, `-0.02em`
  - H3 / statement: `clamp(21px, 1.9vw, 24px)` y `clamp(23px, 2.2vw, 28px)`, 600, `1.2–1.25`
  - Lead: `clamp(19px, 1.6vw, 22px)`, `1.45–1.5`, color `--muted`
  - Cuerpo: `17px / 1.6`
  - Small / captions: `14–15px / 1.5`
  - Mono label: `12px`, weight 500, `letter-spacing:0.04–0.08em`, a menudo mayúsculas
- `text-wrap: pretty` en titulares; medidas de línea limitadas con `ch` (`max-width: 20ch–66ch`).

### Layout y espaciado
- Contenedor: `max-width: 1360px; margin: 0 auto;`
- Padding lateral: `clamp(20px, 4vw, 72px)` (todas las secciones y header/footer)
- Padding vertical de sección: `clamp(72px, 9vw, 120px)` (Home), `clamp(64px, 8vw, 104px)` (case study), `clamp(72px, 8vw, 112px)` (Services)
- Gaps de columna: `clamp(32px, 4vw, 64px)` / `clamp(40px, 5vw, 80px)`
- Separación entre secciones: **`border-top: 1px solid var(--line)`**, y alternancia de fondo `--canvas` / `--surface`. No hay tarjetas con sombra salvo las imágenes de Briefline.
- Radios: `10px` (botones, inputs, chips pequeños), `16px` (imágenes, tarjetas, formulario), `999px` (badge NDA), `8px` (chip mono sobre placeholder).
- Sombras: solo `--shadow` en la imagen principal del board de Briefline.
- Responsive: **sin media queries**; todo con `flex-wrap` + `flex: 1 1 <base>` y `grid-template-columns: repeat(auto-fit, minmax(min(100%, Npx), 1fr))`. Reproducir esa técnica o traducirla a breakpoints equivalentes (colapso natural ~<900px a una columna).
- Accesibilidad: objetivos táctiles `min-height: 44px` en todos los enlaces de nav; `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }`; enlace "Skip to content" oculto (`left:-9999px`) que aparece en `:focus` a `left:24px`. Objetivo WCAG 2.2 AA.

---

## Screens / Views

### 1. Home (`design/Alex Cuesta - Home v2.dc.html`)
Ruta sugerida: `/`. Title: `Alex Cuesta | Senior Full-Stack & Product Engineer`. Meta description: “Alex Cuesta — Senior Full-Stack & Product Engineer. I turn ambiguous product problems into reliable software.”

**Header (sticky, `top:0`, `z-index:50`, fondo `--surface`, borde inferior `--line`, `min-height:70px`)**
- Wordmark izquierda: “Alex Cuesta”, 17px/600, `letter-spacing:-0.01em`, color `--ink`.
- Nav (`column-gap:24px`, 15px, color `--muted`, hover `--ink`): Experience · Work · About · Contact. `margin-right:auto`.
- Derecha (`gap:16px`): botón de tema (44px alto, borde `--line`, radio 10px, mono 12px, texto `DARK`/`LIGHT`) + CTA “Start a conversation” (44px, `background:--accent`, texto `--accent-ink`, radio 10px, 15px/600).

**Hero — dos variantes** (prop `heroVariant`). **Implementar la variante A (`portrait-editorial`) como definitiva**; B queda documentada como alternativa.
- A: dos columnas (`flex 1 1 540px` texto / `flex 0 1 400px` retrato). H1 “Alex Cuesta” → subtítulo “Senior Full-Stack & Product Engineer” (`clamp(19px,1.7vw,22px)`/500) → statement sobre `border-top:1px solid --line` con `padding-top:28px`, `max-width:24ch`: “I turn ambiguous product problems into reliable software.” → párrafo `--muted` 17px `max-width:56ch`: “I build APIs, internal tools, automation and production AI systems for teams that need clarity, reliability and ownership.” → botonera: primario “Start a conversation” (48px alto, 24px padding), secundario “Download résumé” (transparente, borde `--line`, hover borde `--ink`).
- Retrato: `assets/portrait.png`, `aspect-ratio:4/5`, `object-fit:cover`, `object-position:50% 18%`, borde `--line`, radio 16px.
- B (`statement-band`): nombre pequeño en línea con el rol, statement gigante `clamp(38px,4.8vw,60px)` `max-width:26ch`, retrato `aspect-ratio:5/4` a la izquierda y párrafo + botonera a la derecha, alineados a `align-items:end`.

**Evidence band** (fondo `--surface`, bordes arriba y abajo, padding vertical `clamp(32px,4vw,48px)`): grid `auto-fit minmax(120px,1fr)`, gap `24px 20px`. H2 oculto visualmente (“Professional evidence”). Cuatro métricas — número `clamp(30px,3vw,36px)`/600/`-0.02em`, etiqueta 14px `--muted`:
- `5 years` — building production software
- `100K+` — active users on systems I built
- `~500K` — payment transactions per month
- `6 developers` — led as technical leader

Nota al pie centrada, 14px `--muted`, `max-width:84ch`: “All four figures come from five years at Chiper, a B2B commerce platform in Latin America. [The context for each one is in Experience](#experience).”

**About** (`#about`, fondo `--canvas`): H2 “I work best where the problem is still unclear.” (`max-width:26ch`), lead + párrafo `--muted` (`max-width:60ch`); a la derecha (`flex 0 1 380px`) un **placeholder de imagen** `aspect-ratio:5/4`, radio 16px, fondo `repeating-linear-gradient(135deg, var(--surface) 0 10px, var(--canvas) 10px 20px)`, con chip mono 12px sobre `--surface`: `portrait-about.jpg — working or in conversation`. → **Sustituir por foto real antes de publicar.**

**Experience** (`#experience`, fondo `--surface`): H2 “Five years building systems used at scale.” + lead. Lista `<ol>` sin bullets; cada item es un grid `minmax(110px,170px) 1fr`, `gap: clamp(20px,3vw,48px)`, `padding:32px 0`, `border-top:1px solid --line` (el último también `border-bottom`). Columna izquierda: rango de años en mono 12px/500/`0.06em` `--muted` + “Chiper” 14px. Derecha: cargo (H3) + descripción 17px `--muted` `max-width:66ch`.
- 2024 — 2026 · Technical Lead
- 2022 — 2024 · Senior Software Engineer
- 2021 — 2022 · Backend Engineer

**Selected work** (`#work`, fondo `--canvas`): cabecera con H2 “Selected work” y nota derecha 15px “Two projects, explained properly, instead of a gallery.”
- Proyecto 1 (Briefline): dos columnas (`flex 1 1 480px` figura / `1 1 380px` texto), `align-items:center`. Imagen `assets/briefline-board.webp` enlazada al case study, borde `--line`, radio 16px, `box-shadow: var(--shadow)`. Texto: H3 “From an ambiguous brief to a verifiable product.”, párrafo `max-width:56ch`, línea mono de stack `React · NestJS · PostgreSQL · OpenAPI 3.1 · Playwright`, botones “Read case study” (primario, → case study) y “Open live demo” (secundario, **pendiente de URL real**), y disclaimer 14px con `border-left:2px solid --line` + `padding-left:16px`: “Independent case study inspired by a real marketplace brief. Not commissioned client work.”
- Proyecto 2 (Chiper): fila con `border-top` y `padding-top:40px`; H3 “Payment and billing platform · Chiper” + párrafo `max-width:62ch`; a la derecha badge pill (32px alto, `border-radius:999px`, borde `--line`, mono 12px `letter-spacing:0.04em`): `PROFESSIONAL WORK · NDA`.

**Principios** (fondo `--surface`): H2 “How I think about building software.” (`max-width:20ch`). Cuatro filas grid `auto-fit minmax(320px,1fr)`, `gap:16px clamp(32px,5vw,80px)`, `padding:32px 0`, `border-top` (última con `border-bottom`), `align-items:baseline`: statement `clamp(23px,2.2vw,28px)`/600 a la izquierda, explicación 17px `--muted` `max-width:58ch` a la derecha.
1. Reliability is part of the product.
2. Good architecture makes change safer, not merely cleaner.
3. Documentation exists to make claims verifiable.
4. AI is useful when its limits are explicit.

**Capabilities carousel** (fondo `--canvas`): H2 “Where I add the most value.”. Fila de control: contador mono 12px `CAPABILITY {from}–{to} OF 4` a la izquierda, dos botones 48×48 (borde `--line`, radio 10px, flechas ← →, `aria-label` "Previous/Next capability") a la derecha. Viewport con `overflow:hidden` y `border-top:1px solid --line`; track flex con `gap: clamp(24px,3vw,40px)` y `transition: transform 520ms cubic-bezier(0.16,1,0.3,1)`.
- Slides por vista: **3** si el viewport ≥1040px, **2** si ≥680px, **1** si menor. Ancho de slide = `(anchoViewport - gap*(perView-1)) / perView`. `translateX(-index * (slideW + gap))`. Navegación circular (wrap en ambos extremos). Índice máximo = `4 - perView`; recalcular en `resize`.
- Cada slide: H3, párrafo 17px `--muted` `max-width:54ch`, y línea mono 12px que empieza por “Evidence: …”.
  1. Product and API engineering — Evidence: Briefline's OpenAPI 3.1 contract · Node.js · TypeScript · NestJS · PostgreSQL
  2. Reliable backend systems — Evidence: ~500K monthly transactions at 99.9% uptime · queues · retries · observability
  3. Internal tools and workflows — Evidence: internal tooling at Chiper · React · Next.js · WCAG 2.2 AA target
  4. Automation and production AI — Evidence: conversational AI in production · Vertex AI · Gemini function calling · n8n
- Mejora sugerida en implementación: soporte de teclado (←/→), `scroll-snap` como fallback y swipe táctil.

**Now** (fondo `--surface`, padding vertical `clamp(48px,6vw,72px)`): etiqueta mono `NOW · AUGUST 2026` (letter-spacing `0.08em`), H2 “Currently building: n8n Reliability Lab”, párrafo `--muted` `max-width:60ch`. **Este bloque debe ser editable/fechado** (Markdown o CMS) para no envejecer.

**Contact** (`#contact`, `text-align:center`): párrafo lead con `border-bottom` y `padding-bottom:40px` (`max-width:66ch`), H2 gigante “Have a product problem worth clarifying?” (`clamp(38px,5.6vw,76px)`, `-0.035em`, `max-width:22ch`), párrafo `max-width:62ch`, y fila centrada con CTA primario + enlaces LinkedIn / GitHub / Email (16px, `--muted`, hover `--ink` + subrayado `text-underline-offset:3px`). **Todos los `href` son placeholders `#contact`: sustituir por URLs reales y `mailto:`.**

**Footer** (fondo `--surface`, borde superior): tres bloques `justify-content:space-between`, `align-items:baseline`, `gap:32px`: nombre 17px/600 + tagline mono “Clear decisions. Reliable software. Verifiable work.”; nav (Experience, Work, Services, Contact); copyright mono “© 2026 Pedro Alexander Cuesta Rivas”.

### 2. Briefline case study (`design/Alex Cuesta - Briefline case study.dc.html`)
Ruta sugerida: `/work/briefline`. Title: `Briefline case study | Alex Cuesta`. Mismo header (con “Work” en estado activo: color `--ink`, weight 500) y footer sin nav.

- **Hero** (`max-width:66ch`): eyebrow mono `CASE STUDY · BRIEFLINE · 2026`, H1 “From an ambiguous brief to a verifiable product.”, lead.
- **Meta `<dl>`**: grid `auto-fit minmax(180px,1fr)`, `gap:24px 40px`, `padding:28px 0` con `border-top`/`border-bottom`. `dt` mono 12px `--muted`, `dd` 17px. MY ROLE / STACK / TYPE / EVIDENCE (“483 tests, public demo, OpenAPI contract (12 Aug 2026)”).
- **Botonera**: “Open live demo” (primario) y “View repository” (secundario). **URLs pendientes.**
- **Figura principal**: `assets/briefline-board.webp` con `--shadow`, caption mono 12px.
- **Context and audience / Constraints I set** (fondo `--surface`): dos columnas `flex 1 1 420px`. La segunda es una lista con divisores (`padding:14px 0; border-bottom:1px solid --line`), 4 items.
- **The decisions that shaped the system** (fondo `--canvas`): tres bloques, cada uno `border-top` + `padding-top:32px`, `gap: clamp(32px,4vw,64px)`, `align-items:start`; texto `flex 1 1 380px` (párrafo `max-width:56ch`) + lado derecho `flex 1 1 340px`.
  1. “The contract comes first” + **tarjeta de contrato**: borde `--line`, radio 16px, `padding:24px`, fondo `--surface`, contenido mono 12px `line-height:1.7` color `--ink`, cinco líneas separadas por `<br>`: `PATCH /tasks/{id}` / `If-Match: required` / `200 → updated task + new version` / `409 → current server state + changed fields` / `403 → permission denied, no partial write`. (Implementar como `<pre>` o lista, no como `<br>`.)
  2. “Permissions live on the server” + `assets/briefline-client-detail.webp` + caption.
  3. “A stale update never wins silently” + `assets/briefline-move-to-menu.webp` + caption. Este bloque cierra con `border-bottom` y `padding-bottom:32px`.
- **The states most tools postpone** (fondo `--surface`): dos párrafos + `assets/briefline-focus-state.webp` (`flex 1 1 420px`) con caption.
- **Evidence you can check** (`#evidence`, fondo `--canvas`): H2 + nota de fecha; grid `auto-fit minmax(200px,1fr)` con `border-top`/`border-bottom` y cuatro cifras: `203` unit tests, `206` integration tests over PostgreSQL, `74` end-to-end tests with Playwright, `AA` WCAG 2.2 target, keyboard reviewed. Debajo, lista de enlaces en línea (`flex-wrap`, `gap:16px 32px`, 16px): Public demo · Repository · OpenAPI 3.1 contract · Permission matrix · Data model · Testing strategy · Accessibility notes. **Todos placeholders; deben apuntar a recursos reales o eliminarse.**
- **Trade-offs and what I left out / Outcome and what I would change**: dos columnas `flex 1 1 420px`, la primera con lista de 3 items divididos.
- **Contact** (`#contact`, `max-width:58ch`, alineado a izquierda): H2 “Want the same rigour on your product?”, lead, botones “Start a conversation” y “View selected work”.

### 3. Services (`design/Alex Cuesta - Services.dc.html`)
Ruta sugerida: `/services`. Title: `Services | Alex Cuesta`. Header con “Services” activo y un item extra en el nav (Work · Experience · About · Services · Contact).

- **Hero** (`padding:96px … 80px`): grid `auto-fit minmax(320px,1fr)`, `align-items:end`. Eyebrow mono `Services` (uppercase), H1 “Focused help for software that needs to work.” (`clamp(40px,4.6vw,56px)`), y lead a la derecha (`max-width:50ch`).
- **Engagements** (fondo `--surface`): tres `<article>` en grid `auto-fit minmax(260px,1fr)` de tres columnas, `gap: clamp(24px,3vw,48px)`, `align-items:start`, separados por `border-bottom:1px solid --line` (el tercero sin borde) y `padding:56px 0`.
  - Col 1: índice mono `01 / FIX`, `02 / INTEGRATE`, `03 / OPERATE`.
  - Col 2: H2 (nombre), descripción 17px `--muted` `max-width:46ch`, línea mono `Fixed scope · quoted per case`.
  - Col 3: bloque “You receive” (heading mono uppercase + lista con divisores de 3 items) y bloque “Out of scope” (párrafo `--muted` `max-width:50ch`), `gap:28px`.
  - Servicios: **Bug Rescue 90**, **API Integration Check**, **n8n Reliability Audit** (copy exacto en el HTML).
- **How an engagement runs.** (fondo `--canvas`): H2 + `<ol>` grid `auto-fit minmax(200px,1fr)`, `gap:40px`; cada paso con `border-top` y `padding-top:24px`, número mono, H3 20px, párrafo 15px. Pasos: 01 Context · 02 Scope · 03 Work · 04 Handover.
- **Contact + formulario** (`#contact`, fondo `--surface`): izquierda H2 “Send the context, not a brief.”, párrafo y aviso 14px con `border-left:2px solid --line` (“Share only what is safe to discuss. Do not include credentials or sensitive customer data.”). Derecha: `<form>` con borde `--line`, radio 16px, `padding:40px`, fondo `--canvas`, `gap:24px`.
  - Campos: Name (text, required) y Work email (email, required) en grid de dos columnas `auto-fit minmax(200px,1fr)`; “What are you working on?” (textarea, 3 filas, required); “What would a useful outcome look like?” (textarea, 3 filas, required).
  - Inputs: 48px alto, `padding:0 14px`, 16px, fondo `--surface`, borde `--line`, radio 10px; textarea `padding:12px 14px`, `resize:vertical`. `:focus` → `border-color: var(--accent)` (además del focus ring global). Labels visibles 14px/500 encima del campo (`display:grid; gap:8px`).
  - Submit: botón primario cuyo texto cambia `Send project context` → `Sending context…` → y `<p role="status">` muestra “Thanks. I have your context and will reply with the most useful next step.”
- **Footer**: igual que Home pero fondo `--canvas` y nav Work / Experience / Services / Contact.

---

## Interactions & Behavior

**Tema claro/oscuro**
- Estado inicial: `localStorage['ac-theme']` si existe; si no, `prefers-color-scheme`.
- Toggle escribe en `localStorage` y aplica el set de tokens al contenedor raíz (en producción: `data-theme` en `<html>`, no `style.setProperty`).
- El botón muestra el tema **destino** (`DARK` cuando estás en claro). Tiene `aria-live="polite"`; en producción usar además `aria-pressed` o texto accesible tipo “Switch to dark theme”.
- Transición: `background-color 200ms ease, color 200ms ease` en la raíz. Evitar flash inicial (script inline en `<head>` que fija `data-theme` antes de pintar).

**Reveal on scroll**
- Elementos con `data-reveal` empiezan en `opacity:0; translateY(16px)` y pasan a `opacity:1; translateY(0)` con `opacity/transform 560ms cubic-bezier(0.16,1,0.3,1)`, con retardo opcional `data-reveal-delay` (0 / 80 / 100 / 120 / 160 / 200 / 240 ms).
- Disparo cuando el elemento entra al 92% de la altura del viewport. **En producción usar `IntersectionObserver`** (el prototipo usa listeners de scroll por restricciones del entorno) y desconectar tras revelar.
- Respetar `prefers-reduced-motion: reduce`: no ocultar nada, contenido visible desde el inicio. Requisito: el contenido debe ser visible sin JS (aplicar el estado oculto solo desde JS, o via `.js-reveal` en `<html>`).

**Carrusel de capacidades** — ver detalle de cálculo en la sección Home. Sin autoplay.

**Formulario (Services)** — validación nativa (`required`, `type="email"`); en producción: validación en submit con mensajes ligados al input vía `aria-describedby`, estado de error, estado `sending` con botón deshabilitado, y honeypot/captcha ligero. El envío del prototipo es simulado (900 ms).

**Navegación**
- Enlaces internos con anclas `#experience`, `#work`, `#about`, `#contact`, `#services`, `#evidence`; `html { scroll-behavior: smooth }` (desactivar bajo `prefers-reduced-motion`).
- Header sticky: añadir `scroll-margin-top: 88px` a los targets de ancla para que el header no tape el título.
- **Falta por diseñar/implementar: menú móvil.** En el prototipo el nav simplemente envuelve (`flex-wrap`) en pantallas pequeñas. Decidir entre nav envolvente (aceptable, 4–5 items) o un botón hamburguesa; si se implementa, mantener 44px de objetivo táctil.

**Hover / focus / active**
- Enlaces de nav: `--muted` → `--ink`, sin subrayado.
- Botón primario: `--accent` → `--accent-hover`, `transition: background-color 180ms ease`; `:active` → `translateY(1px)`.
- Botón secundario: borde `--line` → `--ink`.
- Botones de carrusel: borde → `--ink`, `transition: border-color 180ms ease`.
- Enlaces de contenido: color `--accent`, hover `--accent-hover` + subrayado con `text-underline-offset:3px`.
- `::selection`: fondo `--accent-soft`, color `--ink`.

## State Management
Estado mínimo, todo local:
- `theme: 'light' | 'dark'` — persistido en `localStorage` (`ac-theme`), compartido entre las tres páginas.
- `valueIndex: number` (0…`4 - perView`) y derivados `perView`, `slideWidth`, `gap` — carrusel de Home; recalcular en `resize`.
- `formStatus: 'idle' | 'sending' | 'sent' | 'error'` — formulario de Services.
- No hay data fetching salvo el POST del formulario. Todo el contenido es estático: extraerlo a Markdown/MDX o a un módulo `content.ts` para que Alex pueda editar sin tocar layout (prioritario en Experience, Selected work, Capabilities, Now y Services).

## Assets
En `design/assets/`:
- `portrait.png` — retrato para el hero de Home (recorte `object-position:50% 18%`). Exportar además en WebP/AVIF y con `srcset` para 1x/2x.
- `briefline-board.webp` — captura del board (Pending / In progress / Blocked / Completed). Usada en Home y en el case study.
- `briefline-client-detail.webp` — detalle de cliente con sus tareas.
- `briefline-move-to-menu.webp` — menú "move to" abierto sobre una tarea.
- `briefline-focus-state.webp` — anillo de foco de teclado visible.

Todas las capturas provienen del propio proyecto Briefline. Los `alt` del HTML son los definitivos: reutilizarlos literalmente.

**Falta**: la imagen de la sección About es un placeholder rayado (`portrait-about.jpg — working or in conversation`). Sustituir por una foto real de trabajo/conversación en `5/4` antes de publicar.

## Pendientes antes de publicar (todos los enlaces reales)
1. Email real (`mailto:`), LinkedIn y GitHub — hoy `#contact`.
2. PDF del résumé para “Download résumé”.
3. Demo pública y repositorio de Briefline (Home + case study) y los 5 documentos de evidencia (contrato OpenAPI, matriz de permisos, modelo de datos, estrategia de testing, notas de accesibilidad). Si alguno no existirá, eliminar el enlace: la promesa del sitio es que todo es verificable.
4. Endpoint del formulario de Services + política de privacidad mínima.
5. Foto real para About.
6. Metadatos sociales: `og:title`, `og:description`, `og:image` (1200×630), favicon, `sitemap.xml`, `robots.txt`, JSON-LD `Person`.
7. Fechar el bloque "Now" y dejarlo editable.

## Files
- `design/Alex Cuesta - Home v2.dc.html` — Home (versión vigente, incluye las dos variantes de hero).
- `design/Alex Cuesta - Briefline case study.dc.html` — caso de estudio.
- `design/Alex Cuesta - Services.dc.html` — servicios + formulario.
- `design/assets/` — imágenes.
- `design/support.js` — runtime del prototipo, **solo para poder abrir los HTML en un navegador**. No portar.

Los tres archivos se abren directamente en el navegador (doble clic) para inspeccionar medidas, estados y comportamiento reales.
