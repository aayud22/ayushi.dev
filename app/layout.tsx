import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayushi.dev | Modern Web Developer",
  description:
    "A modern, responsive portfolio website showcasing my skills and projects",
};

// We need to separate the client component to avoid metadata issues
import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
