import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== 'ADMIN') redirect('/admin/login');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-red-950/50 to-purple-950/30 border-b border-red-500/20 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-red-400">⚙️ Admin Panel</h1>
        <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }); }}>
          <button className="text-sm px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-400 transition">Keluar</button>
        </form>
      </header>

      <div className="flex flex-1">
        <aside className="w-56 bg-gradient-to-b from-zinc-900 to-purple-950/30 border-r border-red-500/20 p-6 space-y-6">
          <nav className="space-y-3">
            <AdminLink href="/admin/dashboard" label="Dashboard" icon="📊" />
            <AdminLink href="/admin/products" label="Kelola Produk" icon="🛍️" />
            <AdminLink href="/admin/users" label="Users" icon="👥" />
          </nav>
        </aside>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition group">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-semibold text-zinc-300 group-hover:text-red-300">{label}</span>
    </a>
  );
}
