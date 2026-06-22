'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useDashboardStats(userId: string) {
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('activity-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activity_logs', filter: `user_id=eq.${userId}` },
        (payload) => setActivity((prev) => [payload.new, ...prev].slice(0, 20))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return activity;
}
