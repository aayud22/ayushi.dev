import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { getYearsOfExperience } from "@/constants/experience";
import ChatWidget from "@/components/chatbot/ChatWidget";

const SITE_TITLE = "Ayushi | Frontend Developer | React.js & Next.js";
const JOB_TITLE = "Frontend Developer | React.js & Next.js";
const yearsExp = getYearsOfExperience();

export const metadata: Metadata = {
  title: SITE_TITLE,
  description:
    `Portfolio of Ayushi, a passionate ${JOB_TITLE} with ${yearsExp}+ years of experience building performant, scalable web applications using the MERN stack, Next.js, and TypeScript.`,
  keywords: ["Ayushi", "Full Stack Developer", "Next.js", "React", "MERN Stack", "Frontend Developer", "Backend Developer", "Software Engineer", "Surat", "Gujarat"],
  authors: [{ name: "Ayushi", url: "https://ayushi-dev.vercel.app/" }],
  creator: "Ayushi",
  publisher: "Ayushi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://ayushi-dev.vercel.app/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: `Check out my latest web development projects, skills, and experience as a ${JOB_TITLE}.`,
    url: "https://ayushi-dev.vercel.app/",
    siteName: "Ayushi's Portfolio",
    images: [
      {
        url: "https://ayushi-dev.vercel.app/images/hero_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Ayushi Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: `Portfolio of Ayushi, a passionate ${JOB_TITLE} building performant web apps.`,
    images: ["https://ayushi-dev.vercel.app/images/hero_banner.jpg"],
  },
  // GEO (Geographic) Optimization
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Surat",
    "geo.position": "21.1702;72.8311",
    "ICBM": "21.1702, 72.8311",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // AEO / Structured Data for AI & Search Engines
  const personSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfilePage"],
    name: "Ayushi",
    url: "https://ayushi-dev.vercel.app/",
    image: "https://ayushi-dev.vercel.app/images/hero_banner.jpg",
    jobTitle: JOB_TITLE,
    description: `A passionate ${JOB_TITLE} based in Surat, Gujarat. Specializes in MERN stack and building performant web applications.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN"
    },
    knowsAbout: ["Next.js", "React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "TypeScript", "Full Stack Development", "MERN Stack"],
    sameAs: [
      "https://github.com/aayud22",
      "https://www.linkedin.com/in/ayushi-diyora-0aa453208/"
    ],
    email: "aayushid81@gmail.com"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Ayushi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Ayushi is a passionate ${JOB_TITLE} based in Surat, Gujarat. She specializes in the MERN stack and building scalable, performant web applications.`
        }
      },
      {
        "@type": "Question",
        name: "What are Ayushi's core skills?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Her core skills include React, Next.js, Node.js, Express.js, MongoDB, TypeScript, and Tailwind CSS."
        }
      },
      {
        "@type": "Question",
        name: "Is Ayushi available for Full Stack Developer roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Ayushi is actively looking for new opportunities as a Full Stack Developer. She is based in Surat but is open to remote work globally."
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        {children}
        <Analytics />
        <ChatWidget />
      </body>
    </html>
  );
}
