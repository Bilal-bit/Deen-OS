'use client';

import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import Skeleton from '@/components/ui/Skeleton';
import { DailyLog, HabitName } from '@/types';
import { useLogStore } from '@/stores/logStore';

interface DailyHabitsProps {
  log: DailyLog | null;
  loading: boolean;
}

const habits: { name: HabitName; label: string; icon: string }[] = [
  { name: 'water', label: 'Drink Water', icon: '💧' },
  { name: 'sleep', label: 'Good Sleep', icon: '😴' },
  { name: 'exercise', label: 'Exercise', icon: '💪' },
  { name: 'quran', label: 'Read Quran', icon: '📖' },
];

export default function DailyHabits({ log, loading }: DailyHabitsProps) {
  const toggleField = useLogStore((s) => s.toggleField);

  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12" />
          ))}
        </div>
      </Card>
    );
  }

  const completedCount = habits.filter((h) => log?.[h.name]).length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Daily Habits
        </h3>
        <span className="text-xs text-accent font-medium">
          {completedCount}/{habits.length} done
        </span>
      </div>

      <div className="space-y-2">
        {habits.map((habit) => (
          <Toggle
            key={habit.name}
            label={habit.label}
            icon={habit.icon}
            checked={log?.[habit.name] ?? false}
            onChange={() => toggleField(habit.name)}
          />
        ))}
      </div>
    </Card>
  );
}
