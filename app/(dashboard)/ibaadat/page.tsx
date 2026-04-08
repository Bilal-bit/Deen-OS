'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useLogStore } from '@/stores/logStore';
import DuaOfTheDay from '@/components/ibaadat/DuaOfTheDay';
import NafilTracker from '@/components/ibaadat/NafilTracker';
import AzkarChecklist from '@/components/ibaadat/AzkarChecklist';
import RamadanMode from '@/components/ibaadat/RamadanMode';

export default function IbaadatPage() {
  const user = useAuthStore((s) => s.user);
  const { todayLog, loading, fetchTodayLog } = useLogStore();

  useEffect(() => {
    if (user?.id) fetchTodayLog(user.id);
  }, [user?.id, fetchTodayLog]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Ibaadat Hub</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DuaOfTheDay />
        <NafilTracker log={todayLog} loading={loading} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AzkarChecklist log={todayLog} loading={loading} />
        <RamadanMode log={todayLog} loading={loading} />
      </div>
    </div>
  );
}
