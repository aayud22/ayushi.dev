export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Client Name",
    role: "Founder",
    quote:
      "Great communication and delivered a polished UI exactly as requested. Highly recommended.",
  },
  {
    name: "Teammate Name",
    role: "Product Designer",
    quote:
      "Strong attention to detail and excellent implementation quality—pixel-perfect and accessible.",
  },
  {
    name: "Manager Name",
    role: "Engineering Manager",
    quote:
      "Consistently reliable, proactive, and thoughtful about performance and user experience.",
  },
];
