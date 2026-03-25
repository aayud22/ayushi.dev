import { PageLayout } from "@/components/layout/PageLayout";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { ExperienceSection } from "@/components/sections/home/ExperienceSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ProjectsSection } from "@/components/sections/home/ProjectsSection";
import { SkillsSection } from "@/components/sections/home/SkillsSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import CursorRings from "@/components/ui/CursorRings";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <PageLayout>
      <main id="top" className="w-full">
        <CursorRings/>
        <HeroSection />
        <ScrollReveal>
          <SkillsSection />
        </ScrollReveal>
        <ScrollReveal>
          <ExperienceSection />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>
        <TestimonialsSection />
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>
    </PageLayout>
  );
}
