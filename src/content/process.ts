export type ProcessStep = {
  id: string;
  step: number;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    step: 1,
    title: "Discovery call",
    description: "We hop on a quick call (book via Calendly) to discuss your project, goals, and requirements.",
  },
  {
    id: "scope",
    step: 2,
    title: "Scope & timeline",
    description: "I share a clear scope, timeline, and cost estimate before any work begins — no surprises.",
  },
  {
    id: "build",
    step: 3,
    title: "Build in milestones",
    description: "Work is delivered in milestones with regular updates, so you always know where things stand.",
  },
  {
    id: "review",
    step: 4,
    title: "Review & revise",
    description: "You review each milestone and I incorporate feedback before moving to the next stage.",
  },
  {
    id: "launch",
    step: 5,
    title: "Deploy & support",
    description: "Final delivery, deployment, and a short support window to handle any post-launch fixes.",
  },
];
