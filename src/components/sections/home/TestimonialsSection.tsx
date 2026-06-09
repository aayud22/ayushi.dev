"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Container } from "@/components/layout/Container";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('name, position, message')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform DB data to match your component
        const formatted = (data || []).map(item => ({
          name: item.name,
          role: item.position || "Client",
          quote: item.message,
        }));

        setTestimonials(formatted);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto mb-10 text-center">
          <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
            My <span className="font-extrabold">Testimonial</span>
          </h2>
          <p className="text-slate-600 mt-2">What clients say about working with me</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-slate-500">Loading testimonials...</p>
          </div>
        ) : testimonials.length > 0 ? (
          <TestimonialsMarquee items={testimonials} />
        ) : (
          <div className="text-center py-12 text-slate-500">
            No testimonials yet. Be the first to leave one!
          </div>
        )}
      </Container>
    </section>
  );
}