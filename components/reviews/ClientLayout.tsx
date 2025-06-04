"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollow from "@/components/ui/CursorFollow";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import PageTransition from "@/components/animations/PageTransition";
import AnimationProvider from "@/components/animations/AnimationProvider";
import AnimatedBackground from "@/components/animations/AnimatedBackground";

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
