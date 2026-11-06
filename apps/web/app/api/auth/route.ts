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