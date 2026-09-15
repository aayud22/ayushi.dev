"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { TESTIMONIALS } from "@/constants/testimonials";
import { Container } from "@/components/layout/Container";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(TESTIMONIALS);

  useEffect(() => {
    async function fetchTestimonials() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('name, position, message')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map(item => ({
            name: item.name,
            role: item.position || "Client",
            quote: item.message,
          }));
          setTestimonials(formatted);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-10 text-center max-w-xl">
          <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
            Client <span className="font-extrabold">Testimonials</span>
          </h2>
          <p className="text-slate-600 mt-2">What clients and partners say about working with me</p>
          {/* <div className="mt-4">
            <Link
              href="/review"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              ★ Share your feedback / Leave a review
            </Link>
          </div> */}
        </div>

        <TestimonialsMarquee items={testimonials} />
      </Container>
    </section>
  );
}