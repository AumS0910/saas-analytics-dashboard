import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /dashboard, /login)
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/'];
  const isPublicPath = publicPaths.includes(path);

  // Define dashboard paths that require authentication
  const isDashboardPath = path.startsWith('/dashboard');

  // Check if user is authenticated by looking for auth token
  const token = request.cookies.get('auth_token')?.value ||
                request.headers.get('authorization')?.replace('Bearer ', '');

  // For demo purposes, also check localStorage (though this won't work in middleware)
  // In production, you'd use proper session cookies or JWT tokens

  if (isDashboardPath && !token) {
    // User is not authenticated and trying to access dashboard
    // Redirect to login page
    const loginUrl = new URL('/login', request.url);
    // Add the current path as a query parameter so we can redirect back after login
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicPath && token) {
    // User is authenticated and trying to access login/signup
    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};