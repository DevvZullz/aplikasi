'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function RegisteredNotice() {
  const searchParams = useSearchParams();
  if (!searchParams.get('registered')) return null;
  return (
    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-400">
      ✓ Akun berhasil dibuat! Silakan masuk.
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.error) { setError('Email atau password salah'); return; }
      router.push('/dashboard');
    } catch {
      setError('Terjadi kesalahan, coba lagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo & Branding */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black gradient-text">ZULLZ</h1>
          <p className="text-purple-400 text-sm font-light tracking-widest">PREMIUM PLATFORM</p>
        </div>

        {/* Card */}
        <div className="card-luxury space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Selamat Datang</h2>
            <p className="text-zinc-400 text-sm">Masuk ke akun premium Anda</p>
          </div>

          <Suspense fallback={null}>
            <RegisteredNotice />
          </Suspense>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-300">EMAIL</label>
              <input
                type="email"
                placeholder="nama@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-white placeholder-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-300">PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-white placeholder-zinc-500"
              />
            </div>

            {/* 3D Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-3d w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'MASUK...' : 'MASUK'}
            </button>
          </form>

          <div className="flex items-center gap-2 before:flex-1 before:h-px before:bg-purple-500/20 after:flex-1 after:h-px after:bg-purple-500/20">
            <span className="text-xs text-zinc-500">ATAU</span>
          </div>

          <p className="text-center text-sm text-zinc-400">
            Belum punya akun?{' '}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
