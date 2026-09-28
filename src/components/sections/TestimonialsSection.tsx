"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Container } from "@/components/layout/Container";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

export function TestimonialsSection() {
  // Khali se shuru: placeholder kabhi nahi dikhenge
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("name, position, message")
          .eq("is_approved", true) // sirf approved reviews
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setTestimonials(
            data.map((item) => ({
              name: item.name,
              role: item.position || "",
              quote: item.message,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    }

    fetchTestimonials();
  }, []);

  // Asli testimonials na hon to poora section hide
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-10 text-center max-w-xl">
          <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
            Client <span className="font-extrabold">Testimonials</span>
          </h2>
          <p className="text-slate-600 mt-2">
            What clients and partners say about working with me
          </p>
        </div>

        <TestimonialsMarquee items={testimonials} />
      </Container>
    </section>
  );
}
