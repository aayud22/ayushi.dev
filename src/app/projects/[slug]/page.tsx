import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import CursorRings from "@/components/ui/CursorRings";
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyMetrics } from "@/components/case-study/CaseStudyMetrics";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  
  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const url = `https://ayushi-dev.vercel.app/projects/${slug}`;

  return {
    title: caseStudy.metaTitle,
    description: caseStudy.metaDescription,
    openGraph: {
      title: caseStudy.metaTitle,
      description: caseStudy.metaDescription,
      url,
      siteName: "Ayushi's Portfolio",
      images: [
        {
          url: caseStudy.ogImage,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.metaTitle,
      description: caseStudy.metaDescription,
      images: [caseStudy.ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <PageLayout>
      <main className="w-full flex-1 pt-32 pb-20 bg-white">
        <CursorRings />
        <Container>
          <div className="max-w-3xl mx-auto md:mx-0">
            <CaseStudyHeader 
              title={caseStudy.title} 
              liveUrl={caseStudy.liveUrl} 
              githubUrl={caseStudy.githubUrl} 
            />
            
            <CaseStudyMetrics metrics={caseStudy.metrics} />

            <div className="space-y-6">
              {caseStudy.sections.map((section, index) => (
                <CaseStudySection key={index} section={section} />
              ))}
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
