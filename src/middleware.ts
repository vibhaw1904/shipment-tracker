import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow the requests if the following is true...
  // 1. It's a request for next-auth session & provider fetching
  // 2. It's a request to /api/auth
  // 3. The token exists

  if (
    pathname === '/' ||
    pathname.startsWith('/api/auth') ||
    token
  ) {
    return NextResponse.next();
  }

  // Redirect to login if the user doesn't have a token and is requesting a protected route
  if (!token && pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: [
    // Protect all pages except the following:
   
    '/((?!api/auth|_next/static|_next/image|favicon.ico|signin|signup).*)',
  ],
};
