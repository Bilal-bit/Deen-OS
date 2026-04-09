'use client';

import { useState, useMemo } from 'react';
import Card from '@/components/ui/Card';
import { DailyLog } from '@/types';
import { motion } from 'framer-motion';

interface DailyChallengeProps {
  log: DailyLog | null;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  check: (log: DailyLog) => boolean;
  bonus: number;
}

const prayed = (v: string | boolean | undefined) => v === 'on_time' || v === 'late';

const challengePool: Challenge[] = [
  { id: 'all-salah', title: 'Perfect Salah', description: 'Pray all 5 salah today', icon: '🕌', check: (l) => prayed(l.fajr) && prayed(l.dhuhr) && prayed(l.asr) && prayed(l.maghrib) && prayed(l.isha), bonus: 10 },
  { id: 'all-habits', title: 'Habit Master', description: 'Complete all 4 habits today', icon: '💪', check: (l) => l.water && l.sleep && l.exercise && l.quran, bonus: 10 },
  { id: 'perfect-score', title: 'Perfect Day', description: 'Score 100/100 today', icon: '💯', check: (l) => l.score >= 100, bonus: 20 },
  { id: 'fajr-hero', title: 'Fajr Hero', description: 'Start with Fajr prayer', icon: '🌅', check: (l) => prayed(l.fajr), bonus: 5 },
  { id: 'quran-reader', title: 'Quran Time', description: 'Read Quran today', icon: '📖', check: (l) => l.quran, bonus: 5 },
  { id: 'healthy-body', title: 'Healthy Body', description: 'Drink water and exercise', icon: '🏃', check: (l) => l.water && l.exercise, bonus: 5 },
  { id: 'night-prayer', title: 'Qiyam ul Lail', description: 'Pray Tahajjud tonight', icon: '🌙', check: (l) => l.tahajjud, bonus: 15 },
  { id: 'three-salah', title: 'Three for Three', description: 'Pray at least 3 salah', icon: '⭐', check: (l) => [l.fajr, l.dhuhr, l.asr, l.maghrib, l.isha].filter((v) => prayed(v)).length >= 3, bonus: 5 },
];

export default function DailyChallenge({ log }: DailyChallengeProps) {
  const dailyChallenges = useMemo(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const shuffled = [...challengePool].sort((a, b) => {
      const hashA = (seed * a.id.length) % 1000;
      const hashB = (seed * b.id.length) % 1000;
      return hashA - hashB;
    });
    return shuffled.slice(0, 3);
  }, []);

  const completedCount = log
    ? dailyChallenges.filter((c) => c.check(log)).length
    : 0;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Daily Challenges
        </h3>
        <span className="text-xs text-highlight font-medium">
          {completedCount}/{dailyChallenges.length}
        </span>
      </div>

      <div className="space-y-2">
        {dailyChallenges.map((challenge) => {
          const done = log ? challenge.check(log) : false;
          return (
            <motion.div
              key={challenge.id}
              layout
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                done
                  ? 'bg-primary/10 border-primary/20'
                  : 'bg-surface border-white/5'
              }`}
            >
              <span className="text-2xl">{challenge.icon}</span>
              <div className="flex-1">
                <p className={`text-sm font-medium ${done ? 'text-primary' : 'text-text'}`}>
                  {done && '✓ '}{challenge.title}
                </p>
                <p className="text-[10px] text-subtext">{challenge.description}</p>
              </div>
              <span className={`text-xs font-bold ${done ? 'text-primary' : 'text-subtext'}`}>
                +{challenge.bonus}
              </span>
            </motion.div>
          );
        })}
      </div>

      {completedCount === dailyChallenges.length && log && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 p-3 bg-gradient-to-r from-primary/10 to-highlight/10 rounded-xl text-center border border-primary/20"
        >
          <p className="text-primary text-sm font-semibold">All challenges complete! MashaAllah!</p>
        </motion.div>
      )}
    </Card>
  );
}
