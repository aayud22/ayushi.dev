import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/contact/Contact";
import Projects from "@/components/sections/Projects";
import ClientReviews from "@/components/reviews/ClientReviews";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ClientReviews />
      <Contact />
    </>
  );
}
