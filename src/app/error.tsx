"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/layout/Container";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <PageLayout>
      <main className="flex flex-1 flex-col items-center justify-center py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-8xl font-extrabold text-slate-900 tracking-tighter drop-shadow-sm">
                500
              </span>
              <div className="h-1 w-16 bg-slate-900 mx-auto rounded-full mt-4" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              Something went wrong
            </h1>

            <p className="text-base leading-7 text-slate-600 mb-10 max-w-md mx-auto">
              An unexpected error occurred. Please try again or return to the homepage.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => reset()}
                className="inline-flex h-11 items-center justify-center rounded-sm bg-slate-900 px-8 text-sm font-semibold text-white transition-colors duration-200 border border-black hover:bg-transparent hover:text-black cursor-pointer"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-sm bg-white px-8 text-sm font-semibold text-slate-900 transition-colors duration-200 border border-slate-300 hover:border-slate-900"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
