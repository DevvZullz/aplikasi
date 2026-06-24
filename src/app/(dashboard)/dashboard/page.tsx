'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDashboardStats } from '@/hooks/useDashboardStats';

export default function DashboardPage() {
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id ?? '';
  const liveActivity = useDashboardStats(userId);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!userId) return;
    fetch('/api/dashboard/stats').then((r) => r.json()).then(setStats);
  }, [userId]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">Total Download</p>
          <p className="text-3xl font-bold mt-1">{stats?.totalDownloads ?? '—'}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">Total Pesan</p>
          <p className="text-3xl font-bold mt-1">{stats?.totalMessages ?? '—'}</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-medium">Aktivitas Terbaru</h2>
        {liveActivity.length === 0 ? (
          <p className="text-sm text-zinc-400">Belum ada aktivitas</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {liveActivity.map((a: any) => (
              <li key={a.id} className="rounded-lg bg-zinc-50 px-4 py-2.5 dark:bg-zinc-900">
                {a.action}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
