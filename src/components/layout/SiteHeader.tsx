import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" href={href}>
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container>
        <div className="flex h-16 w-full items-center justify-between">
          <Link href="/#top" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Image src="/icon.svg" alt="" width={24} height={24} aria-hidden="true" priority />
            Ayushi.dev
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/#about" label="About" />
            <NavLink href="/#skills" label="Skills" />
            <NavLink href="/#experience" label="Experience" />
            <NavLink href="/#projects" label="Projects" />
            <NavLink href="/#contact" label="Contact" />
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              className="hidden md:inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
              href="/#contact"
            >
              Hire Me
            </Link>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
