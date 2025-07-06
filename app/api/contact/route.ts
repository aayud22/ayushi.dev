import { NextResponse } from "next/server";
import { Resend } from "resend";
import validator from "validator";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Validate required fields
const validateRequiredFields = (fields: Record<string, any>) => {
  const missingFields = Object.entries(fields)
    .filter(
      ([_, value]) =>
        !value || (typeof value === "string" && value.trim() === "")
    )
    .map(([key]) => key);

  return missingFields.length === 0 ? null : missingFields;
};

// Sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  if (!input) return "";
  return validator.escape(validator.trim(input));
};

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();

    // Check if all required fields are present
    const requiredFields = ["name", "email", "subject", "message"];
    const missingFields = validateRequiredFields(body);

    if (missingFields) {
      return NextResponse.json(
        {
          error: "All fields are required",
          missingFields: missingFields.reduce(
            (acc, field) => ({
              ...acc,
              [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
            }),
            {}
          ),
        },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const name = sanitizeInput(body.name);
    const email = sanitizeInput(body.email).toLowerCase();
    const subject = sanitizeInput(body.subject);
    const message = sanitizeInput(body.message);

    // Validate email format
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // If you want to use Resend for sending emails, uncomment this section

    const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 0 16px;
          }
          .email-card {
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
            margin: 24px 0;
          }
          .email-header {
            background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
            padding: 32px 0;
            text-align: center;
            color: white;
          }
          .email-logo {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          .email-title {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
            color: white;
          }
          .email-body {
            padding: 32px;
          }
          .field {
            margin-bottom: 24px;
          }
          .field-label {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
            display: block;
          }
          .field-value {
            font-size: 15px;
            line-height: 1.6;
            color: #1f2937;
            background: #f9fafb;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            word-break: break-word;
          }
          .message {
            white-space: pre-line;
            line-height: 1.7;
            min-height: 120px;
          }
          .email-footer {
            background: #f9fafb;
            padding: 24px 32px;
            text-align: center;
            font-size: 13px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
          }
          .reply-button {
            display: inline-block;
            background: #4f46e5;
            color: white !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            margin: 24px 0;
            transition: all 0.2s ease;
          }
          .reply-button:hover {
            background: #4338ca;
            transform: translateY(-1px);
          }
          @media (max-width: 600px) {
            .email-body {
              padding: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-card">
            <div class="email-header">
              <div class="email-logo">Ayushi.dev</div>
              <h1 class="email-title">New Contact Form Submission</h1>
            </div>
            
            <div class="email-body">
              <div class="field">
                <span class="field-label">From</span>
                <div class="field-value">${name} &lt;${email}&gt;</div>
              </div>
              
              <div class="field">
                <span class="field-label">Subject</span>
                <div class="field-value">${subject}</div>
              </div>
              
              <div class="field">
                <span class="field-label">Message</span>
                <div class="field-value message">${message}</div>
              </div>
              
              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-button">
                  Reply to ${name.split(" ")[0]}
                </a>
              </div>
            </div>
            
            <div class="email-footer">
              <p>This message was sent via the contact form on Ayushi.dev</p>
              <p>© ${new Date().getFullYear()} Ayushi Diyora. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>`;

    // Get admin email from environment variables or use a default
    const adminEmail = process.env.CONTACT_EMAIL || "aayushid81@gmail.com";

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Ayushi.dev <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Contact: ${subject}`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    // Log successful submission (without sensitive data)
    console.log("Contact form submission received successfully", {
      email: email, // Only log hashed email in production
      subject: subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    // Log the full error server-side but don't expose details to client
    console.error("Error processing contact form:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
