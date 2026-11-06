import { NextResponse } from 'next/server';
import { db } from '../../../db';         // Direct relative path to db/index.ts
import { usersTable } from '../../../db/schema'; // Direct relative path to db/schema.ts
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { publicKey } = await req.json();

    if (!publicKey || typeof publicKey !== 'string') {
      return NextResponse.json({ error: 'Valid public key required' }, { status: 400 });
    }

    // Check if user already exists in PostgreSQL
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.publicKey, publicKey));

    if (existingUser.length === 0) {
      // Insert new user into database
      await db.insert(usersTable).values({ publicKey });
    }

    return NextResponse.json({ success: true, message: 'SIWS authentication and session saved successfully' });
  } catch (error: any) {
    console.error('Backend SIWS Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}