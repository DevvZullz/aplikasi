import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-12">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-7xl font-black"><span className="gradient-text">Z</span><span className="text-zinc-100">ullz</span> <span className="text-purple-400 text-3xl">Hosting</span></h1>
        <p className="text-xl text-purple-300 font-light tracking-widest">PLATFORM AI & COMMERCE PREMIUM</p>
        <p className="text-zinc-400 max-w-md mx-auto text-lg">Chat AI cerdas, buat konten visual, kelola marketplace. Semua dalam satu platform.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/login" className="btn-3d px-8">
          MASUK SEKARANG
        </Link>
        <Link href="/register" className="px-8 py-3 rounded-lg border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-bold transition">
          DAFTAR GRATIS
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl w-full mt-12">
        <Feature icon="🤖" title="Chat AI" desc="AI cerdas 24/7" />
        <Feature icon="✨" title="Create AI" desc="Gambar & Video" />
        <Feature icon="🛍️" title="Marketplace" desc="Jual beli produk" />
        <Feature icon="⭐" title="Premium" desc="Unlimited access" />
      </div>
    </main>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="card-luxury text-center space-y-2">
      <div className="text-3xl">{icon}</div>
      <h3 className="font-bold text-white">{title}</h3>
      <p className="text-sm text-zinc-400">{desc}</p>
    </div>
  );
}
