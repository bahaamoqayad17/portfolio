import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/auth/signin' || 
    path === '/auth/signup' || 
    path === '/';

  // Check if the path is for dashboard
  const isDashboardPath = path.startsWith('/dashboard');

  // Get the session token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Redirect logic
  if (isPublicPath && token) {
    // If user is on public page but already logged in, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isDashboardPath && !token) {
    // If user is trying to access dashboard without being logged in
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/auth/signin',
    '/auth/signup',
    '/auth/signout',
  ],
};