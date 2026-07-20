'use client';

import { useState } from 'react';
import { Container } from "@/components/layout/Container";
import { Star } from "lucide-react";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    message: '',
    rating: '5',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({ name: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { name: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      hasError = true;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/submit-testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', position: '', message: '', rating: '5' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform">
        <div className="h-[40rem] w-[40rem] rounded-full bg-slate-100/50 blur-3xl" />
      </div>

      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mx-auto mb-12 text-center max-w-xl">
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Share Your <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">Experience</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              I truly value your feedback. Let others know how our collaboration helped bring your ideas to life.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 md:p-12 relative">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Your Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 hover:border-slate-300"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Position / Company</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="CEO at TechCorp"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 hover:border-slate-300"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Rating</label>
                <div className="flex items-center gap-4 p-2 bg-slate-50/50 rounded-2xl border border-slate-200 w-fit pr-4">
                  <div className="flex items-center gap-1 pl-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFormData({ ...formData, rating: star.toString() })}
                        className="focus:outline-none transition-transform duration-200 hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`h-8 w-8 transition-all duration-200 ${
                            star <= (hoverRating || parseInt(formData.rating))
                              ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                              : "fill-slate-200 text-slate-200 hover:fill-slate-300 hover:text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
                  <span className="text-sm font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm min-w-[3.5rem] text-center">
                    {formData.rating} / 5
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Your Testimonial <span className="text-red-500">*</span></label>
                <textarea
                  name="message"
                  onChange={handleChange}
                  value={formData.message}
                  placeholder="How was your experience working with me? What did we achieve together?"
                  className="min-h-[160px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 hover:border-slate-300"
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              {status === 'success' && (
                <p className="text-sm text-emerald-700">Thank you! Your testimonial has been received.</p>
              )}
              
              {status === 'error' && (
                <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group relative flex h-14 w-full sm:w-auto min-w-[200px] items-center justify-center overflow-hidden rounded-2xl bg-slate-900 px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'loading' ? (
                      <>
                        <svg className="h-5 w-5 animate-spin text-white/80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Testimonial
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  {status !== 'loading' && (
                    <div className="absolute inset-0 h-full w-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
