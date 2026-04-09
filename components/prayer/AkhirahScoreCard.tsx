'use client';

import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { DailyLog, AkhirahScoreBreakdown } from '@/types';
import { calculateAkhirahScore, getImprovementTips } from '@/lib/score';
import { motion } from 'framer-motion';

interface AkhirahScoreCardProps {
  log: DailyLog | null;
  loading: boolean;
  consecutiveAll5: number;
  isRamadan?: boolean;
}

export default function AkhirahScoreCard({ log, loading, consecutiveAll5, isRamadan = false }: AkhirahScoreCardProps) {
  if (loading || !log) {
    return <Card><Skeleton className="h-6 w-40 mb-4" /><Skeleton className="h-32 w-32 rounded-full mx-auto" /></Card>;
  }

  const breakdown = calculateAkhirahScore(log, consecutiveAll5, isRamadan);
  const tips = getImprovementTips(breakdown);
  const maxDaily = isRamadan ? 375 : 250;
  const pct = Math.min((breakdown.total / maxDaily) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (pct / 100) * circumference;

  const breakdownItems: { label: string; value: number; color: string }[] = [
    { label: 'Prayers (On Time)', value: breakdown.prayers_on_time, color: 'bg-primary' },
    { label: 'Prayers (Late)', value: breakdown.prayers_late, color: 'bg-amber-500' },
    { label: 'Quran', value: breakdown.quran, color: 'bg-blue-500' },
    { label: 'Dhikr', value: breakdown.dhikr, color: 'bg-purple-500' },
    { label: 'Fasting', value: breakdown.fasting, color: 'bg-orange-500' },
    { label: 'Sadaqah', value: breakdown.sadaqah, color: 'bg-pink-500' },
    { label: 'Consistency Bonus', value: breakdown.consistency_bonus, color: 'bg-highlight' },
  ].filter((i) => i.value > 0);

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4 text-center">
        Akhirah Score
      </h3>

      {/* Score ring */}
      <div className="relative w-36 h-36 mx-auto mb-4">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="none" className="text-black/5" />
          <motion.circle
            cx="50" cy="50" r="45" stroke="url(#akhirahGrad)" strokeWidth="6" fill="none" strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeDasharray={circumference}
          />
          <defs>
            <linearGradient id="akhirahGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span key={breakdown.total} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-text">{breakdown.total}</motion.span>
          <span className="text-[10px] text-subtext">points today</span>
        </div>
      </div>

      {isRamadan && (
        <div className="text-center mb-3">
          <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">🌙 Ramadan 1.5x Multiplier Active</span>
        </div>
      )}

      {/* Breakdown */}
      {breakdownItems.length > 0 && (
        <div className="space-y-1.5 mb-4">
          <p className="text-xs text-subtext font-medium">Score Breakdown</p>
          {breakdownItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-xs text-text flex-1">{item.label}</span>
              <span className="text-xs font-medium text-primary">+{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Improvement tips */}
      {tips.length > 0 && (
        <div className="bg-surface rounded-xl p-3 border border-white/5">
          <p className="text-xs text-subtext font-medium mb-2">Improve your score:</p>
          {tips.map((tip, i) => (
            <p key={i} className="text-[11px] text-text flex items-start gap-1.5 mb-1">
              <span className="text-primary mt-0.5">+</span> {tip}
            </p>
          ))}
        </div>
      )}
    </Card>
  );
}
