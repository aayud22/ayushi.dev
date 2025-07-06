# Portfolio Chatbot Scripts

This directory contains utility scripts for setting up and managing the portfolio AI chatbot.

## Setup

1. Copy `.env.example` to `.env` and fill in your environment variables:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

### Setup Database

Sets up the Supabase database with the required tables and functions:

```bash
npm run setup-db
```

### Ingest Data

Ingests your portfolio data into Supabase with embeddings:

```bash
npm run ingest
```

### Development

Run the ingestion script in development mode with auto-reload:

```bash
npm run dev
```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for admin operations)
- `OPENAI_API_KEY` - Your OpenAI API key

## Adding New Data

To add new data to your chatbot's knowledge base:

1. Edit the `portfolioData` array in `ingest-data.ts`
2. Run the ingestion script:
   ```bash
   npm run ingest
   ```

## Troubleshooting

- If you get TypeScript errors, make sure all dependencies are installed
- Check that your environment variables are set correctly
- Ensure your Supabase project has the `pgvector` extension enabled
