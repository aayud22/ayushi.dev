import { NextResponse } from "next/server";
import { GoogleGenAI, ApiError } from "@google/genai";
import { SYSTEM_PROMPT } from "../../../content/chatbot-context";
import type { Content, GenerateContentResponse } from "@google/genai";

const MAX_MESSAGE_LENGTH = 500;

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body as {
      message: string;
      history: ChatMessage[];
    };

    // Basic safeguards
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Build conversation history
    const chatHistory: Content[] = (history ?? []).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: { systemInstruction: SYSTEM_PROMPT },
      history: chatHistory,
    });

    let response: GenerateContentResponse;
    let attempt = 0;
    const maxAttempts = 2;

    while (attempt < maxAttempts) {
      try {
        response = await chat.sendMessage({ message: message.trim() });
        break;
      } catch (error) {
        attempt++;

        // Type-safe error handling
        const isApiError = error instanceof ApiError;
        const status = isApiError ? error.status : undefined;
        const errorMessage = isApiError ? error.message : String(error);

        const isTransient =
          status === 429 ||
          status === 503 ||
          status === 408 ||
          /timeout|rate limit|exhausted|503|429/i.test(errorMessage);

        if (isTransient && attempt < maxAttempts) {
          console.warn(`Transient chat API error (status ${status}). Retrying in 1s (Attempt ${attempt}/${maxAttempts})...`);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        } else {
          throw error;
        }
      }
    }

    const text = response!.text;

    return NextResponse.json({ reply: text });
  } catch (error) {
    // Type-safe outer catch
    let status = 500;
    let errorMessage = "Internal server error";

    if (error instanceof ApiError) {
      if (error.status === 429) {
        status = 429;
        errorMessage = "Rate limit exceeded";
      } else if (error.status) {
        status = error.status;
      }
    }

    console.error("Chat API error:", {
      name: error instanceof Error ? error.name : "Unknown",
      status: error instanceof ApiError ? error.status : undefined,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json({ error: errorMessage }, { status });
  }
}