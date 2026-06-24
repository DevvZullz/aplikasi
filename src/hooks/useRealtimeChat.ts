'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useRealtimeChat(conversationId: string, userId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel('chat-' + conversationId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: 'conversation_id=eq.' + conversationId,
        },
        (payload: any) => {
          setMessages((prev: any[]) => [...prev, payload.new]);
        }
      )
      .on('broadcast', { event: 'typing' }, (data: any) => {
        const senderId: string = data.payload.userId;
        if (senderId === userId) return;
        setTypingUsers((prev: string[]) => {
          if (prev.indexOf(senderId) !== -1) return prev;
          return prev.concat(senderId);
        });
        setTimeout(() => {
          setTypingUsers((p: string[]) => p.filter((id: string) => id !== senderId));
        }, 2000);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, userId]);

  const sendTyping = () => {
    supabase
      .channel('chat-' + conversationId)
      .send({ type: 'broadcast', event: 'typing', payload: { userId } });
  };

  const markAsRead = async (messageId: string) => {
    await supabase.from('messages').update({ status: 'READ' }).eq('id', messageId);
  };

  return { messages, typingUsers, sendTyping, markAsRead };
}
