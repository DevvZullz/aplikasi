'use client';

import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-12 text-zinc-400">Loading...</div>;

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-4xl font-black gradient-text">🛍️ Tabel Produk</h1>
        <p className="text-zinc-400 mt-2">Koleksi produk dari Zullz Hosting</p>
      </div>

      {products.length === 0 ? (
        <div className="card-luxury text-center py-12">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-zinc-400">Belum ada produk tersedia</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="card-luxury space-y-3">
              <div className="h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="font-bold text-white">{p.name}</h3>
              <p className="text-sm text-zinc-400">{p.description || '-'}</p>
              <div className="flex justify-between items-center pt-2 border-t border-purple-500/20">
                <span className="text-xl font-bold text-purple-400">Rp {p.price?.toLocaleString('id-ID') || 0}</span>
                <button className="btn-3d px-4 py-2 text-sm">Beli</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
