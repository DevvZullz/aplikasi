import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-12">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-6xl md:text-7xl font-black gradient-text">ZULLZ</h1>
        <p className="text-xl text-purple-300 font-light tracking-widest">PREMIUM AI & COMMERCE PLATFORM</p>
        <p className="text-zinc-400 max-w-md mx-auto text-lg">Chat dengan AI, buat gambar/video, kelola produk Anda. Semua dalam satu platform premium.</p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/login" className="btn-3d px-8">
          MASUK SEKARANG
        </Link>
        <Link href="/register" className="px-8 py-3 rounded-lg border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-bold transition">
          DAFTAR GRATIS
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl w-full mt-12">
        <Feature icon="🤖" title="Chat AI" desc="Percakapan cerdas" />
        <Feature icon="🎨" title="Create AI" desc="Gambar & Video" />
        <Feature icon="🛍️" title="Marketplace" desc="Jual Produk" />
        <Feature icon="⭐" title="Premium" desc="Akses Unlimited" />
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
