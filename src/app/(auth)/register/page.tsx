'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Gagal mendaftar');
      return;
    }

    router.push('/login');
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Daftar</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <input
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <input
          type="password"
          placeholder="Password (min. 8 karakter)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={8}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button type="submit" className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-white dark:bg-white dark:text-zinc-900">
          Daftar
        </button>
      </form>
    </main>
  );
}
