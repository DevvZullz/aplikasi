import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Zullz — Premium AI & Commerce Platform',
  description: 'Platform premium untuk chat AI, creative generation, dan marketplace produk eksklusif.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 text-zinc-100 dark:text-zinc-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
