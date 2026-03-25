import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayushie Portfolio",
  description: "Personal portfolio showcasing web development projects, skills, and professional experience.",
  keywords: ["Web Developer", "Frontend", "Backend", "Portfolio", "Next.js", "React"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen flex flex-col`}>
        <main className="grow">
          {children}
        </main>
      </body>
    </html>
  );
}
