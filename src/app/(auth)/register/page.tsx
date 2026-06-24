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
      setError('Gagal terhubung ke server: ' + (err?.message ?? ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Daftar</h1>
          <p className="mt-1 text-sm text-zinc-500">Buat akun baru</p>
        </div>
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required minLength={2}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            type="password"
            placeholder="Password (min. 8 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required minLength={8}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 font-medium text-white disabled:opacity-50 dark:bg-white dark:text-zinc-900"
          >
            {loading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>
        <p className="text-center text-sm text-zinc-500">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-medium text-zinc-900 dark:text-white">Masuk</Link>
        </p>
      </div>
    </main>
  );
}
