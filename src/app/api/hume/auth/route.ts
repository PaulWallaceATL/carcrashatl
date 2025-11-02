import { NextResponse } from 'next/server';

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

    // Generate access token for EVI via OAuth client credentials
    const basic = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');
    const res = await fetch('https://api.hume.ai/oauth2-cc/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basic}`,
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
      // No caching of tokens at the edge
      cache: 'no-store',
    });

    if (!res.ok) {
      let details: unknown;
      try {
        details = await res.json();
      } catch {
        details = await res.text();
      }
      console.error('Hume token request failed', { status: res.status, details });
      return NextResponse.json(
        {
          error: 'Failed to generate access token',
          message: typeof details === 'string' && details.trim() ? details : `Hume responded with ${res.status}`,
        },
        { status: 500 }
      );
    }

    const data = await res.json();
    const accessToken = data?.access_token as string;

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

