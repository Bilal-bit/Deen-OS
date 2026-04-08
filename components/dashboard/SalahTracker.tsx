'use client';

import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { DailyLog, SalahName } from '@/types';
import { useLogStore } from '@/stores/logStore';
import { motion } from 'framer-motion';

interface SalahTrackerProps {
  log: DailyLog | null;
  loading: boolean;
}

const salahList: { name: SalahName; label: string; time: string }[] = [
  { name: 'fajr', label: 'Fajr', time: 'Dawn' },
  { name: 'zuhr', label: 'Zuhr', time: 'Noon' },
  { name: 'asr', label: 'Asr', time: 'Afternoon' },
  { name: 'maghrib', label: 'Maghrib', time: 'Sunset' },
  { name: 'isha', label: 'Isha', time: 'Night' },
];

export default function SalahTracker({ log, loading }: SalahTrackerProps) {
  const toggleField = useLogStore((s) => s.toggleField);

  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </Card>
    );
  }

  const completedCount = salahList.filter((s) => log?.[s.name]).length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Salah Tracker
        </h3>
        <span className="text-xs text-primary font-medium">
          {completedCount}/5 completed
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {salahList.map((salah) => {
          const completed = log?.[salah.name] ?? false;
          return (
            <motion.button
              key={salah.name}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleField(salah.name)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                completed
                  ? 'bg-primary/15 border border-primary/30'
                  : 'bg-surface border border-white/5 hover:border-white/10'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  completed
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-subtext'
                }`}
              >
                {completed ? '✓' : '○'}
              </div>
              <span
                className={`text-xs font-medium ${
                  completed ? 'text-primary' : 'text-text'
                }`}
              >
                {salah.label}
              </span>
              <span className="text-[10px] text-subtext">{salah.time}</span>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
}
