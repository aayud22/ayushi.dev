import Link from 'next/link';
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <PageLayout>
      <main className="flex flex-1 flex-col items-center justify-center py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-9xl font-extrabold text-slate-900 tracking-tighter drop-shadow-sm">
                404
              </span>
              <div className="h-1 w-16 bg-slate-900 mx-auto rounded-full mt-4"></div>
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              Oops! Page Not Found
            </h1>
            
            <p className="text-base leading-7 text-slate-600 mb-10 max-w-md mx-auto">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-sm bg-slate-900 px-8 text-sm font-semibold text-white transition-colors duration-200 border border-black hover:bg-transparent hover:text-black"
            >
              Back to Homepage
            </Link>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
