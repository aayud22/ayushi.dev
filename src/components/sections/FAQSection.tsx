"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/content/faq";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white">
      <Container>
        <div className="mx-auto mb-12 text-center max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-black">
            Frequently Asked <span className="text-slate-400">Questions</span>
          </h2>
          <p className="mt-3 text-slate-600">
            Everything you need to know about my availability and workflow.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFAQ(item.id)}
                  aria-controls={`faq-answer-${item.id}`}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-semibold text-slate-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  id={`faq-answer-${item.id}`}
                  className={cn(
                    "grid transition-all duration-200 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
