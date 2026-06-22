import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Life Hub</h1>
      <p className="max-w-md text-zinc-500 dark:text-zinc-400">
        All-in-One Life Utility — dashboard, chat, dan downloader dalam satu aplikasi.
      </p>
      <div className="flex gap-4">
        <Link href="/login" className="rounded-lg bg-zinc-900 px-5 py-2.5 text-white dark:bg-white dark:text-zinc-900">
          Masuk
        </Link>
        <Link href="/register" className="rounded-lg border border-zinc-300 px-5 py-2.5 dark:border-zinc-700">
          Daftar
        </Link>
      </div>
    </main>
  );
}
