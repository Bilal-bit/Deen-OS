'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useLogStore } from '@/stores/logStore';
import WeeklyScoreChart from '@/components/insights/WeeklyScoreChart';
import HabitConsistencyChart from '@/components/insights/HabitConsistencyChart';
import SalahCompletionChart from '@/components/insights/SalahCompletionChart';

export default function InsightsPage() {
  const user = useAuthStore((s) => s.user);
  const { weeklyLogs, fetchWeeklyLogs } = useLogStore();

  useEffect(() => {
    if (user?.id) {
      fetchWeeklyLogs(user.id);
    }
  }, [user?.id, fetchWeeklyLogs]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Insights</h2>

      <WeeklyScoreChart logs={weeklyLogs} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HabitConsistencyChart logs={weeklyLogs} />
        <SalahCompletionChart logs={weeklyLogs} />
      </div>
    </div>
  );
}
