'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDashboardStats } from '@/hooks/useDashboardStats';

export default function DashboardPage() {
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id;
  const liveActivity = useDashboardStats(userId);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard/stats').then((r) => r.json()).then(setStats);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">Total Download</p>
          <p className="text-2xl font-bold">{stats?.totalDownloads ?? '—'}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">Total Pesan</p>
          <p className="text-2xl font-bold">{stats?.totalMessages ?? '—'}</p>
        </div>
      </div>

      <div>
        <h2 className="mb-2 font-medium">Aktivitas Terbaru</h2>
        <ul className="space-y-1 text-sm">
          {liveActivity.map((a) => (
            <li key={a.id} className="rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900">{a.action}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
