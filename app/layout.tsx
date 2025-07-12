import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import { FloatingChatButton } from "./chat/components/chat/floating-chat-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayushi.dev | Modern Web Developer",
  description:
    "A modern, responsive portfolio website showcasing my skills and projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.className} bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
          <FloatingChatButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
