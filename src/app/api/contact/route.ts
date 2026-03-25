import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid payload",
          issues: parsed.error.issues,
        },
        { status: 400 },
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_SECURE,
      MAIL_TO,
      MAIL_FROM,
    } = process.env;

    if (
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SMTP_USER ||
      !SMTP_PASS ||
      !MAIL_TO ||
      !MAIL_FROM
    ) {
      return NextResponse.json(
        { ok: false, error: "Server not configured" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const { name, email, message } = parsed.data;

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject: `${name.charAt(0).toUpperCase() + name.slice(1)} contacted you from your portfolio website`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5">
          <h2 style="margin:0 0 12px">New Portfolio Contact</h2>
          <p style="margin:0 0 6px"><strong>Name:</strong> ${name}</p>
          <p style="margin:0 0 12px"><strong>Email:</strong> ${email}</p>
          <p style="margin:0"><strong>Message:</strong></p>
          <pre style="white-space: pre-wrap; margin: 8px 0 0">${message}</pre>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}