import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/signin',
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/apis/:path*',
    '/add-api',
    '/billing/:path*',
  ],
}; 