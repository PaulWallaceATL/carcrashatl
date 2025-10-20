import { type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware-helper'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response, user } = await createMiddlewareClient(request)

  // Protected admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      // If already logged in, redirect to dashboard
      if (user) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      return response
    }

    // For all other admin routes, require authentication
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}

