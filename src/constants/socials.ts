import type { ComponentType } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Email", href: "mailto:aayushid81@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/aayud22", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayushie-diyora-0aa453208/",
    icon: Linkedin,
  },
];
