'use client';

import { useState } from 'react';

export default function DownloaderPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Mengirim...');

    const res = await fetch('/api/downloader', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setStatus(res.ok ? `Job dibuat: ${data.jobId} (status: ${data.status})` : `Error: ${data.error}`);
  };

  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold">Downloader</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          required
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button type="submit" className="rounded-lg bg-zinc-900 px-5 text-white dark:bg-white dark:text-zinc-900">
          Submit
        </button>
      </form>
      {status && <p className="text-sm text-zinc-500">{status}</p>}
    </div>
  );
}
