import { SOCIAL_LINKS } from "@/constants";
import { getExternalLinkProps } from "@/lib/links";
import { Container } from "@/components/layout/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-black">
      <Container>
        <div className="flex w-full flex-col items-center justify-between gap-3 py-8 md:flex-row">
          <p className="text-xs text-white">
            © {new Date().getFullYear()} Ayushie. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.slice(0, 3).map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={`footer-${s.label}`}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white bg-black text-white transition-colors duration-200 hover:bg-white hover:text-black"
                  {...getExternalLinkProps(s.href)}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
