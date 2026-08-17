export type LabPillarId =
  | 'product-api'
  | 'reliable-backend'
  | 'internal-tools'
  | 'ai-automation';

export const LAB_PROJECT_SLUGS = [
  'api-contract-diff',
  'rest-failure-matrix',
  'mcp-contract-linter',
  'mcp-app-ui-kit',
  'event-schema-registry-mini',
  'feature-flag-rollout-lab',
  'architecture-decision-explorer',
  'webhook-reliability-playground',
  'idempotency-key-visualizer',
  'queue-retry-simulator',
  'jwt-misconfiguration-lab',
  'oauth-oidc-flow-explorer',
  'rbac-policy-playground',
  'api-security-header-auditor',
  'offline-sync-conflict-lab',
  'csv-import-reliability-lab',
  'incident-timeline-builder',
  'accessible-admin-table',
  'audit-log-explorer',
  'data-anonymizer',
  'postgresql-index-coach',
  'migration-risk-reviewer',
  'slo-error-budget-calculator',
  'cloud-cost-architecture-simulator',
  'ai-function-calling-sandbox',
  'prompt-regression-runner',
  'support-triage-simulator',
  'local-rag-evaluator',
  'serverless-image-pipeline',
] as const;

export type LabProjectSlug = (typeof LAB_PROJECT_SLUGS)[number];
export type LabProjectStatus = 'active' | 'degraded' | 'planned';

export interface LabPillar {
  id: LabPillarId;
  index: string;
  title: string;
  thesis: string;
  trace: readonly [string, string, string];
}

export interface LabProject {
  slug: LabProjectSlug;
  title: string;
  problem: string;
  pillar: LabPillarId;
  flagship: boolean;
  stack: readonly string[];
  demoUrl: string;
  repoUrl: string;
  limitation: string;
  status: LabProjectStatus;
  statusNote?: string;
}

export const labPillars: readonly LabPillar[] = [
  {
    id: 'product-api',
    index: '01 / CONTRACT',
    title: 'Producto y contratos API',
    thesis: 'Hacer visible la distancia entre el contrato que prometemos y el comportamiento que entregamos.',
    trace: ['Contrato', 'Divergencia', 'Decisión'],
  },
  {
    id: 'reliable-backend',
    index: '02 / RECOVER',
    title: 'Backend fiable',
    thesis: 'Estudiar duplicados, reintentos, concurrencia y recuperación antes de que el fallo llegue a producción.',
    trace: ['Señal', 'Fallo', 'Recuperación'],
  },
  {
    id: 'internal-tools',
    index: '03 / OPERATE',
    title: 'Herramientas internas',
    thesis: 'Convertir datos y operaciones complejas en interfaces que explican su propio estado.',
    trace: ['Entrada', 'Validación', 'Resultado'],
  },
  {
    id: 'ai-automation',
    index: '04 / VERIFY',
    title: 'IA y automatización',
    thesis: 'Probar sistemas probabilísticos con límites, fixtures y resultados que se puedan repetir.',
    trace: ['Ejecución', 'Evaluación', 'Replay'],
  },
] as const;

const project = (
  slug: LabProjectSlug,
  title: string,
  problem: string,
  pillar: LabPillarId,
  flagship: boolean,
  stack: readonly string[],
  limitation: string,
  status: LabProjectStatus = 'active',
  statusNote?: string
): LabProject => ({
  slug,
  title,
  problem,
  pillar,
  flagship,
  stack,
  demoUrl: `https://${slug}.alexcuesta.dev`,
  repoUrl: `https://github.com/Aredex/${slug}`,
  limitation,
  status,
  statusNote,
});

export const labProjects: readonly LabProject[] = [
  project(
    'api-contract-diff',
    'API Contract Diff',
    'Distingue cambios compatibles de rupturas antes de publicar una nueva especificación.',
    'product-api',
    true,
    ['OpenAPI', 'TypeScript', 'Astro'],
    'Compara especificaciones cargadas en el navegador; no inspecciona APIs remotas ni sustituye una revisión humana.'
  ),
  project(
    'rest-failure-matrix',
    'REST Failure Matrix',
    'Convierte estados HTTP, reintentos y respuestas parciales en una matriz de comportamiento explícita.',
    'product-api',
    true,
    ['REST', 'TypeScript', 'Vitest'],
    'Trabaja con escenarios simulados y no envía peticiones contra una API real.'
  ),
  project(
    'mcp-contract-linter',
    'MCP Contract Linter',
    'Detecta herramientas ambiguas, esquemas débiles y metadatos que dificultan el uso fiable de un servidor MCP.',
    'product-api',
    true,
    ['MCP', 'JSON Schema', 'TypeScript'],
    'Analiza manifiestos estáticos; no ejecuta herramientas ni certifica la seguridad de un servidor MCP.'
  ),
  project(
    'mcp-app-ui-kit',
    'MCP App UI Kit',
    'Documenta estados y patrones de interfaz para aplicaciones conectadas mediante MCP.',
    'product-api',
    false,
    ['MCP Apps', 'React', 'Accessibility'],
    'Es un kit de referencia y no un sistema de componentes listo para instalar en producción.'
  ),
  project(
    'event-schema-registry-mini',
    'Event Schema Registry Mini',
    'Hace revisables los cambios de esquema antes de que productores y consumidores se descoordinen.',
    'product-api',
    false,
    ['Events', 'JSON Schema', 'TypeScript'],
    'Mantiene un registro local de demostración y no se conecta a brokers ni aplica políticas distribuidas.'
  ),
  project(
    'feature-flag-rollout-lab',
    'Feature Flag Rollout Lab',
    'Permite razonar sobre porcentajes, cohortes y rollback antes de activar una funcionalidad.',
    'product-api',
    false,
    ['Feature flags', 'Hashing', 'TypeScript'],
    'Simula asignaciones deterministas y no incluye un SDK ni sincronización con runtimes reales.'
  ),
  project(
    'architecture-decision-explorer',
    'Architecture Decision Explorer',
    'Relaciona decisiones, alternativas y consecuencias para evitar que la arquitectura pierda contexto.',
    'product-api',
    false,
    ['ADR', 'Graph UI', 'Astro'],
    'Explora un conjunto local de decisiones y no indexa automáticamente repositorios externos.'
  ),
  project(
    'webhook-reliability-playground',
    'Webhook Reliability Playground',
    'Reproduce entregas duplicadas, fuera de orden y fallidas para practicar una recuperación segura.',
    'reliable-backend',
    false,
    ['Cloudflare Workers', 'D1', 'Webhooks'],
    'Opera a escala de demostración con payloads sintéticos; no es una pasarela de webhooks gestionada.'
  ),
  project(
    'idempotency-key-visualizer',
    'Idempotency Key Visualizer',
    'Muestra cómo una misma intención produce una sola operación aunque la petición se repita.',
    'reliable-backend',
    true,
    ['Idempotency', 'State machine', 'TypeScript'],
    'La máquina de estados vive en el navegador y no modela consenso ni almacenamiento distribuido.'
  ),
  project(
    'queue-retry-simulator',
    'Queue Retry Simulator',
    'Compara backoff, jitter, límites de intento y colas de mensajes fallidos bajo carga controlada.',
    'reliable-backend',
    true,
    ['Queues', 'Backoff', 'TypeScript'],
    'La cola y el reloj son simulados; no publica mensajes en un broker real.'
  ),
  project(
    'jwt-misconfiguration-lab',
    'JWT Misconfiguration Lab',
    'Expone claims, tiempos y errores comunes sin enviar el token fuera del navegador.',
    'reliable-backend',
    true,
    ['JWT', 'Security', 'Web Crypto'],
    'Es una herramienta educativa de inspección y no valida la confianza operativa de un emisor.'
  ),
  project(
    'oauth-oidc-flow-explorer',
    'OAuth/OIDC Flow Explorer',
    'Hace visible cada transición de Authorization Code con PKCE y sus puntos de fallo.',
    'reliable-backend',
    false,
    ['OAuth 2.1', 'PKCE', 'State machine'],
    'Simula el protocolo localmente y no autentica contra un proveedor de identidad real.'
  ),
  project(
    'rbac-policy-playground',
    'RBAC Policy Playground',
    'Permite probar roles, recursos y acciones antes de trasladar una política al backend.',
    'reliable-backend',
    false,
    ['RBAC', 'Policy testing', 'TypeScript'],
    'Evalúa políticas de ejemplo y no actúa como middleware de autorización en producción.'
  ),
  project(
    'api-security-header-auditor',
    'API Security Header Auditor',
    'Explica qué cabeceras de seguridad existen, cuáles faltan y por qué importa cada una.',
    'reliable-backend',
    false,
    ['HTTP', 'Security headers', 'Astro'],
    'Analiza respuestas de muestra y no realiza escaneos remotos ni sustituye una auditoría de seguridad.'
  ),
  project(
    'offline-sync-conflict-lab',
    'Offline Sync Conflict Lab',
    'Compara estrategias de resolución cuando dos réplicas editan el mismo dato sin conexión.',
    'reliable-backend',
    false,
    ['Offline-first', 'Conflict resolution', 'TypeScript'],
    'Modela dos réplicas locales y no reproduce todas las garantías de una base de datos distribuida.'
  ),
  project(
    'csv-import-reliability-lab',
    'CSV Import Reliability Lab',
    'Separa validación, previsualización y confirmación para evitar importaciones irreversibles.',
    'internal-tools',
    true,
    ['CSV', 'Validation', 'React'],
    'Procesa archivos locales y no persiste datos ni ejecuta migraciones en un sistema externo.'
  ),
  project(
    'incident-timeline-builder',
    'Incident Timeline Builder',
    'Ordena señales dispersas en una cronología que ayuda a explicar impacto, causa y recuperación.',
    'internal-tools',
    true,
    ['Incidents', 'Timeline', 'TypeScript'],
    'Utiliza eventos manuales o sintéticos y no ingiere telemetría desde plataformas de observabilidad.'
  ),
  project(
    'accessible-admin-table',
    'Accessible Admin Table',
    'Demuestra filtrado, selección y acciones densas sin sacrificar navegación por teclado.',
    'internal-tools',
    true,
    ['Accessibility', 'Data grid', 'React'],
    'Usa datos generados y no incluye autenticación, permisos ni un backend administrativo.'
  ),
  project(
    'audit-log-explorer',
    'Audit Log Explorer',
    'Permite seguir quién cambió qué y reconstruir una secuencia de acciones verificable.',
    'internal-tools',
    false,
    ['Audit logs', 'Integrity', 'TypeScript'],
    'Explora registros de demostración y no captura eventos de aplicaciones externas.'
  ),
  project(
    'data-anonymizer',
    'Data Anonymizer',
    'Compara técnicas de enmascarado y generalización sobre conjuntos de datos sensibles.',
    'internal-tools',
    false,
    ['Privacy', 'Anonymization', 'TypeScript'],
    'La transformación es local y educativa; no constituye una garantía de anonimización ni de cumplimiento.'
  ),
  project(
    'postgresql-index-coach',
    'PostgreSQL Index Coach',
    'Relaciona patrones de consulta con índices posibles y sus costes de escritura.',
    'internal-tools',
    false,
    ['PostgreSQL', 'Query plans', 'Indexing'],
    'Trabaja con planes y estadísticas preparados; no se conecta a una base de datos en vivo.'
  ),
  project(
    'migration-risk-reviewer',
    'Migration Risk Reviewer',
    'Señala bloqueos, reescrituras y operaciones difíciles de revertir en una migración SQL.',
    'internal-tools',
    false,
    ['PostgreSQL', 'Migrations', 'Static analysis'],
    'Realiza análisis estático y no ejecuta la migración ni conoce el volumen real de las tablas.'
  ),
  project(
    'slo-error-budget-calculator',
    'SLO Error Budget Calculator',
    'Traduce objetivos de disponibilidad en minutos de error y ritmo de consumo comprensible.',
    'internal-tools',
    false,
    ['SLO', 'Error budgets', 'Observability'],
    'Es una calculadora y no recibe métricas desde un sistema de monitorización.'
  ),
  project(
    'cloud-cost-architecture-simulator',
    'Cloud Cost Architecture Simulator',
    'Hace explícitos los supuestos que convierten tráfico y almacenamiento en una estimación de coste.',
    'internal-tools',
    false,
    ['Cloud', 'Cost modeling', 'TypeScript'],
    'Las tarifas y cargas son escenarios de ejemplo, no datos de facturación de un proveedor.'
  ),
  project(
    'ai-function-calling-sandbox',
    'AI Function Calling Sandbox',
    'Permite inspeccionar selección de herramientas, argumentos y errores sin depender de una respuesta opaca.',
    'ai-automation',
    true,
    ['Function calling', 'JSON Schema', 'TypeScript'],
    'Usa un modelo determinista simulado y no realiza llamadas a un proveedor de IA.'
  ),
  project(
    'prompt-regression-runner',
    'Prompt Regression Runner',
    'Compara versiones de un prompt contra casos fijos para detectar cambios de comportamiento.',
    'ai-automation',
    true,
    ['Evaluation', 'Fixtures', 'TypeScript'],
    'Ejecuta resultados grabados y no mide la variabilidad real de un modelo remoto.'
  ),
  project(
    'support-triage-simulator',
    'Support Triage Simulator',
    'Hace trazable cómo una solicitud recibe prioridad, categoría y siguiente acción.',
    'ai-automation',
    true,
    ['Triage', 'Rules', 'Explainability'],
    'La clasificación es determinista y usa casos sintéticos, sin datos de clientes ni un modelo entrenado.'
  ),
  project(
    'local-rag-evaluator',
    'Local RAG Evaluator',
    'Separa recuperación, contexto y respuesta para explicar por qué una búsqueda fundamentada acierta o falla.',
    'ai-automation',
    false,
    ['RAG', 'Retrieval', 'Embeddings'],
    'El corpus y la recuperación son locales; no integra una base vectorial ni un modelo remoto.'
  ),
  project(
    'serverless-image-pipeline',
    'Serverless Image Pipeline',
    'Visualiza validación, transformación y fallos en una canalización de imágenes por eventos.',
    'ai-automation',
    false,
    ['Serverless', 'Images', 'Pipeline'],
    'La demostración se ejecuta en el navegador y no procesa archivos mediante infraestructura serverless real.'
  ),
] as const;

export const LAB_PROJECT_COUNT = labProjects.length;

export function validateLabProjects(projects: readonly LabProject[]): string[] {
  const errors: string[] = [];
  const seenSlugs = new Set<string>();
  const seenDemoUrls = new Set<string>();
  const seenRepoUrls = new Set<string>();
  const validPillars = new Set<string>(labPillars.map((pillar) => pillar.id));
  const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  for (const item of projects) {
    if (!validSlug.test(item.slug)) errors.push(`slug inválido: ${item.slug}`);
    if (seenSlugs.has(item.slug)) errors.push(`slug duplicado: ${item.slug}`);
    seenSlugs.add(item.slug);

    if (!item.title.trim()) errors.push(`título vacío: ${item.slug}`);
    if (!item.problem.trim()) errors.push(`problema vacío: ${item.slug}`);
    if (!validPillars.has(item.pillar)) errors.push(`pilar inválido: ${item.slug}`);

    if (item.stack.length === 0) {
      errors.push(`stack vacío: ${item.slug}`);
    } else if (item.stack.some((entry) => !entry.trim())) {
      errors.push(`entrada de stack vacía: ${item.slug}`);
    }

    if (item.demoUrl !== `https://${item.slug}.alexcuesta.dev`) {
      errors.push(`demo no canónica: ${item.slug}`);
    }
    if (seenDemoUrls.has(item.demoUrl)) errors.push(`demo duplicada: ${item.demoUrl}`);
    seenDemoUrls.add(item.demoUrl);

    if (item.repoUrl !== `https://github.com/Aredex/${item.slug}`) {
      errors.push(`repositorio no canónico: ${item.slug}`);
    }
    if (seenRepoUrls.has(item.repoUrl)) errors.push(`repositorio duplicado: ${item.repoUrl}`);
    seenRepoUrls.add(item.repoUrl);

    if (!item.limitation.trim()) errors.push(`limitación vacía: ${item.slug}`);
  }

  return errors;
}

const catalogErrors = validateLabProjects(labProjects);
const catalogSlugs = new Set(labProjects.map((item) => item.slug));
const missingSlugs = LAB_PROJECT_SLUGS.filter((slug) => !catalogSlugs.has(slug));
if (missingSlugs.length > 0 || catalogErrors.length > 0) {
  throw new Error(
    `Catálogo del laboratorio inválido: ${[
      missingSlugs.length > 0 ? `faltan proyectos: ${missingSlugs.join(', ')}` : '',
      ...catalogErrors,
    ]
      .filter(Boolean)
      .join('; ')}`
  );
}
