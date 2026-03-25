import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { CopyIconButton } from "@/components/ui/CopyIconButton";

export function ContactSection() {
  return (
    <section id="contact" className="py-16">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          <div className="w-full md:basis-5/12 md:self-auto">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Let&apos;s <span className="font-extrabold">talk</span> for
              <br />
              Something special
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              I&apos;m always open to freelance opportunities, especially ambitious and large-scale projects.
              If you have an idea, collaboration, or any questions, feel free to reach out.
            </p>

            <div className="mt-6 flex flex-col gap-1.5 text-base font-semibold text-slate-900 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex items-center gap-1">
                <a
                  className="inline-flex items-center gap-2 hover:underline"
                  href="mailto:aayushid81@gmail.com"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  <span>aayushid81@gmail.com</span>
                </a>
                <CopyIconButton textToCopy="aayushid81@gmail.com" />
              </div>

              <div className="flex items-center gap-1">
                <a
                  className="inline-flex items-center gap-2 hover:underline"
                  href="tel:+918780684875"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  <span>+91 8780684875</span>
                </a>
                <CopyIconButton textToCopy="+918780684875" />
              </div>

            </div>
          </div>

          <div className="w-full md:basis-7/12 md:flex-1">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}