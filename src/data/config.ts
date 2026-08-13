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
  /** TODO: replace with the real public demo URL. */
  demoUrl: 'TODO_BRIEFLINE_DEMO_URL',
  /** TODO: replace with the real repository URL. */
  repoUrl: 'TODO_BRIEFLINE_REPO_URL',
  evidence: {
    /** TODO: replace with the real OpenAPI 3.1 contract URL. */
    openApiContract: 'TODO_OPENAPI_CONTRACT_URL',
    /** TODO: replace with the real permission matrix URL. */
    permissionMatrix: 'TODO_PERMISSION_MATRIX_URL',
    /** TODO: replace with the real data model doc URL. */
    dataModel: 'TODO_DATA_MODEL_URL',
    /** TODO: replace with the real testing strategy doc URL. */
    testingStrategy: 'TODO_TESTING_STRATEGY_URL',
    /** TODO: replace with the real accessibility notes URL. */
    accessibilityNotes: 'TODO_ACCESSIBILITY_NOTES_URL',
  },
};

export const servicesForm = {
  /**
   * TODO: replace with the real Formspree form endpoint
   * (https://formspree.io/f/{form_id}), created for this site.
   */
  formspreeEndpoint: 'TODO_FORMSPREE_ENDPOINT',
};
