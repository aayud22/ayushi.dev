import { NextResponse } from "next/server";
import openai from "@/app/chat/lib/openai/client";
import { supabase } from "@/app/chat/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Step 1: Get relevant context from Supabase using vector search
    const { data: embeddingData, error: embeddingError } =
      await supabase.functions.invoke("embed", {
        body: { input: message },
      });

    if (embeddingError) {
      console.error("Error generating embedding:", embeddingError);
      throw new Error("Failed to generate embedding");
    }

    const { embedding } = embeddingData;

    // Step 2: Search for relevant context in Supabase
    const { data: contextData, error: searchError } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 5,
      }
    );

    if (searchError) {
      console.error("Error searching documents:", searchError);
      throw new Error("Failed to search documents");
    }

    // Step 3: Generate response using OpenAI
    const context = contextData
      .map((doc: any) => `Source: ${doc.content}`)
      .join("\n\n");

    const systemPrompt = `You are a helpful AI assistant for a portfolio website. 
Use the following context to answer the user's question. If you don't know the answer, say that you don't know, don't try to make up an answer.

Context: ${context}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const response =
      completion.choices[0]?.message?.content ||
      "I am sorry, I cannot answer that question at the moment.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
