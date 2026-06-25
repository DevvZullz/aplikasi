import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-zinc-900 to-purple-950/30 border-r border-purple-500/20 p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-black gradient-text">ZULLZ</h1>
          <p className="text-purple-400 text-xs font-light mt-1">Premium Platform</p>
        </div>

        <nav className="space-y-3">
          <NavLink href="/dashboard" label="Dashboard" icon="📊" />
          <NavLink href="/products" label="Tabel Produk" icon="🛍️" />
          <NavLink href="/chat-ai" label="Chat AI" icon="🤖" />
          <NavLink href="/create" label="Create AI" icon="✨" />
          <NavLink href="/profile" label="Akun Saya" icon="👤" />
        </nav>

        <div className="pt-6 border-t border-purple-500/20 space-y-3">
          <p className="text-xs text-zinc-500 font-semibold">AKUN</p>
          <div className="text-sm">
            <p className="text-purple-300 font-semibold">{session.user?.name}</p>
            <p className="text-zinc-500 text-xs">{session.user?.email}</p>
          </div>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <button className="w-full mt-4 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 text-sm font-semibold">
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/30 transition group">
      <span className="text-xl group-hover:scale-110 transition">{icon}</span>
      <span className="text-sm font-semibold text-zinc-300 group-hover:text-purple-300">{label}</span>
    </a>
  );
}
