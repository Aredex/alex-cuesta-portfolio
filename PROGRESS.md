# PROGRESS — Portfolio Alex Cuesta

Estado: **build completo**. Las 3 páginas están implementadas, revisadas contra el handoff, con QA de accesibilidad/rendimiento/fidelidad aplicado y tests automatizados pasando. Pendiente de valores reales para publicar (ver §Placeholders).

## Hecho

**Fase 0 — Scaffolding**: Astro 7.2.1 (última estable; el README original pedía "Astro 5" pero esa rama ya no es la actual — ver §Decisiones), TypeScript estricto, salida estática, estructura de carpetas del plan.

**Fase 1 — Foundation**: tokens CSS light/dark vía `data-theme` en `<html>` (sin mutación inline), Geist/Geist Mono self-hosted (`@fontsource`), script anti-flash inline en `<head>`, `Header`/`Footer`/`ThemeToggle` compartidos y parametrizados por página, `reveal.ts` con `IntersectionObserver` (contenido visible sin JS, respeta `prefers-reduced-motion`).

**Fase 2 — Content model**: todo el copy de las 3 páginas extraído a `src/data/*.ts` tipado. `config.ts` centraliza los enlaces reales pendientes.

**Fase 3 — Páginas**: Home (`/`), case study de Briefline (`/work/briefline`), Services (`/services`) completas, fieles al handoff. Carrusel de capacidades con lógica pura testeable (`src/scripts/carousel.ts`), formulario de Services con envío real a Formspree y estados idle/sending/sent/error. Si Formspree no está configurado, se publica un contacto directo por email en vez de un formulario roto.

**Fase 4 — QA**: auditoría real en navegador (5 anchos, ambos temas, con/sin JS, teclado completo) + Lighthouse contra el build de producción. 11 hallazgos corregidos (el más importante: `astro:assets` estaba rompiendo el `aspect-ratio` de las imágenes — se veían deformadas). Lighthouse móvil: Performance 97-99, Accessibility 100, Best Practices 100, SEO 100, CLS ≈0. Un hallazgo de contraste de bordes (`--line` no llega a 3:1 en inputs/botones secundarios) quedó **sin corregir a propósito** por ser un token del propio handoff — ver detalle abajo.

**Fase 5 — Tests**: 66 tests E2E de Playwright (navegación, persistencia de tema sin flash, carrusel con wrap circular y recálculo en resize, formulario con validación nativa y estados de red, SEO técnico y recorrido completo por teclado) + 16 tests unitarios de Vitest. Todo verde.

## Verificación

```
npx astro check   → 0 errors, 0 warnings, 0 hints
npm run build      → 3 páginas públicas + 404, sin errores
npm run test        → 16/16
npm run test:e2e    → 66/66
```

## Decisiones tomadas durante la ejecución

- **Astro 7 en vez de Astro 5**: el prompt original pedía Astro 5, pero al hacer scaffolding la última estable en npm era 7.2.1 (5.x sigue existiendo pero ya no recibe las últimas mejoras). Se usó la última estable por ser la recomendación por defecto; si prefieres fijar 5.x, es un cambio de una línea en `package.json` + `npm install`.
- **Nav envolvente para móvil** (no hamburguesa) — decidido contigo al inicio.
- **Formspree** como proveedor del formulario — decidido contigo al inicio.
- **Contenido en `src/data/*.ts` tipado**, no Markdown/MDX — decidido contigo al inicio.
- **`astro preview` no sirve para Playwright**: en Astro 7 el comando siempre se demoniza en segundo plano y devuelve el control de inmediato, lo que rompe el patrón `webServer` de Playwright (que espera un proceso en primer plano). Se usa `serve` (paquete nuevo, dev-only) para servir `dist/` durante los tests E2E; no afecta a producción ni a `npm run dev`/`npm run preview` normales.
- **Contraste de `--line` sin corregir**: los bordes de inputs y botones secundarios rondan 1.3-1.6:1 en vez de los 3:1 que pide WCAG 1.4.11, en ambos temas. La causa es el token `--line` del propio handoff, usado en todos los divisores y bordes del sitio — cambiarlo afecta al diseño hi-fi globalmente. Es una decisión tuya, no algo que debiera decidir yo. El QA dejó un parche listo (nuevo token `--control-line` solo para bordes de controles) si quieres aplicarlo; dime y lo hago.
- **SEO técnico implementado**: canonical, Open Graph/Twitter, `og:image` 1200×630, sitemap, robots, datos estructurados y 404 `noindex` se verifican en navegador. El dominio de producción es `alexcuesta.dev`.

## Placeholders pendientes de valores reales

Todos centralizados en `src/data/config.ts`. Nada de esto bloquea el desarrollo ni los tests; sí bloquea la publicación:

1. **PDF del résumé** — `config.resume.pdfUrl`. El CTA "Descargar CV" queda oculto hasta que exista.

Resuelto:
- ✅ **Foto real de About** — resultó ser la misma imagen que ya usaba el hero (`profile.png` era byte-idéntica a `portrait.png` del handoff). Se usa con un recorte distinto (5/4) para no verse como una copia exacta del hero.
- ✅ **Dominio de producción** — confirmado como `alexcuesta.dev`, ya no es un placeholder inventado.
- ✅ **SEO técnico y assets sociales** — canonical, Open Graph/Twitter, `og:image`, sitemap, robots y JSON-LD publicados en el build.
- ✅ **Endpoint de Formspree** — `https://formspree.io/f/maewbjoq`, configurado como `PUBLIC_FORMSPREE_ENDPOINT` en `.env` local (no versionado; hay que replicarlo como variable de entorno en el hosting de producción antes de desplegar).
- ✅ **Email / LinkedIn / GitHub** — `config.contact.*`.
- ✅ **Demo y repositorio de Briefline** — `briefline.alexcuesta.dev/login` (con selección de cuenta demo) y `github.com/Aredex/briefline-crm`.
- ✅ **Los 5 documentos de evidencia de Briefline** (contrato OpenAPI, matriz de permisos, modelo de datos, estrategia de testing, notas de accesibilidad) — enlazados directamente a los archivos reales y públicos del repo `briefline-crm` (`packages/api-contract/openapi.yaml` y `.claude/plans/*.md`), verificados con `curl` (200 en los 5).

## Si quieres retomar

- Para aplicar el parche de contraste de `--control-line`: pídemelo y lo hago en un commit aparte (no lo toqué porque cambia un token del handoff).
- Para publicar: dame los valores restantes de arriba (o dime cuáles vas a omitir — el sitio está diseñado para no mostrar un enlace en vez de mostrar uno falso) y los aplico.
- Para desplegar: el build es estático (`npm run build` → `dist/`), listo para Vercel/Netlify/Cloudflare Pages sin configuración adicional más allá del dominio.
