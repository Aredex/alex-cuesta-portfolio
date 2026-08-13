export interface Capability {
  title: string;
  description: string;
  evidence: string;
}

export const capabilities: Capability[] = [
  {
    title: 'Product and API engineering',
    description:
      'When a product needs a system behind it and the requirements are still moving. I define the contract first, so the frontend, the API and the tests agree on the same behavior.',
    evidence:
      "Evidence: Briefline's OpenAPI 3.1 contract · Node.js · TypeScript · NestJS · PostgreSQL",
  },
  {
    title: 'Reliable backend systems',
    description:
      'When money, concurrency or third parties are involved and failure is not hypothetical. I work on the paths that only matter when something goes wrong.',
    evidence: 'Evidence: ~500K monthly transactions at 99.9% uptime · queues · retries · observability',
  },
  {
    title: 'Internal tools and workflows',
    description:
      'When an operations team is losing hours in spreadsheets and workarounds. Data-heavy interfaces that are fast by keyboard and honest about state.',
    evidence: 'Evidence: internal tooling at Chiper · React · Next.js · WCAG 2.2 AA target',
  },
  {
    title: 'Automation and production AI',
    description:
      'When automations mostly work but nobody can explain what happens on a failed run. I make the boundaries, retries and replay explicit.',
    evidence: 'Evidence: conversational AI in production · Vertex AI · Gemini function calling · n8n',
  },
];
