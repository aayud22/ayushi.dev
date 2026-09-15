import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, position, message, rating } = await req.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 },
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase configuration: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.");
      return NextResponse.json(
        { error: "Supabase environment variables are missing on the server." },
        { status: 500 },
      );
    }

    // 1. Insert into database first
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: supabaseError } = await supabase
      .from("testimonials")
      .insert([
        {
          name: name.trim(),
          position: position?.trim() || null,
          message: message.trim(),
          rating: parseInt(rating) || 5,
          approved: false,
        },
      ]);

    if (supabaseError) {
      console.error("Supabase Error:", supabaseError);
      return NextResponse.json(
        { error: `Database error: ${supabaseError.message}` },
        { status: 500 },
      );
    }

    // 2. Send email notification in non-blocking try-catch (so SMTP failures don't block testimonial submission)
    if (process.env.SMTP_HOST) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.MAIL_TO,
          subject: `New Testimonial from ${name}`,
          html: `
            <h2>New Testimonial Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Position:</strong> ${position || "Not provided"}</p>
            <p><strong>Rating:</strong> ${rating}/5</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email notification error (testimonial was saved to DB successfully):", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you so much! Your testimonial has been submitted successfully. ❤️",
    });
  } catch (error: any) {
    console.error("Submit Testimonial Error:", error);
    return NextResponse.json(
      {
        error: error?.message || "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
