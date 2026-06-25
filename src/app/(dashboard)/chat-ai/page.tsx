'use client';

import { useState } from 'react';

export default function ChatAIPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: input }) });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Maaf, terjadi kesalahan.' }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl h-[calc(100vh-200px)] flex flex-col">
      <div>
        <h1 className="text-4xl font-black gradient-text">Chat dengan AI</h1>
        <p className="text-zinc-400 mt-2">Percakapan dengan asisten AI cerdas</p>
      </div>

      <div className="flex-1 card-luxury overflow-y-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div><p className="text-5xl mb-4">🤖</p><p className="text-zinc-400">Mulai percakapan Anda sekarang</p></div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-purple-500/20 text-purple-200'}`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        {loading && <div className="text-center text-zinc-500 text-sm">AI sedang mengetik...</div>}
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Tanya apapun..." className="flex-1 px-4 py-3 rounded-lg bg-zinc-900/50 border border-purple-500/20 outline-none focus:border-purple-500/60 text-white" />
        <button onClick={handleSend} disabled={loading} className="btn-3d px-6">{loading ? '...' : 'Kirim'}</button>
      </div>
    </div>
  );
}
