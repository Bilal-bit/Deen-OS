'use client';

import { useEffect, useState } from 'react';
import { Streak } from '@/types';
import { createClient } from '@/lib/supabase/client';

export function useStreak(userId: string | undefined) {
  const [streak, setStreak] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchStreak = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      setStreak(data as Streak | null);
      setLoading(false);
    };

    fetchStreak();

    // Subscribe to realtime changes
    const supabase = createClient();
    const channel = supabase
      .channel('streaks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'streaks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setStreak(payload.new as Streak);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { streak, loading };
}
