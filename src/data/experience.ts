export interface ExperienceItem {
  years: string;
  company: string;
  role: string;
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    years: '2024 — 2026',
    company: 'Chiper',
    role: 'Líder técnico',
    description:
      'Lideré un equipo de seis desarrolladores en trabajo de plataforma interna y en la primera IA conversacional en producción de la empresa, construida sobre Vertex AI con function calling de Gemini. Definí las prácticas de revisión, testing y guardias que el equipo todavía sigue.',
  },
  {
    years: '2022 — 2024',
    company: 'Chiper',
    role: 'Ingeniero de software senior',
    description:
      'Responsable de los sistemas de pagos y facturación multipaís, con cerca de 500K transacciones al mes, manteniendo un 99,9% de uptime durante una migración de arquitectura crítica y reduciendo el coste de mensajería un 20% mientras las nuevas integraciones de país eran un 35% más rápidas.',
  },
  {
    years: '2021 — 2022',
    company: 'Chiper',
    role: 'Ingeniero backend',
    description:
      'Construí servicios en Node.js y herramientas internas para operaciones comerciales, y elevé la cobertura de tests en los módulos que refactoricé de un ~20% a un ~65% para que el equipo pudiera modificarlos sin miedo.',
  },
];

export interface EvidenceMetric {
  value: string;
  label: string;
}

export const evidenceMetrics: EvidenceMetric[] = [
  { value: '5 años', label: 'construyendo software en producción' },
  { value: '100K+', label: 'usuarios activos en sistemas que construí' },
  { value: '~500K', label: 'transacciones de pago al mes' },
  { value: '6 desarrolladores', label: 'liderados como líder técnico' },
];

export const evidenceFootnote =
  'Las cuatro cifras proceden de cinco años en Chiper, una plataforma de comercio B2B en Latinoamérica.';
