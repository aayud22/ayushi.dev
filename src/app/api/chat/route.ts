import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/content/chatbot-context";

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

    // Build conversation history for the API
    const chatHistory = (history ?? []).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: { systemInstruction: SYSTEM_PROMPT },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message: message.trim() });
    const text = response.text;

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
