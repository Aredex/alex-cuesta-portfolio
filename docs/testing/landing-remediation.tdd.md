# Evidencia TDD — remediación de la landing

Fecha: 2026-08-17

## Alcance

Los recorridos y garantías se derivan de la solicitud de remediación: carrusel móvil estable, recuento del catálogo sin duplicación, validación completa del manifiesto y estado editorial honesto para la demo Webhook degradada. No se crean commits por instrucción expresa.

## Recorridos de usuario

1. Una persona puede usar el carrusel móvil solo después de que su layout y controles estén inicializados.
2. Una persona ve el recuento real del manifiesto en la portada, metadatos y laboratorio.
3. El build rechaza entradas incompletas, duplicadas o con URLs derivadas incoherentes.
4. Una persona identifica Webhook Reliability Playground como degradado y no recibe un enlace promocional a una demo rota.

## Evidencia RED / GREEN

### Carrusel móvil

- RED E2E: `./node_modules/.bin/playwright test tests/e2e/carousel.spec.ts --project=mobile-chrome --grep 'initializes mobile controls before accepting navigation'` ejecutó 1 prueba y falló en `toHaveAttribute('data-carousel-ready', 'true')`: esperado `"true"`, recibido `""`.
- RED unitario: `./node_modules/.bin/vitest run tests/unit/carousel.test.ts` ejecutó 15 pruebas; 14 pasaron y 1 falló porque `root.dataset.carouselReady` era `undefined` en lugar de `"true"`.
- Diagnóstico: el contador renderizado en servidor ya satisfacía la espera E2E antes de que el módulo diferido instalara listeners; además, el contador cambia antes de que termine la transición CSS del track. La regresión espera una señal de layout/listeners listos y observa la transformación con polling de estado, sin sleeps ni reintentos.
- GREEN: `npm test -- --maxWorkers=1 --no-file-parallelism` dejó 25/25 unitarias verdes; la suite E2E completa con `--workers=1` dejó 88/88 y la regresión móvil repetida con `--repeat-each=10 --workers=1` dejó 10/10.

### Recuento derivado del catálogo

- RED: `./node_modules/.bin/vitest run tests/unit/lab.test.ts` ejecutó 5 pruebas; 4 pasaron y 1 falló. La garantía `derives current catalog counts without hard-coded production copy` encontró el literal `29` empezando por `src/data/lab.ts`.
- Garantía buscada: el recuento se deriva de `labProjects.length` y los archivos actuales de datos, SEO y página no duplican el número; la evidencia histórica queda fuera de esta regla.
- GREEN: `LAB_PROJECT_COUNT` se deriva de `labProjects.length`; `now.ts`, `site.ts` y `laboratorio.astro` consumen la constante y la prueba estructural queda verde.

### Validación del manifiesto

- RED: `./node_modules/.bin/vitest run tests/unit/lab.test.ts` ejecutó 6 pruebas; 5 pasaron y 1 falló. El validador solo devolvió errores de URL/limitación/slug duplicado y no detectó slug malformado, título, problema, pilar, stack ni URLs duplicadas.
- Garantía buscada: cada campo obligatorio es válido en runtime, los pilares pertenecen al manifiesto y slug/demo/repositorio mantienen formato, unicidad y derivación canónica.
- GREEN: el validador comprueba campos obligatorios, referencias de pilar, formato/unicidad de slug, stack y derivación/unicidad de URLs; las 25 unitarias pasan.

### Estado editorial de Webhook

- RED de datos: `./node_modules/.bin/vitest run tests/unit/lab.test.ts` ejecutó 7 pruebas; 6 pasaron y 1 falló. Webhook seguía con `flagship: true` y sin `status: 'degraded'`.
- RED de interfaz: `./node_modules/.bin/playwright test tests/e2e/laboratorio.spec.ts --project=chromium --grep 'presenta Webhook como degradado'` ejecutó 1 prueba y falló primero por ausencia de `data-status`; al ampliar la garantía editorial volvió a fallar porque la métrica decía `demo y código públicos` en vez de `código público`.
- Garantía buscada: Webhook permanece en el catálogo con nota CORS, pero no se promociona como flagship ni evidencia comercial; los cuatro pilares conservan tres flagships activos.
- GREEN de datos e interfaz: Webhook queda `degraded`, sin demo ni promoción, con nota CORS y código accesible; 25/25 unitarias y 88/88 E2E pasan.

## Especificación de pruebas

| # | Garantía | Prueba o comando | Tipo | Resultado |
|---|---|---|---|---|
| 1 | El carrusel móvil anuncia que está listo solo tras layout y listeners, habilita controles y completa el desplazamiento | `tests/unit/carousel.test.ts`, `tests/e2e/carousel.spec.ts` | unitario + E2E | GREEN: 25/25 unit; 88/88 E2E; 10/10 repetición móvil |
| 2 | El recuento actual se deriva del manifiesto y no aparece como literal en copy/SEO/página | `tests/unit/lab.test.ts` | unitario estructural | GREEN |
| 3 | El manifiesto rechaza campos incompletos, referencias inválidas, duplicados y URLs incoherentes | `tests/unit/lab.test.ts` | unitario | GREEN |
| 4 | Webhook se conserva como degradado, con causa honesta y sin promoción | `tests/unit/lab.test.ts`, `tests/e2e/laboratorio.spec.ts` | unitario + E2E | GREEN |

## Cobertura y comprobaciones finales

- `npm test -- --maxWorkers=1 --no-file-parallelism`: 3 archivos, 25/25 pruebas.
- `npx astro check`: 0 errores, 0 warnings y 4 hints preexistentes en artefactos de cobertura.
- `npm run build`: 5 páginas estáticas, build correcto.
- `npm run test:e2e -- --workers=1`: 88/88.
- `npx playwright test tests/e2e/carousel.spec.ts --project=mobile-chrome --grep 'initializes mobile controls before accepting navigation' --repeat-each=10 --workers=1`: 10/10.
