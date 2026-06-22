import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isLoggedIn = !!req.auth;
  const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard') || isAdminRoute;

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAdminRoute && (req.auth?.user as any)?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
});

export const config = { matcher: ['/dashboard/:path*', '/admin/:path*', '/chat/:path*', '/downloader/:path*'] };
