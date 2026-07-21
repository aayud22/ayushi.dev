import { CaseStudy } from "./types";
import { scrapesmartAi } from "./scrapesmart-ai";

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "scrapesmart-ai": scrapesmartAi,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}
