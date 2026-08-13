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
      'A single reproducible defect in a production application, diagnosed and fixed with a regression test that fails before the change and passes after it.',
    pricingNote: 'Fixed scope · quoted per case',
    youReceive: [
      'A written reproduction and root cause',
      'The fix as a reviewable pull request',
      'A regression test that pins the behavior',
    ],
    outOfScope:
      'Refactors beyond the affected path, new features, and defects that cannot be reproduced on a environment I can access.',
  },
  {
    index: '02 / INTEGRATE',
    title: 'API Integration Check',
    description:
      'A review of one integration you depend on: contract, authentication, error handling, retries, idempotency and what happens when the other side is slow or wrong.',
    pricingNote: 'Fixed scope · quoted per case',
    youReceive: [
      'A failure-case table with current and expected behavior',
      'Prioritised findings, separated into risk and polish',
      'Example requests and tests for the critical paths',
    ],
    outOfScope:
      'Rewriting the integration, negotiating with the third-party vendor, and changes to systems outside the reviewed boundary.',
  },
  {
    index: '03 / OPERATE',
    title: 'n8n Reliability Audit',
    description:
      'An audit of automations that mostly work: duplicate runs, silent failures, missing validation, and no way to replay what was lost.',
    pricingNote: 'Fixed scope · quoted per case',
    youReceive: [
      'A map of every workflow, trigger and external dependency',
      'Deduplication, validation and retry patterns applied where they matter',
      'A runbook for detecting and replaying a failed run',
    ],
    outOfScope: 'Ongoing operation of the workflows, and building new automations beyond the audited set.',
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
    title: 'Context',
    description: 'You describe what is happening and what should happen instead. I confirm whether the work fits.',
  },
  {
    index: '02',
    title: 'Scope',
    description:
      'Written scope, acceptance criteria, access needed, price and dates. Nothing starts before this is agreed.',
  },
  {
    index: '03',
    title: 'Work',
    description: 'Reviewable changes, one update mid-way, and a note whenever a finding changes the plan.',
  },
  {
    index: '04',
    title: 'Handover',
    description: 'Tests, documentation and a short summary of decisions, so your team can continue without me.',
  },
];
