'use client';

import { useEffect, useState } from 'react';
import { DailyLog } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { format, startOfMonth, endOfMonth } from 'date-fns';

export function useCalendarLogs(userId: string | undefined, month: Date) {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchLogs = async () => {
      setLoading(true);
      const supabase = createClient();
      const start = format(startOfMonth(month), 'yyyy-MM-dd');
      const end = format(endOfMonth(month), 'yyyy-MM-dd');

      const { data } = await supabase
        .from('logs')
        .select('*')
        .eq('user_id', userId)
        .gte('date', start)
        .lte('date', end)
        .order('date', { ascending: true });

      setLogs((data as DailyLog[]) || []);
      setLoading(false);
    };

    fetchLogs();
  }, [userId, month]);

  return { logs, loading };
}
