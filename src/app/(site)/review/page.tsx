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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <section className="py-16">
      <Container>
        <div className="max-w-xl mx-auto">
          <div className="mx-auto mb-10 text-center">
            <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
              Share Your <span className="font-extrabold">Experience</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              I'd love to hear your feedback about our collaboration.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name *"
                className="w-full rounded-sm border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none ring-0 focus:border-black"
              />
            </div>

            <div>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Position / Company"
                className="w-full rounded-sm border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none ring-0 focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-500 mb-2">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setFormData({ ...formData, rating: star.toString() })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        star <= (hoverRating || parseInt(formData.rating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-200"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-slate-500">
                  {formData.rating} {formData.rating === '1' ? 'Star' : 'Stars'}
                </span>
              </div>
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Testimonial *"
                className="min-h-36 w-full resize-none rounded-sm border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none ring-0 focus:border-black"
              />
            </div>

            {status === 'success' && (
              <p className="text-sm text-emerald-700">Thank you! Your testimonial has been received.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
            )}

            <div className="mt-2 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex h-11 w-full sm:w-auto cursor-pointer items-center justify-center rounded-sm bg-black px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-transparent hover:text-black border border-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Testimonial'}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
