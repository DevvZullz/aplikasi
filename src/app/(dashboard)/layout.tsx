import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/login');

  const isAdmin = (session.user as any)?.role === 'ADMIN';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-zinc-900 to-purple-950/30 border-b border-purple-500/20 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black gradient-text">Zullz Hosting</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">{session.user?.name}</span>
          {isAdmin && <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300">ADMIN</span>}
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }); }}>
            <button className="text-sm px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-400 transition">Keluar</button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-gradient-to-t from-zinc-900 to-purple-950/30 border-t border-purple-500/20 px-6 py-4">
        <div className="flex justify-center gap-4 max-w-7xl mx-auto">
          <NavLink href="/dashboard/products" label="Produk" icon="🛍️" />
          <NavLink href="/dashboard/chat-ai" label="Chat AI" icon="🤖" />
          <NavLink href="/dashboard/create" label="Buat Gambar" icon="✨" />
          <NavLink href="/dashboard/profile" label="Saya" icon="👤" />
          {isAdmin && <NavLink href="/admin" label="Admin" icon="⚙️" />}
        </div>
      </nav>
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a href={href} className="flex flex-col items-center gap-1 px-6 py-2 rounded-lg hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/30 transition group">
      <span className="text-xl group-hover:scale-110 transition">{icon}</span>
      <span className="text-xs font-semibold text-zinc-300 group-hover:text-purple-300">{label}</span>
    </a>
  );
}
