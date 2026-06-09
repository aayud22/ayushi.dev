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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

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
      throw new Error("Database error");
    }

    // Send email notification
    if (process.env.SMTP_HOST) {
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
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you so much! Your testimonial has been submitted successfully. ❤️",
    });
  } catch (error) {
    console.error("Submit Testimonial Error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
