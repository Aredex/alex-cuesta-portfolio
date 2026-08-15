import { describe, expect, it } from 'vitest';
import {
  LAB_PROJECT_COUNT,
  labPillars,
  labProjects,
  validateLabProjects,
} from '../../src/data/lab';

const expectedSlugs = [
  'api-contract-diff',
  'rest-failure-matrix',
  'mcp-contract-linter',
  'mcp-app-ui-kit',
  'event-schema-registry-lite',
  'feature-flag-rollout-lab',
  'architecture-decision-explorer',
  'webhook-reliability-playground',
  'idempotency-key-visualizer',
  'queue-retry-simulator',
  'jwt-debugger',
  'oauth-flow-simulator',
  'rbac-policy-tester',
  'api-security-header-auditor',
  'offline-sync-conflict-lab',
  'csv-import-reliability-lab',
  'incident-timeline-builder',
  'accessible-admin-table',
  'audit-log-explorer',
  'data-anonymizer-playground',
  'postgres-index-coach',
  'migration-risk-reviewer',
  'slo-error-budget-calculator',
  'cloud-cost-estimator',
  'ai-function-calling-sandbox',
  'prompt-regression-runner',
  'support-triage-simulator',
  'local-rag-playground',
  'serverless-image-pipeline',
];

describe('laboratory catalog', () => {
  it('contains the complete set of 29 deployed projects without duplicate slugs', () => {
    const slugs = labProjects.map((project) => project.slug);

    expect(LAB_PROJECT_COUNT).toBe(29);
    expect(slugs).toHaveLength(29);
    expect(new Set(slugs).size).toBe(29);
    expect([...slugs].sort()).toEqual([...expectedSlugs].sort());
  });

  it('organizes the catalog into four pillars with exactly three flagships each', () => {
    expect(labPillars).toHaveLength(4);

    for (const pillar of labPillars) {
      const projects = labProjects.filter((project) => project.pillar === pillar.id);
      expect(projects.length).toBeGreaterThan(0);
      expect(projects.filter((project) => project.flagship)).toHaveLength(3);
    }
  });

  it('publishes canonical live demos, public repositories and an honest limitation', () => {
    for (const project of labProjects) {
      expect(project.demoUrl).toBe(`https://${project.slug}.alexcuesta.dev`);
      expect(project.repoUrl).toBe(`https://github.com/Aredex/${project.slug}`);
      expect(project.limitation.trim().length).toBeGreaterThan(20);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it('rejects duplicate slugs, non-canonical hosts and missing limitations', () => {
    const validProject = labProjects[0];
    const invalidCatalog = [
      validProject,
      { ...validProject },
      {
        ...labProjects[1],
        demoUrl: 'https://example.com/demo',
        limitation: '   ',
      },
    ];

    expect(validateLabProjects(invalidCatalog)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('slug duplicado'),
        expect.stringContaining('demo no canónica'),
        expect.stringContaining('limitación vacía'),
      ])
    );
  });
});
