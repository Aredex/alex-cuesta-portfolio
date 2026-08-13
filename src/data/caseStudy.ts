export const brieflineHero = {
  eyebrow: 'CASE STUDY · BRIEFLINE · 2026',
  title: 'From an ambiguous brief to a verifiable product.',
  lead: 'A small agency runs client work in spreadsheets and chat. The brief asked for "a simple task tool". I turned that into a product with defined boundaries, then produced the evidence that it behaves as described.',
};

export interface MetaItem {
  term: string;
  description: string;
}

export const brieflineMeta: MetaItem[] = [
  { term: 'MY ROLE', description: 'Product definition, design, frontend, API, testing' },
  { term: 'STACK', description: 'React · NestJS · PostgreSQL · OpenAPI 3.1 · Playwright' },
  { term: 'TYPE', description: 'Independent case study, not commissioned client work' },
  { term: 'EVIDENCE', description: '483 tests, public demo, OpenAPI contract (12 Aug 2026)' },
];

export const brieflineContext = {
  heading: 'Context and audience',
  paragraphs: [
    'Briefline is aimed at agencies of three to fifteen people: an owner who needs to know what is late, account managers who talk to clients, and freelancers who should see only their own work.',
    'The job to be done is not "track tasks". It is answering, in one screen, what is blocked, who is responsible and what the client was promised.',
  ],
};

export const brieflineConstraints = {
  heading: 'Constraints I set',
  items: [
    'One team, one workspace — no multi-tenant billing in v1',
    'Roles limited to owner, manager and collaborator',
    'No real-time collaboration; conflicts resolved on write',
    'Demo data must be fictional and reset daily',
  ],
};

export interface DecisionBlock {
  title: string;
  description: string;
}

export const decisionContract: DecisionBlock & { contractLines: string[] } = {
  title: 'The contract comes first',
  description:
    'The API is described in OpenAPI 3.1 before implementation. The client types, the server validation and the integration tests are all generated from or checked against that document, so a breaking change is visible in review rather than in production.',
  contractLines: [
    'PATCH /tasks/{id}',
    'If-Match: required',
    '200 → updated task + new version',
    '409 → current server state + changed fields',
    '403 → permission denied, no partial write',
  ],
};

export const decisionPermissions: DecisionBlock & { imageAlt: string; caption: string } = {
  title: 'Permissions live on the server',
  description:
    'The interface hides what you cannot do, but every rule is enforced again in the API and covered by tests. A collaborator who guesses a URL gets a 403, not a surprise.',
  imageAlt: "Briefline client detail page showing contact information and the client's three related tasks.",
  caption: 'Client detail — the same record renders differently per role.',
};

export const decisionConcurrency: DecisionBlock & { imageAlt: string; caption: string } = {
  title: 'A stale update never wins silently',
  description:
    'Every change is versioned and written atomically with its history entry. If two people edit the same task, the later request is rejected with the current state so the interface can show what actually happened instead of overwriting a colleague.',
  imageAlt: 'Briefline move-to menu open on a task, listing the available target statuses.',
  caption: 'Status change — one action, one audited transition.',
};

export const brieflineStates = {
  heading: 'The states most tools postpone',
  paragraphs: [
    'Empty, loading, denied, conflicted and offline were designed with the happy path, not after it. Keyboard focus is visible on every interactive element and was reviewed manually, not only by an automated audit.',
    'Accessibility target is WCAG 2.2 AA: sequential headings, labelled form fields, errors tied to their input, and no information carried by colour alone.',
  ],
  imageAlt: 'Briefline interface with a visible keyboard focus ring on an interactive control.',
  caption: 'Focus state — verified by manual keyboard review.',
};

export const brieflineEvidence = {
  heading: 'Evidence you can check',
  note: 'Counts dated 12 August 2026. Demo data is fictional and resets daily, so the demo you open behaves the same way the tests describe.',
  metrics: [
    { value: '203', label: 'unit tests' },
    { value: '206', label: 'integration tests over PostgreSQL' },
    { value: '74', label: 'end-to-end tests with Playwright' },
    { value: 'AA', label: 'WCAG 2.2 target, keyboard reviewed' },
  ],
  /**
   * Each link's `configKey` names the src/data/config.ts `briefline`/`briefline.evidence`
   * field it must resolve to. Every one is a TODO placeholder until the real
   * resource exists — remove the entry rather than ship a dead or fake link.
   */
  links: [
    { label: 'Public demo', configKey: 'demoUrl' as const },
    { label: 'Repository', configKey: 'repoUrl' as const },
    { label: 'OpenAPI 3.1 contract', configKey: 'openApiContract' as const },
    { label: 'Permission matrix', configKey: 'permissionMatrix' as const },
    { label: 'Data model', configKey: 'dataModel' as const },
    { label: 'Testing strategy', configKey: 'testingStrategy' as const },
    { label: 'Accessibility notes', configKey: 'accessibilityNotes' as const },
  ],
};

export const brieflineTradeoffs = {
  heading: 'Trade-offs and what I left out',
  items: [
    'Optimistic concurrency instead of real-time sync — simpler to reason about, at the cost of occasional conflict dialogs.',
    'No custom workflow builder — four statuses cover the agency case and keep the audit trail meaningful.',
    'Server-rendered lists over infinite scroll — predictable performance and a URL you can share.',
  ],
};

export const brieflineOutcome = {
  heading: 'Outcome and what I would change',
  paragraphs: [
    'The product does what the case study claims, and every claim on this page maps to a test, a contract or a screen you can open. Writing the contract first was the decision that saved the most time.',
    'Next time I would invest earlier in the conflict experience: the API behaviour was right from the start, but the interface took three iterations to explain it in plain language.',
  ],
};

export const brieflineContact = {
  heading: 'Want the same rigour on your product?',
  lead: 'Tell me what is happening, what should happen instead and what you have already tried. I will reply with the most useful next step.',
};
