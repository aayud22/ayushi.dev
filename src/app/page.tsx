import CursorRings from "@/components/ui/CursorRings";
import { PageLayout } from "@/components/layout/PageLayout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

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
          <ProcessSection />
        </ScrollReveal>
        <ScrollReveal>
          <FAQSection />
        </ScrollReveal>
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>
    </PageLayout>
  );
}
