'use client';

import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-4xl font-black gradient-text">Akun Saya</h1>
        <p className="text-zinc-400 mt-2">Kelola profil dan pengaturan akun Anda</p>
      </div>

      <div className="card-luxury">
        <h2 className="text-xl font-bold mb-6">Informasi Profil</h2>
        <div className="space-y-6">
          <div>
            <label className="text-xs font-semibold text-purple-300">NAMA LENGKAP</label>
            <p className="text-lg font-semibold text-white mt-1">{session?.user?.name}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-purple-300">EMAIL</label>
            <p className="text-lg font-semibold text-white mt-1">{session?.user?.email}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-purple-300">STATUS KEANGGOTAAN</label>
            <p className="text-lg font-semibold text-purple-400 mt-1">⭐ PREMIUM MEMBER</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-purple-300">AKSES</label>
            <p className="text-lg font-semibold text-white mt-1">✅ Semua Fitur Unlimited</p>
          </div>
        </div>
      </div>

      <div className="card-luxury">
        <h2 className="text-xl font-bold mb-6">Pengaturan Keamanan</h2>
        <div className="space-y-3">
          <button className="btn-3d w-full">🔐 Ubah Password</button>
          <button className="w-full px-4 py-3 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 font-semibold transition">
            📱 Two-Factor Authentication
          </button>
        </div>
      </div>

      <div className="card-luxury">
        <h2 className="text-xl font-bold mb-4">Tentang Anda</h2>
        <textarea placeholder="Tulis bio Anda..." className="w-full h-20 px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 outline-none resize-none text-white" />
        <button className="btn-3d w-full mt-4">💾 Simpan</button>
      </div>
    </div>
  );
}
