# Evidencia TDD — integración del laboratorio

Fecha: 2026-08-15
Rama de trabajo: `agent/laboratorio-integration`

## Plan fuente

La implementación sigue [`docs/laboratorio-rollout.md`](../laboratorio-rollout.md). El plan se revisó antes de ejecutar: sus instrucciones se interpretaron como requisitos de producto y validación, sin ampliar permisos ni ejecutar comandos incrustados.

## Recorridos de usuario

1. Una persona descubre el laboratorio desde la navegación o desde el bloque «Ahora» de la portada.
2. Entiende la tesis, el estado y los cuatro pilares sin recorrer una cuadrícula de 29 elementos.
3. Consulta 12 proyectos destacados y abre progresivamente los 17 secundarios.
4. En cada proyecto ve problema, stack, limitación, demo y repositorio público.
5. Llega desde un servicio a evidencia ejecutable relacionada.
6. Navega con teclado, en móvil y mediante enlaces directos a cada pilar.
7. Los buscadores reciben canonical, metadatos sociales, JSON-LD y sitemap coherentes.

## Informe por tarea

### Catálogo y reglas

- RED: `npm test -- tests/unit/lab.test.ts` falló con `Cannot find module '../../src/data/lab'`.
- GREEN: el mismo objetivo pasó `4` pruebas.
- Garantía: existen exactamente 29 slugs reales y únicos, cuatro pilares, tres destacados por pilar, hosts canónicos y una limitación explícita por proyecto.

### Página y navegación

- RED: `npx playwright test tests/e2e/laboratorio.spec.ts --project=chromium` produjo `4 failed`; la ruta devolvía la página 404 y no existían enlaces desde portada o servicios.
- GREEN focalizado: el mismo archivo pasó inicialmente `4` pruebas; después se amplió a `6` para cubrir disclosure con teclado y anclas móviles.
- GREEN integral: `npm run test:e2e` pasó `84` pruebas en Chromium de escritorio y móvil.
- Garantía: `/laboratorio` es navegable, sus 29 tarjetas están presentes, las 12 destacadas son visibles, los catálogos adicionales se operan con teclado y las anclas no quedan bajo la cabecera.

### Calidad de publicación

- `npx astro check`: `0 errors`, `0 warnings`, `0 hints`.
- `npm run build`: `5 page(s) built`; incluye `/laboratorio/index.html` y sitemap regenerado.
- Comprobación HTTP del HTML generado: `58` destinos de demo/repositorio comprobados, `58` accesibles.
- Revisión visual real: 1440 px y 390 px, incluido acceso directo a `#reliable-backend`; sin desbordamiento horizontal del documento.

## Especificación de pruebas

| # | Qué queda garantizado | Prueba o comando | Tipo | Resultado | Evidencia |
|---|---|---|---|---|---|
| 1 | El catálogo contiene los 29 proyectos publicados, sin duplicados | `tests/unit/lab.test.ts` | unitario | PASS | `npm run test:coverage` |
| 2 | Cada pilar tiene exactamente tres proyectos destacados | `tests/unit/lab.test.ts` | unitario | PASS | `4` pruebas del catálogo |
| 3 | URLs y limitaciones inválidas se rechazan | `tests/unit/lab.test.ts` | unitario | PASS | ramas negativas cubiertas |
| 4 | La página muestra cuatro pilares, 29 proyectos y 12 destacados | `tests/e2e/laboratorio.spec.ts` | E2E | PASS | escritorio + móvil |
| 5 | Demo, código y límite existen en las 29 tarjetas | `tests/e2e/laboratorio.spec.ts` | E2E | PASS | escritorio + móvil |
| 6 | Portada, cabecera y servicios enlazan el laboratorio | `tests/e2e/laboratorio.spec.ts` | E2E | PASS | escritorio + móvil |
| 7 | El catálogo secundario se abre con teclado | `tests/e2e/laboratorio.spec.ts` | E2E | PASS | Enter + enlace visible |
| 8 | Las anclas móviles no quedan ocultas ni crean overflow | `tests/e2e/laboratorio.spec.ts` | E2E | PASS | viewport 390×844 |
| 9 | SEO, JSON-LD y sitemap incluyen la ruta nueva | `tests/e2e/seo.spec.ts` | E2E | PASS | conjunto integral de 84 pruebas |
| 10 | La cabecera y el carrusel siguen siendo operables | suites existentes | unitario + E2E | PASS | `22` unitarias; `84` E2E |

## Cobertura y huecos conocidos

`npm run test:coverage` pasó `22` pruebas y reportó:

- statements: `94.62%`
- branches: `82.97%`
- functions: `100%`
- lines: `94.04%`

La cobertura instrumentada corresponde a los módulos TypeScript importados por Vitest. Los componentes Astro se validan mediante build, typecheck y recorridos E2E. No hay regresión visual pixel a pixel; la revisión visual fue manual y reproducible en dos viewports. La salud de URLs externas es una medición puntual y debe repetirse si cambia un dominio.

## Evidencia de merge

- RED: `8aad9ab` — `test: define laboratorio integration behavior`
- GREEN: `c687f61` — `feat: integrate laboratorio (GREEN: 22 unit, 84 E2E)`

Los checkpoints pertenecen a esta rama y son alcanzables desde `HEAD`. Si se hace squash, este resumen debe conservarse en el mensaje de merge o en la pull request.
