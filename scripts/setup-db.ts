import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log("Setting up database...");

    // Enable the pgvector extension
    console.log("Enabling pgvector extension...");
    const { data: extensionData, error: extensionError } = await supabase.rpc(
      "create_extension",
      {
        extension_name: "vector",
        if_not_exists: true,
      }
    );

    if (extensionError && !extensionError.message.includes("already exists")) {
      throw extensionError;
    }

    // Create documents table
    console.log("Creating documents table...");
    const { error: tableError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS documents (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          content TEXT NOT NULL,
          metadata JSONB,
          embedding VECTOR(1536),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
        );
      `,
    });

    if (tableError) throw tableError;

    // Create function for similarity search
    console.log("Creating similarity search function...");
    const { error: functionError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE OR REPLACE FUNCTION match_documents (
          query_embedding VECTOR(1536),
          match_threshold FLOAT,
          match_count INT
        )
        RETURNS TABLE (
          id UUID,
          content TEXT,
          metadata JSONB,
          similarity FLOAT
        )
        LANGUAGE SQL
        AS $$
          SELECT
            documents.id,
            documents.content,
            documents.metadata,
            1 - (documents.embedding <=> query_embedding) AS similarity
          FROM documents
          WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
          ORDER BY similarity DESC
          LIMIT match_count;
        $$;
      `,
    });

    if (functionError) throw functionError;

    console.log("✅ Database setup completed successfully!");
  } catch (error) {
    console.error("❌ Error setting up database:");
    console.error(error);
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  setupDatabase();
}
