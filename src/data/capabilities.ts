export interface Capability {
  title: string;
  description: string;
  evidence: string;
}

export const capabilities: Capability[] = [
  {
    title: 'Ingeniería de producto y API',
    description:
      'Cuando un producto necesita un sistema detrás y los requisitos todavía se mueven. Defino el contrato primero, para que el frontend, la API y los tests coincidan en el mismo comportamiento.',
    evidence:
      'Evidencia: contrato OpenAPI 3.1 de Briefline · Node.js · TypeScript · NestJS · PostgreSQL',
  },
  {
    title: 'Sistemas backend fiables',
    description:
      'Cuando hay dinero, concurrencia o terceros de por medio y el fallo no es hipotético. Trabajo en los caminos que solo importan cuando algo sale mal.',
    evidence: 'Evidencia: ~500K transacciones mensuales al 99,9% de uptime · colas · reintentos · observabilidad',
  },
  {
    title: 'Herramientas internas y workflows',
    description:
      'Cuando un equipo de operaciones pierde horas en hojas de cálculo y soluciones improvisadas. Interfaces con mucho dato, rápidas por teclado y honestas sobre su estado.',
    evidence: 'Evidencia: herramientas internas en Chiper · React · Next.js · objetivo WCAG 2.2 AA',
  },
  {
    title: 'Automatización e IA en producción',
    description:
      'Cuando las automatizaciones funcionan casi siempre pero nadie puede explicar qué pasa en una ejecución fallida. Hago explícitos los límites, los reintentos y el replay.',
    evidence: 'Evidencia: IA conversacional en producción · Vertex AI · function calling de Gemini · n8n',
  },
];
