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

// Sample portfolio data - replace with your actual data
const portfolioData = [
  {
    type: "project",
    title: "Interactive Landing Page",
    description:
      "A Framer Motion + Tailwind landing page with animated sections and smooth scroll.",
    techStack: ["Next.js", "Framer Motion", "Tailwind"],
    url: "https://example.com/project",
  },
  // Add more projects, experience, skills, etc.
];

async function generateEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

async function ingestData() {
  try {
    for (const item of portfolioData) {
      // Convert the item to a string for embedding
      const content = JSON.stringify(item);

      // Generate embedding for the content
      const embedding = await generateEmbedding(content);

      // Save to Supabase
      const { data, error } = await supabase.from("documents").insert([
        {
          content,
          metadata: {
            type: item.type,
            title: item.title,
            url: item.url,
          },
          embedding,
        },
      ]);

      if (error) {
        console.error("Error inserting document:", error);
      } else {
        console.log(`Successfully ingested: ${item.title}`);
      }
    }

    console.log("Data ingestion complete!");
  } catch (error) {
    console.error("Error in data ingestion:", error);
  }
}

// Run the ingestion
if (require.main === module) {
  ingestData();
}
