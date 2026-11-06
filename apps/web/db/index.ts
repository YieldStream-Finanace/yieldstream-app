import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/yieldstream';

// Disable prefetch as recommended for Next.js serverless / edge environments
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });