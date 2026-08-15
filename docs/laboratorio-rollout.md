# Plan de integración del Laboratorio

Fecha: 15 de agosto de 2026.

## Decisión

El portfolio mantendrá tres profundidades de evidencia:

1. **Trabajo seleccionado**: dos historias con contexto y resultado. Briefline y Chiper no cambian de categoría.
2. **Laboratorio**: una nueva ruta `/laboratorio` que demuestra amplitud mediante 29 demos técnicas agrupadas por capacidad.
3. **Demo y repositorio**: cada entrada delega la exploración profunda a su subdominio y a GitHub.

El Laboratorio no se presentará como trabajo de cliente ni como una colección de productos en producción. Su función es demostrar, de forma ejecutable, cómo se analizan contratos, fallos, concurrencia, datos y automatizaciones.

## Estado de despliegue verificado

- 29 de 29 demos responden HTTP 200 en `https://<slug>.alexcuesta.dev`.
- 17 demos se sirven mediante Cloudflare Pages.
- 12 demos se sirven como Cloudflare Workers con assets estáticos.
- `webhook-reliability-playground` mantiene además un Worker con D1 para su flujo servidor.
- El resto funciona con fixtures, estado local o ejecución determinista en navegador.
- No se necesita Neon en esta fase. Añadir una segunda base de datos aumentaría operación sin mejorar la prueba que ofrece ninguna demo actual.

Los dominios `pages.dev` y `workers.dev` quedan como origen operativo. El portfolio enlazará siempre a los dominios canónicos `*.alexcuesta.dev`.

## Tesis narrativa

La página no abre con “29 proyectos”. Abre con la idea que los conecta:

> Construyo sistemas que explican qué ocurre cuando algo falla. Estas demos hacen visibles los contratos, reintentos, permisos y decisiones que normalmente quedan escondidos.

“29 demos públicas” es evidencia secundaria, no el titular. El objetivo es que un posible cliente reconozca su problema antes de encontrarse con el nombre de una tecnología.

## Estructura de `/laboratorio`

### 1. Apertura

- Eyebrow: `LABORATORIO · CÓDIGO PÚBLICO`.
- H1: `Los caminos difíciles, puestos a la vista.`
- Lead: explica que son demostraciones deterministas, no sistemas de cliente ni afirmaciones de escala productiva.
- Evidencia verificable: 29 demos públicas, 2.494 pruebas unitarias y 244 recorridos de navegador aprobados en la auditoría del 15 de agosto de 2026.
- Acción principal: `Explorar por problema`.
- Acción secundaria: `Ver repositorios en GitHub`.

Las cifras deben incluir fecha o generarse desde un manifiesto auditado; no deben convertirse en contadores permanentes que envejezcan sin contexto.

### 2. Cuatro problemas reconocibles

Los pilares actuales se conservan, pero se presentan desde el problema del visitante:

| Pilar interno | Pregunta visible | Promesa |
| --- | --- | --- |
| Ingeniería de producto y API | ¿Tu frontend, API y tests entienden el mismo contrato? | Contratos y cambios incompatibles hechos visibles. |
| Sistemas backend fiables | ¿Qué ocurre al repetir, retrasar o duplicar una operación? | Reintentos, idempotencia y recuperación que pueden recorrerse. |
| Herramientas internas y workflows | ¿Tu equipo puede operar datos complejos sin perder el contexto? | Interfaces densas, auditables y operables por teclado. |
| Automatización e IA | ¿Puedes explicar por qué una automatización decidió actuar? | Selección, validación, confianza, replay y escalado explícitos. |

Cada pilar muestra tres flagships. El resto permanece en el HTML dentro de un `<details>` nativo cuyo texto usa el recuento real del grupo: `Ver las otras N demos de este problema`.

### 3. Flagships recomendados

La selección prioriza claridad de la demo, relación con servicios vendibles y diferenciación. No pretende ordenar los repositorios por valor absoluto.

#### Producto y API

1. `api-contract-diff`
2. `rest-failure-matrix`
3. `mcp-contract-linter`

#### Backend fiable

1. `webhook-reliability-playground`
2. `idempotency-key-visualizer`
3. `queue-retry-simulator`

Esta selección sustituye `jwt-misconfiguration-lab` por `idempotency-key-visualizer`: la tríada webhook, idempotencia y reintento cierra mejor la promesa actual sobre fiabilidad y n8n. JWT continúa visible dentro del grupo.

#### Herramientas internas

1. `csv-import-reliability-lab`
2. `incident-timeline-builder`
3. `accessible-admin-table`

#### Automatización e IA

1. `ai-function-calling-sandbox`
2. `prompt-regression-runner`
3. `support-triage-simulator`

### 4. Anatomía de una entrada

Cada entrada debe contener solo:

- nombre legible;
- una frase sobre el problema que permite explorar;
- stack corto;
- estado `Demo pública`;
- CTA `Abrir demo`;
- CTA secundario `Ver código`;
- un límite honesto y específico.

No se usarán métricas inventadas, niveles de madurez ambiguos, estrellas decorativas ni palabras como “enterprise” o “producción” para describir las demos.

### 5. Cierre comercial

La página termina conectando evidencia con encargo, no con otra galería:

> Si uno de estos fallos se parece al que estás viendo en tu producto, podemos acotar el caso y revisar la ruta crítica.

CTA: `Contarme el problema` hacia `/services#contact`.

## Cambios en el resto del portfolio

### Home

- “Trabajo seleccionado” conserva exactamente dos entradas.
- “Ahora” deja de anunciar un proyecto futuro y enlaza a `/laboratorio#backend-fiable`.
- Las cuatro capacidades ganan un enlace corto `Ver pruebas de esta capacidad`.
- No se añade una cuadrícula de proyectos a la home.

### Navegación

- Añadir `Laboratorio` después de `Trabajo` en Header y Footer.
- Extender `activeNav` con `lab`.
- Revisar el header a 320, 768 y 1024 px: un quinto enlace puede forzar una segunda línea junto al CTA.
- Si no cabe con claridad, el CTA conserva prioridad y `Sobre mí` pasa al footer en móvil; no se reduce el tamaño táctil.

### Servicios

Cada encargo añade un único bloque `Pruebas relacionadas`, con dos o tres enlaces relevantes:

- Bug Rescue 90: `incident-timeline-builder`, `audit-log-explorer`.
- Revisión de integración API: `api-contract-diff`, `rest-failure-matrix`, `webhook-reliability-playground`.
- Auditoría de fiabilidad n8n: `queue-retry-simulator`, `idempotency-key-visualizer`, `slo-error-budget-calculator`.
- Desarrollo a medida: `architecture-decision-explorer`, `event-schema-registry-mini`, `accessible-admin-table`.

Las referencias sirven para demostrar el método. No convierten cada servicio en una lista de tecnologías.

## Dirección visual

No se crea una submarca ni una paleta “de laboratorio”. La página hereda Geist Sans, Geist Mono y los tokens existentes.

- Canvas: `#F7F8F5`.
- Surface: `#FFFFFF`.
- Ink: `#111713`.
- Muted: `#58635D`.
- Accent: `#2257D6`.
- Line: `#D8DEDA`.

El elemento distintivo será una **traza de fallo** vertical: cada pilar empieza con una secuencia breve del tipo `entrada → decisión → fallo → recuperación`. No es decoración; resume el comportamiento que las demos permiten recorrer. El resto de la página mantiene la sobriedad editorial del portfolio.

## Modelo de datos

Crear `src/data/lab.ts` con un manifiesto tipado:

```ts
type LabPillar = 'product-api' | 'reliable-backend' | 'internal-tools' | 'ai-automation';

interface LabProject {
  slug: string;
  title: string;
  problem: string;
  pillar: LabPillar;
  flagship: boolean;
  stack: string[];
  demoUrl: `https://${string}.alexcuesta.dev`;
  repoUrl: `https://github.com/Aredex/${string}`;
  limitation: string;
}
```

El build debe fallar si:

- falta uno de los 29 slugs;
- se repite un slug o una URL;
- un pilar no tiene exactamente tres flagships;
- una URL no usa HTTPS o no pertenece a los hosts permitidos;
- una entrada no declara su límite.

## SEO y metadatos

- Meta title: `Laboratorio de ingeniería | Alex Cuesta`.
- Description: `Demos públicas sobre contratos API, reintentos, idempotencia, herramientas internas y automatización explicable.`
- Canonical: `https://alexcuesta.dev/laboratorio`.
- JSON-LD: `BreadcrumbList` y `CollectionPage` con `hasPart` solo para los 12 flagships.
- Sitemap: verificar la inclusión automática de `/laboratorio`.
- Idioma: español. La futura fase `/en/` debe traducir el portfolio completo, no solo esta página.

## Despliegue y operación

### Ahora

- Mantener las 29 demos en Cloudflare y sus dominios actuales.
- No migrar Pages a Workers ni Workers a Pages solo para uniformar la tabla.
- No añadir Neon.
- Enlazar únicamente los dominios `*.alexcuesta.dev` desde el portfolio.

### Automatización siguiente

1. Añadir a cada repositorio un workflow de build, tests y despliegue desde `main` o documentar el mecanismo actual si ya existe.
2. Crear un manifiesto de salud que compruebe diariamente los 29 dominios y avise solo tras dos fallos consecutivos.
3. Validar tras cada deploy: HTTP 200, título visible, ausencia de errores de consola y CTA principal operable.
4. No consultar los 29 despliegues desde el navegador del visitante; el estado mostrado en el portfolio debe generarse en build o mantenerse como copy fechado.

## Orden de implementación

### Fase 1 — Página autónoma

- `src/data/lab.ts`.
- `src/pages/laboratorio.astro`.
- Validadores unitarios del manifiesto.
- E2E de navegación, `<details>`, enlaces externos y teclado.

Entrega: `/laboratorio` funciona aunque todavía no haya enlaces desde otras páginas.

### Fase 2 — Integración narrativa

- Header y Footer.
- `now.ts` con enlace real.
- Enlaces desde las cuatro capacidades.
- Referencias relacionadas en Servicios.

Entrega: el laboratorio deja de ser una isla y demuestra las afirmaciones comerciales existentes.

### Fase 3 — SEO y accesibilidad

- `labMeta`, canonical, JSON-LD y sitemap.
- Revisión WCAG 2.1 AA, foco, contraste, landmarks y reduced motion.
- Prueba del header en móvil y de los 29 enlaces.

### Fase 4 — Publicación

- Build, tipos, unit tests y E2E.
- Deploy de preview del portfolio.
- Revisión visual en móvil y escritorio.
- Publicación en `alexcuesta.dev`.
- Smoke test de `/`, `/services`, `/work/briefline`, `/laboratorio` y los 12 flagships.

## Criterios de aceptación

- Los 29 proyectos aparecen una sola vez y bajo un único pilar.
- Solo 12 aparecen expandidos por defecto.
- Briefline sigue teniendo más prominencia que cualquier demo del laboratorio.
- Cada demo tiene enlace público, repositorio y limitación honesta.
- “Ahora” ya no promete algo futuro.
- Servicios enlaza evidencia sin convertirse en catálogo.
- La página funciona sin JavaScript, salvo las mejoras ya compartidas por el sitio.
- Build, tests unitarios, E2E y accesibilidad quedan en verde.

## Decisiones recomendadas

- **Selección**: aprobar los 12 flagships de este documento.
- **Idioma**: español en esta fase.
- **Alcance**: incluir los 29; los cuatro proyectos reducidos se describen con límites, no se ocultan.
- **Badge**: `LABORATORIO · CÓDIGO PÚBLICO`.
- **Datos**: Cloudflare D1 solo donde ya existe; Neon no entra hasta que un proyecto tenga una necesidad persistente real.
- **Prioridad**: implementar primero la página y su manifiesto; no tocar la home antes de que `/laboratorio` sea navegable.
