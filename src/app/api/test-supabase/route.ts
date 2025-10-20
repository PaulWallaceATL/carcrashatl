import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Test endpoint to verify Supabase connection
 * Visit: /api/test-supabase
 */
export async function GET() {
  try {
    const supabase = await createClient()
    
    // Test the connection by querying the Supabase metadata
    const { data, error } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1)
    
    // Even if the table doesn't exist, we should get an error from Supabase
    // which means the connection is working
    if (error) {
      // Check if it's a "table doesn't exist" error, which is fine for testing
      if (error.message.includes('relation') || error.code === 'PGRST116') {
        return NextResponse.json({
          success: true,
          message: '✅ Supabase connection successful!',
          note: 'Connection established. Ready to create tables.',
          timestamp: new Date().toISOString()
        })
      }
      
      // If it's a different error, connection might have issues
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        hint: 'Check your environment variables in Vercel/local .env.local'
      }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      message: '✅ Supabase connection successful!',
      data,
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      hint: 'Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set'
    }, { status: 500 })
  }
}

