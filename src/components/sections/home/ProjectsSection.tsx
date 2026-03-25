"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/constants";
import { Pill } from "@/components/ui/Pill";
import type { Project } from "@/constants/projects";
import { Container } from "@/components/layout/Container";

const FALLBACK_IMAGE = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZmFmYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzk0YTNiOCIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==";

function ProjectCard({ p }: { p: Project }) {
  const [imgSrc, setImgSrc] = useState(p?.image);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="group relative aspect-video w-full overflow-hidden bg-slate-50 border-b border-slate-100">
        <Image
          fill
          alt={p?.title}
          src={imgSrc || FALLBACK_IMAGE}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => {
            setImgSrc(FALLBACK_IMAGE);
          }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 line-clamp-2">
            {p?.title}
          </h3>
          <span className="text-sm font-semibold text-slate-400 shrink-0">
            {String(p?.id).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {p?.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p?.tags?.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        <div className="mt-auto pt-8 flex flex-wrap gap-3">
          {p?.liveUrl && (
            <a
              target="_blank"
              href={p?.liveUrl}
              rel="noopener noreferrer"
              className="inline-flex h-10 flex-1 items-center justify-center rounded-sm bg-slate-900 hover:bg-transparent hover:text-black px-3 text-sm font-semibold text-white transition-colors duration-200 border border-black text-center"
            >
              Live Demo
            </a>
          )}
          {p?.githubUrl && (
            <a
              target="_blank"
              href={p?.githubUrl}
              rel="noopener noreferrer"
              className="inline-flex h-10 flex-1 items-center justify-center rounded-sm border border-black bg-white px-3 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:bg-black hover:text-white text-center"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16">
      <Container>
        <div className="mx-auto mb-10 text-center">
          <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
            My <span className="font-extrabold">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS?.map((p) => (
            <ProjectCard key={p?.id} p={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}