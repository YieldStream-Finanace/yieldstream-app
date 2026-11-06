import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Ensure DATABASE_URL is defined in your environment variables (.env.local)
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/yieldstream';

// Disable prefetch as required for transaction pooling environments (like Supabase / Neon)
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);