# Plan SEO — alexcuesta.dev

Fecha: 13 de agosto de 2026.
Objetivo de negocio: posicionar el portfolio para captar clientes freelance en Sevilla y su
área, sin abandonar el objetivo secundario de visibilidad para oportunidades senior de empleo.

Este documento no promete un primer puesto en ningún buscador ni sustituye una auditoría con
herramientas reales de keyword research (Search Console, Ahrefs, Semrush, etc.). Es un punto de
partida razonado a partir de patrones conocidos de SERPs y del contenido real del sitio.

---

## 1. Diagnóstico inicial

Estado del sitio antes de esta fase de trabajo:

- Todo el contenido visible estaba en inglés, con `<html lang="en">`.
- Sin metadatos de SEO: no había `canonical`, Open Graph, Twitter Card, `robots.txt`,
  sitemap ni datos estructurados (JSON-LD).
- El posicionamiento del hero era "Senior Full-Stack & Product Engineer" orientado casi en
  exclusiva a búsqueda de empleo senior — sin ninguna mención de Sevilla ni de disponibilidad
  freelance.
- `src/data/config.ts` tenía placeholders `TODO_*` para email, LinkedIn, GitHub, currículum,
  demo/repositorio de Briefline y los cinco documentos de evidencia técnica.
- El catálogo de servicios (`src/data/services.ts`) cubría tres tipos de encargo (bug rescue,
  integración de API, auditoría n8n) pero no mencionaba desarrollo de aplicaciones a medida ni
  aplicaciones móviles.

Qué se implementó en esta fase (ver también el resumen de la conversación que originó este
documento para la lista completa de archivos):

- Contenido completo traducido al español (`es-ES`), con el hero reformulado como
  "Alex Cuesta, desarrollador full-stack freelance en Sevilla" y el bloque de contacto
  reordenado para que la disponibilidad freelance sea el mensaje principal.
- Contacto real (email, LinkedIn, GitHub) publicado; currículum, demo/repositorio de Briefline
  y los cinco documentos de evidencia siguen sin URL real y sus botones se ocultan
  condicionalmente en vez de apuntar a un placeholder.
- Cuarto tipo de encargo ("04 / BUILD — Desarrollo a medida") cubriendo desarrollo de
  aplicaciones web y móviles a medida.
- `BaseLayout.astro` ampliado con canonical autorreferencial, Open Graph completo, Twitter
  Card, meta `robots` configurable y slot para JSON-LD.
- JSON-LD `Person` + `WebSite` en Home, `BreadcrumbList` + `OfferCatalog` en Servicios,
  `BreadcrumbList` en el caso de estudio de Briefline.
- Imagen social 1200×630 generada con Playwright (`public/og-image.png`).
- `@astrojs/sitemap` instalado y configurado; `public/robots.txt` con referencia al sitemap;
  `trailingSlash: 'never'` en `astro.config.mjs`.
- Página 404 en español, marcada `noindex, follow`.

---

## 2. Análisis cualitativo de competencia

**Importante**: esto es un análisis cualitativo basado en patrones conocidos de cómo se
comportan las SERPs para consultas comerciales locales de este tipo — no proviene de una
herramienta real de keyword research y no incluye cifras de volumen de búsqueda ni de
dificultad numérica. Se ofrece como contexto para priorizar el trabajo, no como dato medido.

Para consultas como "desarrollador web Sevilla" o "programador freelance Sevilla", es
razonable esperar que los primeros resultados combinen:

1. **Agencias de desarrollo web en Sevilla** — empresas con equipo, oficina y varios servicios
   (desarrollo, hosting, mantenimiento), con SEO local trabajado y presencia en Perfil de
   Empresa de Google.
2. **Freelancers individuales con portfolio propio** — el grupo más directamente comparable a
   este sitio; suelen tener menos autoridad de dominio pero copy más específico y evidencia de
   proyectos reales.
3. **Directorios y marketplaces de servicios** (Malt, Twago, LinkedIn Services, Fiverr Pro y
   similares) — páginas de perfil dentro de una plataforma de terceros, con alta autoridad de
   dominio pero contenido genérico por perfil.
4. **Portales de empleo** (InfoJobs, LinkedIn Jobs, Indeed) — aparecen sobre todo en consultas
   con intención de contratación de plantilla ("desarrollador web Sevilla empleo"), no de
   contratación freelance, pero pueden competir por consultas ambiguas.
5. **Agencias de marketing digital que ofrecen desarrollo web como servicio secundario** — su
   foco principal es SEO/SEM/redes, con una página de "desarrollo web" entre varias líneas de
   negocio; contenido menos técnico que el de este sitio.

Implicación práctica: este sitio no puede competir en autoridad de dominio con agencias
establecidas ni con marketplaces a corto plazo. Su ventaja diferencial es la especificidad
técnica y la evidencia verificable (tests, contratos, casos de estudio reales) — el contenido
debe explotar eso, no imitar el copy genérico de agencia.

### Nota sobre "diseño web Sevilla"

Se descarta como consulta objetivo principal. Alex no ofrece diseño gráfico ni de identidad de
marca como servicio (ver la exclusión explícita en el engagement "04 / BUILD"). Se trata como
adyacente: puede aparecer de forma incidental en el tráfico, pero ninguna página de este sitio
se optimiza para ella.

---

## 3. Tabla de oportunidades de keywords

Dificultad cualitativa razonada por el tipo de competencia esperada (sección 2), no por datos
de herramienta.

| Consulta | Intención | Relevancia real | Dificultad cualitativa | Página asignada | Contenido recomendado | Prioridad |
|---|---|---|---|---|---|---|
| desarrollador full-stack Sevilla | Comercial | Alta — coincide con el rol real | Media (compite con agencias y freelancers) | Home | Ya cubierto en el hero y el meta title | Alta |
| desarrollador web Sevilla | Comercial | Alta | Alta (agencias + directorios dominan) | Home | Reforzar con enlaces/menciones externas (ver sección 5) | Alta |
| programador freelance Sevilla | Comercial | Alta | Media | Home | Ya cubierto en meta description | Alta |
| desarrollo a medida Sevilla | Comercial | Alta — coincide con el nuevo engagement 04 | Media | Servicios | Ampliar el copy del engagement 04 con un caso futuro si existe | Alta |
| programador web Sevilla | Comercial | Alta | Alta | Home | Variante de "desarrollador web Sevilla", no duplicar esfuerzo | Media |
| desarrollo de aplicaciones móviles Sevilla | Comercial | Media — el sitio menciona apps móviles pero no tiene caso de estudio propio | Baja-Media (menos oferta local especializada) | Servicios | Añadir evidencia (proyecto o mención) cuando exista | Media |
| integraciones API Sevilla | Comercial, muy específica | Alta — coincide con el engagement 02 | Baja (consulta de nicho, poca oferta local) | Servicios | Ya cubierto por el engagement "02 / INTEGRATE" | Alta |
| automatización e inteligencia artificial para empresas Sevilla | Comercial, específica | Alta — coincide con engagement 03 y la experiencia en IA de Chiper | Baja-Media | Servicios | Ya cubierto por "03 / OPERATE"; podría ampliarse con un artículo futuro sobre n8n Reliability Lab | Alta |
| creación o mejora de aplicaciones web Sevilla | Comercial | Alta | Media | Servicios | Cubierto por engagement 04, reforzar con casos futuros | Media |
| desarrollo de software Sevilla | Comercial, genérica | Media — muy amplia, compite con todo el sector | Alta | Home / Servicios | No crear página dedicada; dejar que Home/Servicios respondan de forma natural | Media |
| bug fixing producción Sevilla | Transaccional, nicho | Alta — coincide con engagement 01 | Baja | Servicios | Ya cubierto por "01 / FIX" | Media |
| auditoría n8n / automatizaciones fiables | Transaccional, nicho técnico | Alta | Muy baja (consulta muy específica, casi sin oferta local) | Servicios | Ya cubierto por "03 / OPERATE" | Media |
| contratar desarrollador NestJS Sevilla | Transaccional, nicho técnico | Alta — stack real del sitio | Muy baja | Home / Servicios | Reforzar con menciones de stack en Experiencia | Baja |
| freelance React NestJS Sevilla | Transaccional, nicho | Alta | Muy baja | Home | Ya implícito en Experiencia y Capacidades | Baja |
| caso de estudio SaaS Sevilla | Informacional | Media — el caso Briefline no está geolocalizado a propósito | Baja | Case study Briefline | No forzar Sevilla aquí, mantener el enfoque técnico (ver instrucción explícita del brief) | Baja |
| desarrollador Node.js Sevilla | Transaccional, nicho técnico | Alta | Baja-Media | Home | Ya cubierto en `knowsAbout` del JSON-LD y en Experiencia | Media |
| líder técnico freelance Sevilla | Comercial, nicho | Media — objetivo secundario del sitio | Muy baja | Home | Cubierto por la mención secundaria en el eyebrow de contacto | Baja |
| diseño web Sevilla | Comercial | Baja — no es un servicio ofrecido | — (descartada) | — | No optimizar; ver nota en sección 2 | Descartada |
| desarrollo de apps a medida Sevilla | Comercial | Alta — coincide con engagement 04 | Media | Servicios | Cubierto por engagement 04 | Alta |
| soporte técnico freelance Sevilla | Comercial, ambigua | Baja — no es el posicionamiento del sitio | Media | — | No perseguir; el sitio no ofrece soporte continuo | Descartada |
| revisión de integraciones de terceros | Transaccional, nicho | Alta | Baja | Servicios | Cubierto por engagement 02 | Media |
| ingeniero de software freelance Sevilla | Comercial | Alta | Media | Home | Variante de "desarrollador full-stack Sevilla" | Media |

Ninguna keyword de prioridad alta se asigna a dos páginas a la vez: Home concentra las
consultas de marca/identidad ("desarrollador full-stack Sevilla", "desarrollador web Sevilla"),
Servicios concentra las consultas de encargo concreto ("integraciones API", "desarrollo a
medida", "automatización"), y el caso de estudio de Briefline queda fuera de la competencia
geolocalizada a propósito, como evidencia técnica, no como página de conversión local.

---

## 4. Estrategia de idioma

**Decisión**: español completo ahora (`es-ES` en todo el sitio); inglés (`/en/`) queda como
fase futura documentada, no implementada.

**Por qué**: el objetivo de negocio prioritario es SEO local en Sevilla, donde la intención de
búsqueda es abrumadoramente en español. Publicar contenido bilingüe a medias (mezclando bloques
en inglés y español en la misma página) es peor para SEO que un sitio monolingüe bien resuelto:
Google penaliza la mezcla de idiomas en una misma URL y dificulta la elección de la versión
correcta para el usuario. Migrar a `/en/` en el futuro (para el objetivo secundario de empleo
senior internacional) requiere entonces `hreflang` correcto entre ambas versiones, lo cual es
una fase de trabajo propia — no algo que se pueda improvisar como añadido de esta fase.

Cuando se aborde esa fase futura, la implementación recomendada es:
- Estructura de contenido en `src/data/*.ts` con Un objeto por idioma (o archivos `*.en.ts`
  paralelos), sin cambiar el diseño ni el layout.
- Rutas `/en/`, `/en/services`, `/en/work/briefline`.
- `hreflang` recíproco entre cada página y su equivalente en el otro idioma, más una versión
  `x-default` apuntando a la española (dado que el negocio prioritario es local).
- Sitemap actualizado para incluir ambos conjuntos de URLs.

No se han creado URLs de ejemplo para `/en/` en el código ni en `astro.config.mjs`: implementar
rutas placeholder sin contenido real habría violado la misma regla de "nunca publicar una
página placeholder" que rige el resto del sitio.

---

## 5. Acciones fuera del código que Claude Code no puede completar

Ninguna de estas acciones se ha realizado ni puede realizarse mediante cambios en el
repositorio — requieren acceso a cuentas externas, decisiones de Alex, o interacción humana con
terceros.

1. **Google Search Console**: verificar la propiedad `alexcuesta.dev`, enviar
   `sitemap-index.xml`, y solicitar indexación manual de las 3 páginas tras el primer deploy.
2. **NO crear un Perfil de Empresa de Google (antes "Google My Business")**: se descarta
   explícitamente. Un Perfil de Empresa está pensado para negocios con local físico visitable,
   horario de atención al público o zona de servicio verificable como negocio registrado. Alex
   trabaja como freelance sin local público — forzar un perfil aquí sería inconsistente con los
   datos reales (no hay dirección que enseñar) y arriesga una suspensión por incumplir las
   políticas de Google sobre información engañosa de ubicación.
3. **Consistencia de NAP-equivalente** (nombre, ubicación, servicios, contacto) entre
   LinkedIn, GitHub y el propio sitio: revisar que el titular "Alex Cuesta", la mención de
   Sevilla y el email de contacto coincidan en los tres sitios. Esto es responsabilidad de Alex
   porque implica editar perfiles de terceros.
4. **Backlinks y menciones locales legítimas**: conseguir enlaces desde comunidades tech de
   Sevilla (meetups, Slack/Discord de desarrolladores locales), directorios profesionales
   sectoriales, y colaboraciones puntuales con otras agencias/freelancers que puedan derivar
   trabajo. No se debe comprar enlaces ni usar granjas de directorios genéricos.
5. **Testimonios auténticos**: pedir a clientes reales (cuando existan, ya que el sitio hoy no
   afirma tener ninguno) una reseña verificable, con su consentimiento explícito para
   publicarla con nombre o iniciales.
6. **Comunidades, eventos y directorios profesionales de Sevilla**: participación en meetups
   locales de desarrollo (p. ej. comunidades de JavaScript/Node.js en Sevilla), y registro en
   directorios profesionales serios del sector (no marketplaces genéricos de bajo coste, que
   diluyen la percepción de especialización técnica del sitio).
7. **Revisión de backlinks de competidores**: usar una herramienta como Ahrefs, Semrush o
   Google Search Console de la competencia visible (cuando sea pública) para identificar
   patrones de enlace reproducibles de forma legítima.
8. **Plan de contenidos**: escribir artículos técnicos útiles (no genéricos) relacionados con
   el trabajo real de Alex — p. ej. sobre el desarrollo del n8n Reliability Lab, decisiones de
   arquitectura del caso Briefline, o notas técnicas de proyectos de cliente (respetando NDAs).
   Esto requiere decisiones editoriales de Alex sobre qué puede publicarse.

---

## 6. Plan de 30 / 60 / 90 días

| Plazo | Acción | Impacto | Esfuerzo | Depende de | Cómo medirlo |
|---|---|---|---|---|---|
| 0–30 días | Verificar propiedad en Search Console y enviar el sitemap | Alto (condición para indexar) | Bajo | Deploy del sitio en producción | Páginas indexadas en Search Console |
| 0–30 días | Alinear nombre/Sevilla/contacto en LinkedIn y GitHub | Medio | Bajo | Ninguna | Revisión manual de los 3 perfiles |
| 0–30 días | Resolver URLs reales de demo/repo/evidencia de Briefline | Medio (desbloquea contenido ya escrito) | Bajo (solo aportar las URLs) | Alex | Los enlaces dejan de estar ocultos en el sitio |
| 0–30 días | Decidir si se publica el currículum en PDF | Bajo-Medio | Bajo | Alex | El botón "Descargar currículum" vuelve a aparecer |
| 30–60 días | Publicar la primera pieza de contenido técnico verificable | Medio | Medio | Plan de contenidos (sección 5.8) | Impresiones nuevas en Search Console para consultas de nicho |
| 30–60 días | Buscar 2–3 menciones/enlaces legítimos desde comunidades de Sevilla | Medio-Alto | Medio | Participación activa de Alex | Nuevos dominios de referencia en Search Console o una herramienta de backlinks |
| 30–60 días | Revisar backlinks de 3–5 competidores visibles en la SERP objetivo | Bajo (es investigación, no acción directa) | Medio | Acceso a una herramienta de backlinks | Lista de oportunidades de enlace documentada |
| 60–90 días | Recoger el primer testimonio real de cliente (si existe) | Medio | Bajo | Que exista un cliente dispuesto | Testimonio publicado con consentimiento |
| 60–90 días | Revisar posición media y CTR de las keywords de prioridad alta de la tabla | — (medición, no acción) | Bajo | 60+ días de datos en Search Console | Tabla de posición/CTR actualizada |
| 60–90 días | Decidir si se aborda la fase `/en/` según el interés real detectado en empleo senior | Medio | Alto (fase de trabajo propia) | Datos de tráfico/interés acumulados | Decisión documentada, no implementación aún |

---

## 7. Sistema de medición

Métricas a revisar de forma recurrente (mensual es razonable dado el volumen esperado):

- **Search Console**: impresiones, clics, CTR y posición media por consulta y por página, para
  las keywords de prioridad alta/media de la tabla de la sección 3.
- **Páginas indexadas**: las 3 páginas canónicas deben aparecer indexadas; vigilar que el 404
  nunca se indexe (su `robots: noindex` ya lo impide, pero conviene confirmarlo en Search
  Console periódicamente).
- **Consultas de marca**: impresiones para "Alex Cuesta" (o variantes) como proxy de
  reconocimiento, separadas de las consultas genéricas de servicio.
- **Conversiones del formulario de contacto**: envíos completados vía Formspree (una vez el
  endpoint real esté configurado — ver "Datos pendientes" más abajo). Es la métrica de negocio
  real; todo lo demás es un proxy.
- **Enlaces/menciones**: nuevos dominios de referencia detectados en Search Console o en una
  herramienta de backlinks, como proxy de autoridad y visibilidad off-site.

**Aclaración explícita**: una puntuación de 100 en la categoría SEO de Lighthouse es una
comprobación técnica (metadatos presentes, HTML válido, sin bloqueos de rastreo) — no implica
ni predice posicionamiento. El posicionamiento real depende de factores fuera del control del
código: autoridad de dominio, enlaces externos, competencia y comportamiento del usuario en la
SERP.

---

## 8. Datos pendientes que Alex debe aportar

1. **PDF de currículum** — decidido no publicarlo por ahora; el botón correspondiente se ha
   quitado del hero de Home. `src/data/config.ts` mantiene el campo `resume.pdfUrl` tipado y
   documentado como pendiente para cuando exista.
2. **URLs reales de Briefline**: demo pública, repositorio, y los cinco documentos de evidencia
   (contrato OpenAPI, matriz de permisos, modelo de datos, estrategia de testing, notas de
   accesibilidad). Se pidieron explícitamente dos veces durante esta fase y no se recibieron;
   los botones y enlaces correspondientes permanecen ocultos (no publicados como placeholder)
   hasta que existan.
3. **Endpoint real de Formspree** (`src/data/config.ts` → `servicesForm.formspreeEndpoint`):
   sigue siendo `TODO_FORMSPREE_ENDPOINT`. Esto es una condición preexistente a esta fase de
   trabajo (no se pidió resolverla) y significa que el formulario de contacto de Servicios no
   puede enviar mensajes reales todavía — solo demuestra correctamente su estado de error, tal
   y como documenta el propio componente (`src/components/ContactForm.astro`).
4. **Decisión sobre la migración a inglés (`/en/`)**: documentada como fase futura en la
   sección 4, no implementada. Requiere que Alex confirme si sigue siendo prioritario captar
   empleo senior internacional en inglés, y con qué urgencia frente al objetivo local en
   español.
5. **Contenido para las keywords de nicho** ("apps móviles Sevilla", "automatización IA
   Sevilla"): el copy actual las cubre de forma genérica; reforzar su relevancia real requiere
   un caso de estudio o proyecto público futuro en esas áreas, que hoy no existe.
