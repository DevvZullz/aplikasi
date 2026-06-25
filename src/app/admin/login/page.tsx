'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@zullz.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.error) { setError('Email atau password admin salah'); return; }
      router.push('/admin/dashboard');
    } catch {
      setError('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-red-500">⚙️ ADMIN PANEL</h1>
          <p className="text-purple-400 text-sm">Zullz Hosting Management</p>
        </div>

        <div className="card-luxury space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Admin Login</h2>
            <p className="text-zinc-400 text-sm">Kelola platform Zullz Hosting</p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-300">EMAIL ADMIN</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-white" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-300">PASSWORD</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-white placeholder-zinc-500" />
            </div>

            <button type="submit" disabled={loading} className="btn-3d w-full mt-8 disabled:opacity-50">
              {loading ? 'MASUK...' : 'MASUK ADMIN'}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-400">
            Bukan admin? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">Kembali ke Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
