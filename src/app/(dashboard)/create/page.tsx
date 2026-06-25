'use client';

import { useState } from 'react';

export default function CreatePage() {
  const [type, setType] = useState('image');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, prompt }) });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-4xl font-black gradient-text">Create dengan AI</h1>
        <p className="text-zinc-400 mt-2">Buat gambar dan video menggunakan AI terdepan</p>
      </div>

      <div className="card-luxury space-y-6">
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" value="image" checked={type === 'image'} onChange={(e) => setType(e.target.value)} className="w-4 h-4" />
            <span className="text-white group-hover:text-purple-400">🎨 Gambar</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" value="video" checked={type === 'video'} onChange={(e) => setType(e.target.value)} className="w-4 h-4" />
            <span className="text-white group-hover:text-purple-400">🎬 Video</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-purple-300">PROMPT</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Deskripsikan yang ingin Anda buat..." className="w-full h-32 px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 focus:border-purple-500/60 outline-none resize-none text-white placeholder-zinc-500" />
        </div>

        <button onClick={handleCreate} disabled={loading} className="btn-3d w-full text-lg">
          {loading ? '⏳ Membuat...' : '✨ Buat Sekarang'}
        </button>
      </div>

      {result && result.url && (
        <div className="card-luxury">
          <h3 className="text-lg font-bold mb-4">Hasil Kreasi Anda</h3>
          {type === 'image' ? (
            <img src={result.url} alt="result" className="w-full rounded-lg" />
          ) : (
            <video src={result.url} controls className="w-full rounded-lg" />
          )}
        </div>
      )}
    </div>
  );
}
