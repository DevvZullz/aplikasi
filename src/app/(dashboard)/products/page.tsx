'use client';

import { useState } from 'react';

export default function ProductsPage() {
  const [products] = useState([]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black gradient-text">Tabel Produk</h1>
          <p className="text-zinc-400 mt-2">Kelola koleksi produk eksklusif Anda</p>
        </div>
        <button className="btn-3d">+ Produk Baru</button>
      </div>

      {products.length === 0 ? (
        <div className="card-luxury text-center py-12">
          <p className="text-4xl mb-4">🛍️</p>
          <h3 className="text-xl font-bold mb-2">Belum Ada Produk</h3>
          <p className="text-zinc-400">Mulai dengan membuat produk pertama Anda</p>
        </div>
      ) : null}
    </div>
  );
}
