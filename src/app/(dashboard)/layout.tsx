import Link from 'next/link';
import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r border-zinc-200 p-4 dark:border-zinc-800">
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/dashboard" className="rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">Dashboard</Link>
          <Link href="/chat" className="rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">Chat</Link>
          <Link href="/downloader" className="rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">Downloader</Link>
          {(session.user as any).role === 'ADMIN' && (
            <Link href="/admin" className="rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">Admin</Link>
          )}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
