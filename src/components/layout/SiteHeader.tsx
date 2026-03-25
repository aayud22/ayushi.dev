import { Container } from "@/components/layout/Container";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="text-sm font-medium text-slate-700 hover:text-slate-900" href={href}>
      {label}
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-16 w-full items-center justify-between">
          <a href="#top" className="text-sm font-semibold text-slate-900">
            Ayushie.dev
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="#about" label="About" />
            <NavLink href="#skills" label="Skills" />
            <NavLink href="#experience" label="Experience" />
            <NavLink href="#projects" label="Projects" />
            <NavLink href="#contact" label="Contact" />
          </nav>

          <a
            className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            href="#contact"
          >
            Hire Me
          </a>
        </div>
      </Container>
    </header>
  );
}
