# PROGRESS — Portfolio Alex Cuesta

Estado: **build completo**. Las 3 páginas están implementadas, revisadas contra el handoff, con QA de accesibilidad/rendimiento/fidelidad aplicado y tests automatizados pasando. Pendiente de valores reales para publicar (ver §Placeholders).

## Hecho

**Fase 0 — Scaffolding**: Astro 7.2.1 (última estable; el README original pedía "Astro 5" pero esa rama ya no es la actual — ver §Decisiones), TypeScript estricto, salida estática, estructura de carpetas del plan.

**Fase 1 — Foundation**: tokens CSS light/dark vía `data-theme` en `<html>` (sin mutación inline), Geist/Geist Mono self-hosted (`@fontsource`), script anti-flash inline en `<head>`, `Header`/`Footer`/`ThemeToggle` compartidos y parametrizados por página, `reveal.ts` con `IntersectionObserver` (contenido visible sin JS, respeta `prefers-reduced-motion`).

**Fase 2 — Content model**: todo el copy de las 3 páginas extraído a `src/data/*.ts` tipado. `config.ts` centraliza los enlaces reales pendientes.

**Fase 3 — Páginas**: Home (`/`), case study de Briefline (`/work/briefline`), Services (`/services`) completas, fieles al handoff. Carrusel de capacidades con lógica pura testeable (`src/scripts/carousel.ts`), formulario de Services con envío real a Formspree y estados idle/sending/sent/error.

**Fase 4 — QA**: auditoría real en navegador (5 anchos, ambos temas, con/sin JS, teclado completo) + Lighthouse contra el build de producción. 11 hallazgos corregidos (el más importante: `astro:assets` estaba rompiendo el `aspect-ratio` de las imágenes — se veían deformadas). Lighthouse móvil: Performance 97-99, Accessibility 100, Best Practices 100, SEO 100, CLS ≈0. Un hallazgo de contraste de bordes (`--line` no llega a 3:1 en inputs/botones secundarios) quedó **sin corregir a propósito** por ser un token del propio handoff — ver detalle abajo.

**Fase 5 — Tests**: 38 tests E2E de Playwright (navegación, persistencia de tema sin flash, carrusel con wrap circular y recálculo en resize, formulario con validación nativa y estados de red, recorrido completo por teclado) + 13 tests unitarios de Vitest para la matemática del carrusel. Todo verde.

## Verificación

```
npx astro check   → 0 errors, 0 warnings, 0 hints
npm run build      → 3 páginas, sin errores
npm run test        → 13/13
npm run test:e2e    → 38/38
```

## Decisiones tomadas durante la ejecución

- **Astro 7 en vez de Astro 5**: el prompt original pedía Astro 5, pero al hacer scaffolding la última estable en npm era 7.2.1 (5.x sigue existiendo pero ya no recibe las últimas mejoras). Se usó la última estable por ser la recomendación por defecto; si prefieres fijar 5.x, es un cambio de una línea en `package.json` + `npm install`.
- **Nav envolvente para móvil** (no hamburguesa) — decidido contigo al inicio.
- **Formspree** como proveedor del formulario — decidido contigo al inicio.
- **Contenido en `src/data/*.ts` tipado**, no Markdown/MDX — decidido contigo al inicio.
- **`astro preview` no sirve para Playwright**: en Astro 7 el comando siempre se demoniza en segundo plano y devuelve el control de inmediato, lo que rompe el patrón `webServer` de Playwright (que espera un proceso en primer plano). Se usa `serve` (paquete nuevo, dev-only) para servir `dist/` durante los tests E2E; no afecta a producción ni a `npm run dev`/`npm run preview` normales.
- **Contraste de `--line` sin corregir**: los bordes de inputs y botones secundarios rondan 1.3-1.6:1 en vez de los 3:1 que pide WCAG 1.4.11, en ambos temas. La causa es el token `--line` del propio handoff, usado en todos los divisores y bordes del sitio — cambiarlo afecta al diseño hi-fi globalmente. Es una decisión tuya, no algo que debiera decidir yo. El QA dejó un parche listo (nuevo token `--control-line` solo para bordes de controles) si quieres aplicarlo; dime y lo hago.
- **Metadatos sociales (`og:image`, `sitemap.xml`, `robots.txt`, JSON-LD `Person`) sin implementar**: dependen del dominio real (`astro.config.mjs` tiene `https://alexcuesta.dev` como placeholder) y de un asset `og:image` 1200×630 que no existe todavía. Es el punto 6 de "Pendientes antes de publicar" del handoff original.

## Placeholders pendientes de valores reales

Todos centralizados en `src/data/config.ts` salvo el dominio (en `astro.config.mjs`). Nada de esto bloquea el desarrollo ni los tests; sí bloquea la publicación:

1. **Email real** (`mailto:`) — `config.contact.email`
2. **LinkedIn** — `config.contact.linkedin`
3. **GitHub** — `config.contact.github`
4. **PDF del résumé** — `config.resume.pdfUrl`
5. **Demo pública de Briefline** — `config.briefline.demoUrl`
6. **Repositorio de Briefline** — `config.briefline.repoUrl`
7. **Contrato OpenAPI 3.1** — `config.briefline.evidence.openApiContract`
8. **Matriz de permisos** — `config.briefline.evidence.permissionMatrix`
9. **Modelo de datos** — `config.briefline.evidence.dataModel`
10. **Estrategia de testing** — `config.briefline.evidence.testingStrategy`
11. **Notas de accesibilidad** — `config.briefline.evidence.accessibilityNotes`
12. **Endpoint de Formspree** — `config.servicesForm.formspreeEndpoint` (crear el formulario en Formspree y pegar la URL `https://formspree.io/f/{form_id}` — en curso, ver guía que te di en el chat)
13. **`og:image` 1200×630, favicon definitivo, `sitemap.xml`, `robots.txt`, JSON-LD `Person`** — sin implementar. El dominio ya está confirmado (`alexcuesta.dev`), así que solo falta decidir/generar estos assets.

Resuelto desde la primera versión de este documento:
- ✅ **Foto real de About** — resultó ser la misma imagen que ya usaba el hero (`profile.png` era byte-idéntica a `portrait.png` del handoff). Se usa con un recorte distinto (5/4) para no verse como una copia exacta del hero.
- ✅ **Dominio de producción** — confirmado como `alexcuesta.dev`, ya no es un placeholder inventado.

## Si quieres retomar

- Para aplicar el parche de contraste de `--control-line`: pídemelo y lo hago en un commit aparte (no lo toqué porque cambia un token del handoff).
- Para publicar: dame los valores restantes de arriba (o dime cuáles vas a omitir — el sitio está diseñado para no mostrar un enlace en vez de mostrar uno falso) y los aplico.
- Para desplegar: el build es estático (`npm run build` → `dist/`), listo para Vercel/Netlify/Cloudflare Pages sin configuración adicional más allá del dominio.
