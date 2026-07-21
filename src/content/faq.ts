export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "availability",
    question: "Are you available for full-time remote roles or freelance projects?",
    answer: "Both — I'm currently open to full-time remote opportunities and freelance/contract work, especially ambitious, large-scale projects.",
  },
  {
    id: "tech-stack",
    question: "What's your tech stack?",
    answer: "Next.js, React, TypeScript, Tailwind CSS, Node.js, and MongoDB — with hands-on experience across the MERN stack and AI integration.",
  },
  {
    id: "response-time",
    question: "How quickly do you typically respond to inquiries?",
    answer: "Usually within 24 hours via email.",
  },
  {
    id: "international-clients",
    question: "Do you work with international/overseas clients?",
    answer: "Yes — comfortable with async communication and overlapping time zones.",
  },
  {
    id: "pricing",
    question: "What's your pricing/rates like?",
    answer: "Every project is different, so I quote based on scope and requirements rather than a fixed price list. Book a free 30-minute call and I'll walk through your project and give you a clear estimate.",
  },
];
