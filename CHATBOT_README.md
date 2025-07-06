# AI Chatbot for Portfolio

This is a modern AI chatbot implementation for a portfolio website using Next.js, Supabase, and OpenAI. The chatbot can answer questions about your skills, experience, projects, and more using Retrieval-Augmented Generation (RAG) to provide accurate and relevant responses.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Usage](#usage)
- [Development](#development)
- [Customization](#customization)
- [Deployment](#deployment)

## Features

- 💬 Interactive chat interface with markdown support
- 🧠 Context-aware responses using RAG (Retrieval-Augmented Generation)
- ✨ Modern UI with dark/light mode support
- 🚀 Fast, responsive, and accessible
- 🔍 Semantic search using Supabase vector search
- 🤖 Powered by OpenAI GPT-4
- ⚡ Real-time streaming responses
- 🛑 Ability to stop generation mid-response
- 📱 Mobile-friendly interface
- 🔒 Secure API routes for sensitive operations

## Setup

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- An OpenAI API key with access to GPT-4

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

### Database Setup

1. **Enable pgvector Extension**

Run the following SQL in your Supabase SQL editor:

```sql
-- Enable the pgvector extension
create extension if not exists vector;
```

2. **Create the Documents Table**

```sql
create table documents (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  metadata jsonb,
  embedding vector(1536),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

3. **Create Similarity Search Function**

```sql
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
```

Or use the provided setup script:

```bash
cd scripts
npm install
npm run setup-db
```

4. **Ingest Your Data**

Edit the `portfolioData` array in `scripts/ingest-data.ts` with your information, then run:

```bash
npm run ingest
```

## Usage

1. **Start the development server**:

```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Click the chat icon in the bottom right corner to start chatting.

### Available Commands

- `⌘K` or `/` - Focus the chat input
- `Esc` - Close the chat
- `Stop` button - Stop the current response generation
  - Ask about skills, experience, projects, etc.
  - The AI will use the context from your portfolio to answer

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Customization

- **Styling**: Modify the chat interface in `app/chat/components/chat/chat-interface.tsx`
- **Prompt Engineering**: Adjust the system prompt in `app/api/chat/route.ts`
- **Vector Search**: Tune the similarity threshold in the API route

## License

MIT
