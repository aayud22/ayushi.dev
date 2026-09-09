export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "availability",
    question: "Are you available for freelance projects?",
    answer: "Yes — I'm available for freelance and contract projects, especially web applications, dashboards, and modern frontend experiences.",
  },
  {
    id: "tech-stack",
    question: "What's your tech stack?",
    answer: "My primary stack is React.js, Next.js, TypeScript, JavaScript, and Tailwind CSS. I also work with TanStack Query, Redux Toolkit, REST APIs, Node.js, Supabase, and MongoDB.",
  },
  {
    id: "response-time",
    question: "How quickly do you typically respond to inquiries?",
    answer: "Usually within 24 hours via email.",
  },
  {
    id: "international-clients",
    question: "Do you work with international/overseas clients?",
    answer: "Yes — I'm comfortable working with international clients, async communication, and overlapping time zones.",
  },
  {
    id: "pricing",
    question: "What's your pricing/rates like?",
    answer: "Every project is different, so I quote based on scope and requirements rather than a fixed price list. Book a free 30-minute call and I'll walk through your project and give you a clear estimate.",
  },
];
