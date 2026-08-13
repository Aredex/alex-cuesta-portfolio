export const brieflineHero = {
  eyebrow: 'CASO DE ESTUDIO · BRIEFLINE · 2026',
  title: 'De un brief ambiguo a un producto verificable.',
  lead: 'Una pequeña agencia gestiona el trabajo de sus clientes en hojas de cálculo y chat. El brief pedía "una herramienta de tareas sencilla". Convertí eso en un producto con límites definidos y después produje la evidencia de que se comporta como se describe.',
};

export interface MetaItem {
  term: string;
  description: string;
}

export const brieflineMeta: MetaItem[] = [
  { term: 'MI ROL', description: 'Definición de producto, diseño, frontend, API, testing' },
  { term: 'STACK', description: 'React · NestJS · PostgreSQL · OpenAPI 3.1 · Playwright' },
  { term: 'TIPO', description: 'Caso de estudio independiente, no trabajo comisionado por un cliente' },
  { term: 'EVIDENCIA', description: '483 tests, demo pública, contrato OpenAPI (12 ago. 2026)' },
];

export const brieflineContext = {
  heading: 'Contexto y audiencia',
  paragraphs: [
    'Briefline está pensado para agencias de tres a quince personas: un dueño que necesita saber qué va con retraso, gestores de cuenta que hablan con los clientes, y freelancers que solo deben ver su propio trabajo.',
    'El trabajo por hacer no es "gestionar tareas". Es responder, en una sola pantalla, qué está bloqueado, quién es responsable y qué se le prometió al cliente.',
  ],
};

export const brieflineConstraints = {
  heading: 'Restricciones que fijé',
  items: [
    'Un equipo, un espacio de trabajo — sin facturación multi-tenant en v1',
    'Roles limitados a propietario, gestor y colaborador',
    'Sin colaboración en tiempo real; conflictos resueltos al escribir',
    'Los datos de demo deben ser ficticios y reiniciarse cada día',
  ],
};

export interface DecisionBlock {
  title: string;
  description: string;
}

export const decisionContract: DecisionBlock & { contractLines: string[] } = {
  title: 'El contrato va primero',
  description:
    'La API se describe en OpenAPI 3.1 antes de implementarla. Los tipos del cliente, la validación del servidor y los tests de integración se generan a partir de ese documento o se verifican contra él, así que un cambio incompatible se ve en la revisión, no en producción.',
  contractLines: [
    'PATCH /tasks/{id}',
    'If-Match: obligatorio',
    '200 → tarea actualizada + nueva versión',
    '409 → estado actual del servidor + campos cambiados',
    '403 → permiso denegado, sin escritura parcial',
  ],
};

export const decisionPermissions: DecisionBlock & { imageAlt: string; caption: string } = {
  title: 'Los permisos viven en el servidor',
  description:
    'La interfaz oculta lo que no puedes hacer, pero cada regla se vuelve a aplicar en la API y está cubierta por tests. Un colaborador que adivina una URL recibe un 403, no una sorpresa.',
  imageAlt: 'Página de detalle de cliente en Briefline mostrando información de contacto y las tres tareas relacionadas del cliente.',
  caption: 'Detalle de cliente — el mismo registro se renderiza distinto según el rol.',
};

export const decisionConcurrency: DecisionBlock & { imageAlt: string; caption: string } = {
  title: 'Una actualización obsoleta nunca gana en silencio',
  description:
    'Cada cambio se versiona y se escribe de forma atómica junto a su entrada de historial. Si dos personas editan la misma tarea, la petición más tardía se rechaza con el estado actual, así la interfaz puede mostrar lo que realmente pasó en vez de sobrescribir a un compañero.',
  imageAlt: 'Menú "mover a" abierto sobre una tarea en Briefline, con los estados de destino disponibles.',
  caption: 'Cambio de estado — una acción, una transición auditada.',
};

export const brieflineStates = {
  heading: 'Los estados que la mayoría de herramientas posponen',
  paragraphs: [
    'Vacío, cargando, denegado, en conflicto y sin conexión se diseñaron junto al camino feliz, no después. El foco de teclado es visible en cada elemento interactivo y se revisó a mano, no solo con una auditoría automática.',
    'El objetivo de accesibilidad es WCAG 2.2 AA: encabezados secuenciales, campos de formulario etiquetados, errores asociados a su campo, y ninguna información transmitida solo por color.',
  ],
  imageAlt: 'Interfaz de Briefline con un anillo de foco de teclado visible sobre un control interactivo.',
  caption: 'Estado de foco — verificado con revisión manual por teclado.',
};

export const brieflineEvidence = {
  heading: 'Evidencia que puedes comprobar',
  note: 'Cifras del 12 de agosto de 2026. Los datos de demo son ficticios y se reinician cada día, así que la demo que abres se comporta igual que describen los tests.',
  metrics: [
    { value: '203', label: 'tests unitarios' },
    { value: '206', label: 'tests de integración sobre PostgreSQL' },
    { value: '74', label: 'tests end-to-end con Playwright' },
    { value: 'AA', label: 'objetivo WCAG 2.2, revisado por teclado' },
  ],
  /**
   * Each link's `configKey` names the src/data/config.ts `briefline`/`briefline.evidence`
   * field it must resolve to. Every one is a TODO placeholder until the real
   * resource exists — the page filters this array with `isResolved` rather
   * than shipping a dead or fake link.
   */
  links: [
    { label: 'Demo pública', configKey: 'demoUrl' as const },
    { label: 'Repositorio', configKey: 'repoUrl' as const },
    { label: 'Contrato OpenAPI 3.1', configKey: 'openApiContract' as const },
    { label: 'Matriz de permisos', configKey: 'permissionMatrix' as const },
    { label: 'Modelo de datos', configKey: 'dataModel' as const },
    { label: 'Estrategia de testing', configKey: 'testingStrategy' as const },
    { label: 'Notas de accesibilidad', configKey: 'accessibilityNotes' as const },
  ],
};

export const brieflineTradeoffs = {
  heading: 'Decisiones de compromiso y qué dejé fuera',
  items: [
    'Concurrencia optimista en vez de sincronización en tiempo real — más simple de razonar, a costa de algún diálogo de conflicto ocasional.',
    'Sin constructor de workflows personalizados — cuatro estados cubren el caso de la agencia y mantienen útil el historial de auditoría.',
    'Listas renderizadas en servidor en vez de scroll infinito — rendimiento predecible y una URL que se puede compartir.',
  ],
};

export const brieflineOutcome = {
  heading: 'Resultado y qué cambiaría',
  paragraphs: [
    'El producto hace lo que dice este caso de estudio, y cada afirmación de esta página se corresponde con un test, un contrato o una pantalla que puedes abrir. Escribir el contrato primero fue la decisión que más tiempo ahorró.',
    'La próxima vez invertiría antes en la experiencia de conflicto: el comportamiento de la API fue correcto desde el principio, pero la interfaz necesitó tres iteraciones para explicarlo en lenguaje llano.',
  ],
};

export const brieflineContact = {
  heading: '¿Quieres el mismo rigor en tu producto?',
  lead: 'Cuéntame qué está pasando, qué debería pasar en su lugar y qué has probado ya. Te responderé con el siguiente paso más útil.',
};
