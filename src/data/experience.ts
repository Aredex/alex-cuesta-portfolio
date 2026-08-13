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
    role: 'Technical Lead',
    description:
      "Led a squad of six developers across internal platform work and the company's first production conversational AI, built on Vertex AI with Gemini function calling. Set the review, testing and on-call practices the squad still runs on.",
  },
  {
    years: '2022 — 2024',
    company: 'Chiper',
    role: 'Senior Software Engineer',
    description:
      'Owned payment and multi-country billing systems handling roughly 500K transactions a month, held 99.9% uptime through a critical architecture migration, and cut messaging costs by 20% while making new country integrations 35% faster.',
  },
  {
    years: '2021 — 2022',
    company: 'Chiper',
    role: 'Backend Engineer',
    description:
      'Built Node.js services and internal tools for commercial operations, and raised test coverage in the modules I refactored from roughly 20% to 65% so the team could change them without fear.',
  },
];

export interface EvidenceMetric {
  value: string;
  label: string;
}

export const evidenceMetrics: EvidenceMetric[] = [
  { value: '5 years', label: 'building production software' },
  { value: '100K+', label: 'active users on systems I built' },
  { value: '~500K', label: 'payment transactions per month' },
  { value: '6 developers', label: 'led as technical leader' },
];

export const evidenceFootnote =
  'All four figures come from five years at Chiper, a B2B commerce platform in Latin America.';
