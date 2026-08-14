/**
 * Every real-world value the design handoff could not provide: contact
 * destinations, external links and the form endpoint. Each TODO must be
 * replaced with a real, verifiable URL before launch — the site's premise is
 * that every claim and every link is checkable, so an unresolved TODO must
 * never render as a live link. `isResolved` is the single gate every
 * consumer of these placeholder fields must check before rendering a link
 * that depends on them.
 */

/** True when a config value is a real, publishable URL/address — false for
 * an unfilled `TODO_*` placeholder or an empty string. */
export function isResolved(value: string): boolean {
  return value.length > 0 && !value.startsWith('TODO_');
}

export const contact = {
  email: 'mailto:develop@alexcuesta.dev',
  linkedin: 'https://www.linkedin.com/in/pacuestar/',
  github: 'https://github.com/Aredex',
};

/**
 * Résumé PDF intentionally not published yet — the "Download résumé" CTA is
 * removed from the UI rather than pointed at a placeholder. Field kept
 * (typed, unresolved) so the CTA can come back with a single value change.
 */
export const resume = {
  /** TODO: replace with the real résumé PDF path (e.g. /cv-alex-cuesta.pdf) when it is ready to publish. */
  pdfUrl: 'TODO_RESUME_PDF_URL',
};

export const briefline = {
  demoUrl: 'https://briefline.alexcuesta.dev/login',
  repoUrl: 'https://github.com/Aredex/briefline-crm',
  evidence: {
    openApiContract: 'https://github.com/Aredex/briefline-crm/blob/main/packages/api-contract/openapi.yaml',
    permissionMatrix: 'https://github.com/Aredex/briefline-crm/blob/main/.claude/plans/permission-matrix.md',
    dataModel: 'https://github.com/Aredex/briefline-crm/blob/main/.claude/plans/data-model.md',
    testingStrategy: 'https://github.com/Aredex/briefline-crm/blob/main/.claude/plans/test-matrix.md',
    accessibilityNotes: 'https://github.com/Aredex/briefline-crm/blob/main/.claude/plans/ux-wireframes-tokens.md',
  },
};

export const servicesForm = {
  /**
   * Configure at build time with a real `https://formspree.io/f/{form_id}`
   * value. An empty or invalid value renders a direct-email fallback instead
   * of shipping a broken form.
   */
  formspreeEndpoint: import.meta.env.PUBLIC_FORMSPREE_ENDPOINT ?? '',
};
