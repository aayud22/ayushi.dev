import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Ayushie | Next.js & MERN Stack Developer",
  description:
    "Portfolio of Ayushie, a passionate web developer with 3+ years of experience building performant, delightful web experiences using Next.js, React, and Tailwind CSS.",
  keywords: ["Ayushie", "Web Developer", "Next.js", "React", "MERN Stack", "Frontend Developer", "Portfolio"],
  openGraph: {
    title: "Ayushie | Next.js Developer",
    description: "Check out my latest web development projects and skills.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
