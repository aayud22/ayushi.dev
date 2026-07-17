"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
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
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      if (!supabase) {
        console.warn("Missing Supabase credentials. Testimonials will not be loaded.");
        setLoading(false);
        return;
      }
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

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto mb-10 text-center">
          <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
            My <span className="font-extrabold">Testimonials</span>
          </h2>
          <p className="text-slate-600 mt-2">What clients say about working with me</p>
        </div>

        <TestimonialsMarquee items={testimonials} />
      </Container>
    </section>
  );
}