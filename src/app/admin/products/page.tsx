'use client';

import { useEffect, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(data.products || []);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    setLoading(true);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: parseFloat(price), description: desc })
      });
      if (res.ok) {
        setName('');
        setPrice('');
        setDesc('');
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus produk ini?')) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <h1 className="text-4xl font-black text-red-400">🛍️ Kelola Produk</h1>

      <div className="card-luxury space-y-4">
        <h2 className="text-xl font-bold">Tambah Produk Baru</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input placeholder="Nama Produk" value={name} onChange={(e) => setName(e.target.value)} required className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-purple-500/20 outline-none text-white" />
          <input type="number" placeholder="Harga" value={price} onChange={(e) => setPrice(e.target.value)} required step="0.01" className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-purple-500/20 outline-none text-white" />
          <input placeholder="Deskripsi" value={desc} onChange={(e) => setDesc(e.target.value)} className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-purple-500/20 outline-none text-white" />
          <button type="submit" disabled={loading} className="btn-3d px-6">
            {loading ? '...' : '➕ Tambah'}
          </button>
        </form>
      </div>

      <div className="card-luxury overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-purple-500/20 text-left text-purple-300">
              <th className="pb-3 px-4">Nama</th>
              <th className="pb-3 px-4">Harga</th>
              <th className="pb-3 px-4">Deskripsi</th>
              <th className="pb-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-purple-500/10 hover:bg-purple-500/5">
                <td className="py-3 px-4">{p.name}</td>
                <td className="py-3 px-4">Rp {p.price?.toLocaleString('id-ID') || 0}</td>
                <td className="py-3 px-4 text-zinc-400">{p.description || '-'}</td>
                <td className="py-3 px-4">
                  <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 text-xs font-semibold">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
