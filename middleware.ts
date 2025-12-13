import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Redirect authenticated users from login page
    if (req.nextauth.token && req.nextUrl.pathname.startsWith('/auth/login')) {
      return NextResponse.redirect(new URL('/influencers', req.url));
    }
    
    // Redirect authenticated users from home to influencers
    if (req.nextauth.token && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/influencers', req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes
        if (req.nextUrl.pathname.startsWith('/auth/login') || 
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname.startsWith('/api/auth')) {
          return true;
        }
        // Protected routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};