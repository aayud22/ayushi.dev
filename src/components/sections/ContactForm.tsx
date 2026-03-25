"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/validations/contact";
import type { ContactInput } from "@/lib/validations/contact";

export function ContactForm({ className }: { className?: string }) {
  const [serverSuccess, setServerSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    setServerError(null);
    setServerSuccess(false);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      setServerError("Something went wrong. Please try again.");
      return;
    }

    setServerSuccess(true);
    reset();

    setTimeout(() => {
      setServerSuccess(false);
    }, 5000);
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <div>
          <input
            className="w-full rounded-sm border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none ring-0 focus:border-black"
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name?.message ? (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          ) : null}
        </div>

        <div>
          <input
            className="w-full rounded-sm border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none ring-0 focus:border-black"
            placeholder="Email"
            type="email"
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          ) : null}
        </div>

        <div>
          <textarea
            className="min-h-36 w-full resize-none rounded-sm border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none ring-0 focus:border-black"
            placeholder="How can I help?*"
            {...register("message")}
          />
          {errors.message?.message ? (
            <p className="mt-1 text-xs text-red-600">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        {serverError ? (
          <p className="text-sm text-red-600">{serverError}</p>
        ) : null}
        {serverSuccess ? (
          <p className="text-sm text-emerald-700">Message sent successfully.</p>
        ) : null}

        <div className="mt-2 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-sm bg-black px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-transparent hover:text-black border border-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Get In Touch"}
          </button>
        </div>
      </div>
    </form>
  );
}