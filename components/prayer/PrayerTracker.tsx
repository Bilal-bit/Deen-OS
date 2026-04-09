'use client';

import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { DailyLog, SalahName, PrayerStatus, PrayerTime } from '@/types';
import { useLogStore } from '@/stores/logStore';
import { prayerInfo, getNextPrayer, formatMinutes } from '@/lib/prayerTimes';
import { getPrayerCount } from '@/lib/score';
import { format, isToday, parseISO } from 'date-fns';
import { motion } from 'framer-motion';

interface PrayerTrackerProps {
  log: DailyLog | null;
  loading: boolean;
  prayerTimes?: PrayerTime | null;
}

const statusConfig: Record<PrayerStatus, { label: string; color: string; bg: string; border: string }> = {
  none: { label: 'Not Prayed', color: 'text-subtext', bg: 'bg-surface', border: 'border-white/5' },
  on_time: { label: 'On Time', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  late: { label: 'Late', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
};

const prayers: SalahName[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

export default function PrayerTracker({ log, loading, prayerTimes }: PrayerTrackerProps) {
  const { currentDate, goNextDay, goPrevDay, goToday, setPrayerStatus } = useLogStore();
  const dateObj = parseISO(currentDate);
  const isCurrentToday = isToday(dateObj);
  const nextPrayer = prayerTimes && isCurrentToday ? getNextPrayer(prayerTimes) : null;

  if (loading) {
    return <Card><Skeleton className="h-6 w-40 mb-4" /><div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20" />)}</div></Card>;
  }

  const counts = log ? getPrayerCount(log) : { completed: 0, onTime: 0, late: 0 };

  const cyclePrayerStatus = (prayer: SalahName) => {
    if (!log) return;
    const current = log[prayer] as PrayerStatus;
    const next: PrayerStatus = current === 'none' ? 'on_time' : current === 'on_time' ? 'late' : 'none';
    setPrayerStatus(prayer, next);
  };

  return (
    <Card>
      {/* Date navigation */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={goPrevDay} className="w-8 h-8 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-subtext hover:text-text cursor-pointer text-sm">&larr;</button>
        <div className="text-center">
          <p className="text-sm font-semibold text-text">{format(dateObj, 'EEEE, MMMM d')}</p>
          {!isCurrentToday && (
            <button onClick={goToday} className="text-[10px] text-primary hover:underline cursor-pointer">Go to today</button>
          )}
        </div>
        <button onClick={goNextDay} disabled={isCurrentToday} className="w-8 h-8 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-subtext hover:text-text cursor-pointer text-sm disabled:opacity-30 disabled:cursor-not-allowed">&rarr;</button>
      </div>

      {/* Next prayer countdown */}
      {nextPrayer && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-primary font-medium">Next Prayer</p>
            <p className="text-sm font-semibold text-text">{prayerInfo[nextPrayer.name].label} at {nextPrayer.time}</p>
          </div>
          <span className="text-sm font-bold text-primary">{formatMinutes(nextPrayer.minutesLeft)}</span>
        </div>
      )}

      {/* Completion summary */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">Prayers</h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-primary font-medium">{counts.completed}/5 prayed</span>
          {counts.onTime > 0 && <span className="text-primary">{counts.onTime} on time</span>}
          {counts.late > 0 && <span className="text-amber-500">{counts.late} late</span>}
        </div>
      </div>

      {/* Completion bar */}
      <div className="w-full bg-surface rounded-full h-2 mb-5">
        <div className="h-2 rounded-full bg-gradient-to-r from-primary to-highlight transition-all" style={{ width: `${(counts.completed / 5) * 100}%` }} />
      </div>

      {/* Prayer cards */}
      <div className="space-y-2">
        {prayers.map((prayer) => {
          const status = (log?.[prayer] as PrayerStatus) || 'none';
          const cfg = statusConfig[status];
          const time = prayerTimes?.[prayer === 'dhuhr' ? 'dhuhr' : prayer];
          const isNext = nextPrayer?.name === prayer;

          return (
            <motion.button
              key={prayer}
              whileTap={{ scale: 0.98 }}
              onClick={() => cyclePrayerStatus(prayer)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer text-left ${cfg.bg} ${cfg.border} ${isNext ? 'ring-2 ring-primary/30' : ''}`}
            >
              {/* Status indicator */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                status === 'on_time' ? 'bg-primary text-white' :
                status === 'late' ? 'bg-amber-500 text-white' :
                'bg-white/5 text-subtext'
              }`}>
                {status === 'on_time' ? '✓' : status === 'late' ? '⏰' : '○'}
              </div>

              {/* Prayer info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-semibold ${cfg.color}`}>{prayerInfo[prayer].label}</p>
                  <p className="text-xs text-subtext">{prayerInfo[prayer].arabic}</p>
                </div>
                <p className="text-[11px] text-subtext">{time || ''} &middot; {cfg.label}</p>
              </div>

              {/* Tap hint */}
              <p className="text-[9px] text-subtext">Tap to change</p>
            </motion.button>
          );
        })}
      </div>

      <p className="text-[10px] text-subtext text-center mt-3">
        Tap: Not Prayed &rarr; On Time &rarr; Late &rarr; Not Prayed
      </p>
    </Card>
  );
}
