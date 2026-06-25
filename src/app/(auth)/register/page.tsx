'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Gagal mendaftar'); return; }
      router.push('/login?registered=1');
    } catch (err: any) {
      setError('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black gradient-text">ZULLZ</h1>
          <p className="text-purple-400 text-sm font-light tracking-widest">PREMIUM PLATFORM</p>
        </div>

        <div className="card-luxury space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Bergabunglah Sekarang</h2>
            <p className="text-zinc-400 text-sm">Buat akun premium untuk akses unlimited</p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-300">NAMA</label>
              <input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-white placeholder-zinc-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-300">EMAIL</label>
              <input type="email" placeholder="nama@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-white placeholder-zinc-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-300">PASSWORD</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-white placeholder-zinc-500" />
            </div>

            <button type="submit" disabled={loading} className="btn-3d w-full mt-8 disabled:opacity-50">
              {loading ? 'MEMBUAT AKUN...' : 'DAFTAR SEKARANG'}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-400">
            Sudah punya akun? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">Masuk Di Sini</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
