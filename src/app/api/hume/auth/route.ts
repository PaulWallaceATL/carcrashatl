import { NextResponse } from 'next/server';
import { HumeClient } from 'hume';

export const runtime = 'nodejs';

/**
 * Hume API Authentication Endpoint
 * Generates access tokens for Hume EVI (Empathic Voice Interface)
 */
export async function GET() {
  try {
    const apiKey = process.env.HUME_API_KEY;
    const secretKey = process.env.HUME_SECRET_KEY;

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        { 
          error: 'Hume API credentials not configured',
          message: 'Missing HUME_API_KEY and/or HUME_SECRET_KEY. In local dev, add them to .env.local. In production (e.g., Vercel), add them as Project Environment Variables.'
        },
        { status: 500 }
      );
    }

    // Initialize Hume client (Node SDK v0.15+)
    const client = new HumeClient({
      apiKey: apiKey,
      secretKey: secretKey,
    });

    // Generate access token for EVI (SDK v0.15+)
    const accessToken = await client.empathicVoice.chat.createAccessToken();

    return NextResponse.json({
      accessToken: accessToken,
      expiresIn: 3600, // Token typically expires in 1 hour
    });
  } catch (error) {
    console.error('Error generating Hume access token:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate access token',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

