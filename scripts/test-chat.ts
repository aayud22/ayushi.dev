import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";
const supabase = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testChat(query: string) {
  console.log(`\n🤔 You: ${query}`);

  try {
    // Step 1: Generate embedding for the query
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: query,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // Step 2: Find similar documents
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
      return;
    }

    // Step 3: Prepare context
    const context = contextData.map((doc: any) => doc.content).join("\n\n");

    const systemPrompt = `You are a helpful AI assistant for a portfolio website. 
Use the following context to answer the user's question. If you don't know the answer, say that you don't know, don't try to make up an answer.

Context: ${context}`;

    // Step 4: Generate response
    console.log("\n🤖 AI is thinking...");
    const stream = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: query,
        },
      ],
      stream: true,
    });

    // Stream the response
    process.stdout.write("🤖 AI: ");
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      process.stdout.write(content);
    }
    console.log("\n");
  } catch (error) {
    console.error("Error in testChat:", error);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function askQuestion() {
    readline.question(
      '\n🤔 You (or type "exit" to quit): ',
      async (query: string) => {
        if (query.toLowerCase() === "exit") {
          readline.close();
          return;
        }

        await testChat(query);
        askQuestion(); // Ask the next question
      }
    );
  }

  console.log("Chatbot test console. Type your questions about the portfolio.");
  console.log('Type "exit" to quit.\n');
  askQuestion();
}
