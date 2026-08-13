export interface Principle {
  statement: string;
  explanation: string;
}

export const principles: Principle[] = [
  {
    statement: 'Reliability is part of the product.',
    explanation:
      "Permissions, retries, conflicts and recovery are decided while the feature is being designed. Added afterwards, they become someone else's incident.",
  },
  {
    statement: 'Good architecture makes change safer, not merely cleaner.',
    explanation:
      'I judge a design by how confidently the next person can modify it — not by how elegant the diagram looks.',
  },
  {
    statement: 'Documentation exists to make claims verifiable.',
    explanation:
      'A contract, a test or a runbook is worth more than a description of intent. If I claim a behavior, there should be something you can run.',
  },
  {
    statement: 'AI is useful when its limits are explicit.',
    explanation:
      'In production I define what the model may call, what it must never decide alone, and what happens when it is wrong. That is what made the assistant at Chiper operable.',
  },
];
