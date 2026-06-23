import type { NextAuthConfig } from 'next-auth';

// Konfigurasi ringan untuk middleware (tanpa import bcrypt)
// Logika authorize penuh ada di src/lib/auth.ts
export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  providers: [],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = (user as any).role;
      return token;
    },
    session: async ({ session, token }) => {
      (session.user as any).id = token.sub;
      (session.user as any).role = token.role;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      const isDashboardRoute =
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/chat') ||
        nextUrl.pathname.startsWith('/downloader') ||
        isAdminRoute;

      if (isDashboardRoute && !isLoggedIn) return false;
      if (isAdminRoute && (auth?.user as any)?.role !== 'ADMIN') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  pages: { signIn: '/login' },
};
