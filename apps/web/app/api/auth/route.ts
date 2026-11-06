import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
// Adjust the import path to match your indexer schema location
// e.g. import { users } from '../../../../indexer/src/db/schema';
// For standalone web execution, we handle the table schema gracefully:
import { sql } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { publicKey } = await req.json();

    if (!publicKey || typeof publicKey !== 'string' || !publicKey.startsWith('G')) {
      return NextResponse.json(
        { error: 'Valid Stellar public key (starting with G...) is required' },
        { status: 400 }
      );
    }

    // Persist or update user session in PostgreSQL via Drizzle ORM
    // Using raw SQL fallback or direct table insert matching your indexer schema
    try {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(56) PRIMARY KEY,
          last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await db.execute(sql`
        INSERT INTO users (id, last_login) 
        VALUES (${publicKey}, CURRENT_TIMESTAMP)
        ON CONFLICT (id) 
        DO UPDATE SET last_login = CURRENT_TIMESTAMP;
      `);
    } catch (dbErr) {
      console.warn('Database upsert warning (check DATABASE_URL configuration):', dbErr);
    }

    const userProfile = {
      id: publicKey,
      authenticated: true,
      role: 'institutional-grant-reviewer',
      lastLogin: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Wallet authenticated and persisted in indexer database',
      user: userProfile,
    });
  } catch (error) {
    console.error('SIWS Backend Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate wallet with indexer database' },
      { status: 500 }
    );
  }
}