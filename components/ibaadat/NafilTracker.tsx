'use client';

import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import Skeleton from '@/components/ui/Skeleton';
import { DailyLog, ToggleField } from '@/types';
import { useLogStore } from '@/stores/logStore';

interface NafilTrackerProps {
  log: DailyLog | null;
  loading: boolean;
}

const nafilList: { name: ToggleField; label: string; icon: string; time: string }[] = [
  { name: 'tahajjud', label: 'Tahajjud', icon: '🌙', time: 'Last third of night' },
  { name: 'ishraq', label: 'Ishraq', icon: '🌅', time: '15-20 min after sunrise' },
  { name: 'duha', label: 'Duha (Chasht)', icon: '☀️', time: 'Mid-morning' },
  { name: 'awwabin', label: 'Awwabin', icon: '🌆', time: 'After Maghrib' },
];

export default function NafilTracker({ log, loading }: NafilTrackerProps) {
  const toggleField = useLogStore((s) => s.toggleField);

  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12" />
          ))}
        </div>
      </Card>
    );
  }

  const completedCount = nafilList.filter((n) => log?.[n.name]).length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Nawafil Prayers
        </h3>
        <span className="text-xs text-accent font-medium">
          {completedCount}/{nafilList.length} prayed
        </span>
      </div>

      <div className="space-y-2">
        {nafilList.map((nafil) => (
          <div key={nafil.name} className="relative">
            <Toggle
              label={`${nafil.label}`}
              icon={nafil.icon}
              checked={log?.[nafil.name] ?? false}
              onChange={() => toggleField(nafil.name)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-subtext">
              {nafil.time}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
