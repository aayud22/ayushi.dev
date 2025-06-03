"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorFollow from "@/components/CursorFollow";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import AnimationProvider from "@/components/AnimationProvider";
import AnimatedBackground from "@/components/AnimatedBackground";

interface ClientLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function ClientLayout({
  children,
  className,
}: ClientLayoutProps) {
  const [backgroundEnabled, setBackgroundEnabled] = useState(true);

  return (
    <ThemeProvider>
      <AnimationProvider>
        <AnimatedBackground enabled={backgroundEnabled} />
        <CursorFollow />
        <Navbar />
        <main className="flex-grow overflow-hidden">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </AnimationProvider>
    </ThemeProvider>
  );
}
