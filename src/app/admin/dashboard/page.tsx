'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats);
  }, []);

  return (
    <div className="space-y-8 max-w-6xl">
      <h1 className="text-4xl font-black text-red-400">📊 Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon="👥" label="Total Users" value={stats.totalUsers ?? 0} />
        <StatCard icon="🛍️" label="Total Produk" value={stats.totalProducts ?? 0} />
        <StatCard icon="⭐" label="Status" value="AKTIF" />
      </div>

      <div className="card-luxury">
        <h2 className="text-xl font-bold mb-4">Operasi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/products" className="btn-3d">➕ Tambah Produk</a>
          <a href="/admin/users" className="px-6 py-3 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 font-semibold hover:bg-purple-500/20">👥 Lihat Users</a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: any }) {
  return (
    <div className="card-luxury text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-zinc-400 text-sm">{label}</p>
      <p className="text-2xl font-bold text-red-400">{value}</p>
    </div>
  );
}
