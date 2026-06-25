'use client';

import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-4xl font-black gradient-text">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Selamat datang kembali, {session?.user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🛍️" label="Produk Anda" value="0" />
        <StatCard icon="💬" label="Chat AI" value="0" />
        <StatCard icon="✨" label="Kreasi" value="0" />
        <StatCard icon="⭐" label="Tier" value="PREMIUM" />
      </div>

      <div className="card-luxury">
        <h2 className="text-xl font-bold mb-4">Fitur Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard title="Tabel Produk" desc="Kelola produk dan marketplace Anda" />
          <FeatureCard title="Chat AI" desc="Percakapan dengan AI yang cerdas" />
          <FeatureCard title="Create AI" desc="Buat gambar dan video dengan AI" />
          <FeatureCard title="Profil Premium" desc="Kelola akun dan pengaturan Anda" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="card-luxury text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-zinc-400 text-sm">{label}</p>
      <p className="text-2xl font-bold gradient-text">{value}</p>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 transition cursor-pointer">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-zinc-400 mt-1">{desc}</p>
    </div>
  );
}
