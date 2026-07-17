import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Ayushie | Full Stack Developer & Next.js Expert",
  description:
    "Portfolio of Ayushie, a passionate Full Stack Developer with 3+ years of experience building performant, scalable web applications using the MERN stack, Next.js, and TypeScript.",
  keywords: ["Ayushie", "Full Stack Developer", "Next.js", "React", "MERN Stack", "Frontend Developer", "Backend Developer", "Software Engineer", "Surat", "Gujarat"],
  authors: [{ name: "Ayushie", url: "https://ayushi-dev.vercel.app/" }],
  creator: "Ayushie",
  publisher: "Ayushie",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://ayushi-dev.vercel.app/",
  },
  openGraph: {
    title: "Ayushie | Full Stack Developer",
    description: "Check out my latest web development projects, skills, and experience as a Full Stack Developer.",
    url: "https://ayushi-dev.vercel.app/",
    siteName: "Ayushie's Portfolio",
    images: [
      {
        url: "https://ayushi-dev.vercel.app/images/hero_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Ayushie Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayushie | Full Stack Developer",
    description: "Portfolio of Ayushie, a passionate Full Stack Developer building performant web apps.",
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
    name: "Ayushie",
    url: "https://ayushi-dev.vercel.app/",
    image: "https://ayushi-dev.vercel.app/images/hero_banner.jpg",
    jobTitle: "Full Stack Developer",
    description: "A passionate Full Stack Developer and Next.js expert based in Surat, Gujarat. Specializes in MERN stack and building performant web applications.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN"
    },
    knowsAbout: ["Next.js", "React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "TypeScript", "Full Stack Development", "MERN Stack"],
    sameAs: [
      "https://github.com/aayud22",
      "https://www.linkedin.com/in/ayushie-diyora-0aa453208/"
    ],
    email: "aayushid81@gmail.com"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Ayushie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ayushie is a passionate Full Stack Developer and Next.js expert based in Surat, Gujarat. She specializes in the MERN stack and building scalable, performant web applications."
        }
      },
      {
        "@type": "Question",
        name: "What are Ayushie's core skills?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Her core skills include React, Next.js, Node.js, Express.js, MongoDB, TypeScript, and Tailwind CSS."
        }
      },
      {
        "@type": "Question",
        name: "Is Ayushie available for Full Stack Developer roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Ayushie is actively looking for new opportunities as a Full Stack Developer. She is based in Surat but is open to remote work globally."
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
      </body>
    </html>
  );
}
