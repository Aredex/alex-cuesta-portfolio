export interface Engagement {
  index: string;
  title: string;
  description: string;
  pricingNote: string;
  youReceive: string[];
  outOfScope: string;
}

export const engagements: Engagement[] = [
  {
    index: '01 / FIX',
    title: 'Bug Rescue 90',
    description:
      'Un defecto reproducible en una aplicación en producción, diagnosticado y corregido con un test de regresión que falla antes del cambio y pasa después.',
    pricingNote: 'Alcance cerrado · presupuesto por caso',
    youReceive: [
      'Una reproducción escrita y la causa raíz',
      'La corrección como pull request revisable',
      'Un test de regresión que fija el comportamiento',
    ],
    outOfScope:
      'Refactors más allá de la ruta afectada, nuevas funcionalidades, y defectos que no puedan reproducirse en un entorno al que tenga acceso.',
  },
  {
    index: '02 / INTEGRATE',
    title: 'Revisión de integración API',
    description:
      'Una revisión de una integración de la que dependes: contrato, autenticación, manejo de errores, reintentos, idempotencia y qué ocurre cuando el otro lado va lento o falla.',
    pricingNote: 'Alcance cerrado · presupuesto por caso',
    youReceive: [
      'Una tabla de casos de fallo con el comportamiento actual y el esperado',
      'Hallazgos priorizados, separados entre riesgo y pulido',
      'Peticiones de ejemplo y tests para las rutas críticas',
    ],
    outOfScope:
      'Reescribir la integración, negociar con el proveedor externo, y cambios en sistemas fuera del límite revisado.',
  },
  {
    index: '03 / OPERATE',
    title: 'Auditoría de fiabilidad n8n',
    description:
      'Una auditoría de automatizaciones que funcionan casi siempre: ejecuciones duplicadas, fallos silenciosos, validación ausente y ninguna forma de recuperar lo perdido.',
    pricingNote: 'Alcance cerrado · presupuesto por caso',
    youReceive: [
      'Un mapa de cada workflow, disparador y dependencia externa',
      'Patrones de deduplicación, validación y reintento aplicados donde importan',
      'Un runbook para detectar y repetir una ejecución fallida',
    ],
    outOfScope: 'La operación continua de los workflows, y construir nuevas automatizaciones más allá del conjunto auditado.',
  },
  {
    index: '04 / BUILD',
    title: 'Desarrollo a medida',
    description:
      'Una aplicación web o móvil construida desde cero o sobre una base existente: backend en Node.js/NestJS, frontend en React y una API bien definida desde el primer commit. Para negocios que necesitan una herramienta que hoy no existe, no una plantilla genérica.',
    pricingNote: 'Alcance por fases · presupuesto por caso',
    youReceive: [
      'Una propuesta técnica con arquitectura, alcance y fases de entrega',
      'Código en repositorio propio, con tests desde el primer sprint',
      'Documentación y traspaso para que tu equipo pueda continuar sin mí',
    ],
    outOfScope:
      'Diseño gráfico o de identidad de marca — trabajo con un diseño ya definido o con componentes funcionales sobrios, y mantenimiento indefinido fuera de lo pactado en cada fase.',
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Contexto',
    description: 'Me cuentas qué está pasando y qué debería pasar en su lugar. Confirmo si el trabajo encaja.',
  },
  {
    index: '02',
    title: 'Alcance',
    description:
      'Alcance por escrito, criterios de aceptación, acceso necesario, precio y fechas. Nada empieza antes de acordar esto.',
  },
  {
    index: '03',
    title: 'Trabajo',
    description: 'Cambios revisables, una actualización a mitad de camino, y aviso cada vez que un hallazgo cambia el plan.',
  },
  {
    index: '04',
    title: 'Traspaso',
    description: 'Tests, documentación y un resumen breve de las decisiones, para que tu equipo pueda continuar sin mí.',
  },
];
