import Link from "next/link";

interface CaseStudyHeaderProps {
  title: string;
  liveUrl?: string;
  githubUrl?: string;
}

export function CaseStudyHeader({ title, liveUrl, githubUrl }: CaseStudyHeaderProps) {
  return (
    <>
      <div className="mb-10">
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-black transition-colors"
        >
          &larr; Back to Projects
        </Link>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-8">
        {title}
      </h1>

      <div className="flex flex-wrap gap-4 mb-12">
        {liveUrl && (
          <a
            target="_blank"
            href={liveUrl}
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-sm bg-slate-900 px-6 text-sm font-semibold text-white transition-colors duration-200 border border-black hover:bg-transparent hover:text-black"
          >
            Live Demo
          </a>
        )}
        {githubUrl && (
          <a
            target="_blank"
            href={githubUrl}
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-sm border border-black bg-white px-6 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:bg-black hover:text-white"
          >
            GitHub
          </a>
        )}
      </div>
    </>
  );
}
