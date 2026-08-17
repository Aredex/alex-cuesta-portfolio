import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  LAB_PROJECT_COUNT,
  LAB_PROJECT_SLUGS,
  labPillars,
  labProjects,
  validateLabProjects,
} from '../../src/data/lab';
import { engagements } from '../../src/data/services';

describe('laboratory catalog', () => {
  it('derives current catalog counts without hard-coded production copy', () => {
    const productionFiles = [
      '../../src/data/lab.ts',
      '../../src/data/now.ts',
      '../../src/data/site.ts',
      '../../src/pages/laboratorio.astro',
    ];

    for (const relativePath of productionFiles) {
      const source = readFileSync(new URL(relativePath, import.meta.url), 'utf8');
      expect(source, relativePath).not.toMatch(/\b29\b/);
    }

    expect(LAB_PROJECT_COUNT).toBe(labProjects.length);
  });

  it('contains the complete deployed manifest without duplicate slugs', () => {
    const slugs = labProjects.map((project) => project.slug);

    expect(slugs).toHaveLength(LAB_PROJECT_COUNT);
    expect(new Set(slugs).size).toBe(LAB_PROJECT_COUNT);
    expect([...slugs].sort()).toEqual([...LAB_PROJECT_SLUGS].sort());
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

  it('rejects malformed or incomplete project fields and duplicate derived URLs', () => {
    const invalidProject = {
      ...labProjects[0],
      slug: 'Invalid slug',
      title: '   ',
      problem: '',
      pillar: 'unknown-pillar',
      stack: [],
      limitation: ' ',
    } as unknown as (typeof labProjects)[number];
    const invalidStackEntry = {
      ...labProjects[1],
      stack: ['TypeScript', '   '],
    };
    const duplicateUrls = {
      ...labProjects[2],
      demoUrl: labProjects[1].demoUrl,
      repoUrl: labProjects[1].repoUrl,
    };

    expect(
      validateLabProjects([invalidProject, labProjects[1], invalidStackEntry, duplicateUrls])
    ).toEqual(
      expect.arrayContaining([
        expect.stringContaining('slug inválido'),
        expect.stringContaining('título vacío'),
        expect.stringContaining('problema vacío'),
        expect.stringContaining('pilar inválido'),
        expect.stringContaining('stack vacío'),
        expect.stringContaining('entrada de stack vacía'),
        expect.stringContaining('limitación vacía'),
        expect.stringContaining('demo duplicada'),
        expect.stringContaining('repositorio duplicado'),
      ])
    );
  });

  it('marks the broken Webhook demo as degraded without promoting it', () => {
    const webhook = labProjects.find((project) => project.slug === 'webhook-reliability-playground');
    const promotedEvidence = engagements.flatMap((engagement) => engagement.evidence);

    expect(webhook).toMatchObject({
      status: 'degraded',
      flagship: false,
    });
    expect(webhook?.statusNote).toContain('CORS');
    expect(promotedEvidence).not.toContain('webhook-reliability-playground');

    for (const pillar of labPillars) {
      const flagships = labProjects.filter(
        (project) => project.pillar === pillar.id && project.flagship
      );
      expect(flagships).toHaveLength(3);
      expect(flagships.every((project) => project.status === 'active')).toBe(true);
    }
  });
});
