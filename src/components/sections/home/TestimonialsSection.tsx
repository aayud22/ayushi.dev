import { TESTIMONIALS } from "@/constants";
import { Container } from "@/components/layout/Container";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";

export function TestimonialsSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto mb-10 text-center">
          <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
            My <span className="font-extrabold">Testimonial</span>
          </h2>
        </div>

        <TestimonialsMarquee items={TESTIMONIALS} />
      </Container>
    </section>
  );
}
