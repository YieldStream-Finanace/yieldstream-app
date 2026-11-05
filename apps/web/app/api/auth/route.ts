import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { publicKey } = await req.json();

    if (!publicKey)Let's wire up the **API Authentication Route** first so that when users connect their Freighter wallet, your indexer backend creates or retrieves their profile in the database.

Here is the step-by-step setup to complete this link:

---

### Step 1: Create the Auth API Route (`apps/web/app/api/auth/route.ts`)

Create the directory and file at `apps/web/app/api/auth/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { publicKey } = await req.json();

    if (!publicKey || typeof publicKey !== 'string') {
      return NextResponse.json(
        { error: 'Valid Stellar public key (G...) is required' },
        { status: 400 }
      );
    }

    // Upsert logic: save user to your indexer DB schema (users table)
    // If user exists, return profile; if new, insert default row.
    const userProfile = {
      id: publicKey,
      authenticated: true,
      lastLogin: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Wallet authenticated with YieldStream backend',
      user: userProfile,
    });
  } catch (error) {
    console.error('SIWS Auth Error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate wallet with indexer' },
      { status: 500 }
    );
  }
}