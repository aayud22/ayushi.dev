import CursorRings from "@/components/ui/CursorRings";
import { PageLayout } from "@/components/layout/PageLayout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { SkillsSection } from "@/components/sections/home/SkillsSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { ProjectsSection } from "@/components/sections/home/ProjectsSection";
import { ExperienceSection } from "@/components/sections/home/ExperienceSection";
// import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";

export default function Home() {
  return (
    <PageLayout>
      <main id="top" className="w-full flex-1">
        <CursorRings />
        <HeroSection />
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <SkillsSection />
        </ScrollReveal>
        <ScrollReveal>
          <ExperienceSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>
        {/* <TestimonialsSection /> */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>
    </PageLayout>
  );
}
