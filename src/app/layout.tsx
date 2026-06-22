import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Life Hub — All-in-One Life Utility',
  description: 'Aplikasi produktivitas dan interaksi sehari-hari',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
