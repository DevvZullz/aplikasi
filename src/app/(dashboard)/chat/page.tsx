'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRealtimeChat } from '@/hooks/useRealtimeChat';

export default function ChatPage() {
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id;
  const [conversationId, setConversationId] = useState(''); // isi sesuai conversation aktif
  const { messages, typingUsers, sendTyping, markAsRead } = useRealtimeChat(conversationId, userId);
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (!text.trim() || !conversationId) return;
    await fetch('/api/chat/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, content: text }),
    });
    setText('');
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col">
      <h1 className="mb-4 text-2xl font-semibold">Chat</h1>

      <div className="flex-1 space-y-2 overflow-y-auto rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        {messages.map((m) => (
          <div
            key={m.id}
            onClick={() => markAsRead(m.id)}
            className="max-w-md rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-900"
          >
            {m.content}
          </div>
        ))}
        {typingUsers.length > 0 && <p className="text-xs italic text-zinc-400">sedang mengetik...</p>}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => { setText(e.target.value); sendTyping(); }}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tulis pesan..."
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button onClick={handleSend} className="rounded-lg bg-zinc-900 px-5 text-white dark:bg-white dark:text-zinc-900">
          Kirim
        </button>
      </div>
    </div>
  );
}
