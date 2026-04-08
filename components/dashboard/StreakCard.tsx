'use client';

import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { Streak } from '@/types';
import { motion } from 'framer-motion';

interface StreakCardProps {
  streak: Streak | null;
  loading: boolean;
}

export default function StreakCard({ streak, loading }: StreakCardProps) {
  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-16 w-full" />
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Streak
      </h3>

      <div className="flex items-center gap-6">
        <div className="text-center">
          <motion.div
            key={streak?.current_streak}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-highlight"
          >
            {streak?.current_streak ?? 0}
          </motion.div>
          <p className="text-xs text-subtext mt-1">Current</p>
        </div>

        <div className="w-px h-12 bg-white/10" />

        <div className="text-center">
          <div className="text-4xl font-bold text-accent">
            {streak?.best_streak ?? 0}
          </div>
          <p className="text-xs text-subtext mt-1">Best</p>
        </div>

        <div className="ml-auto text-3xl">🔥</div>
      </div>
    </Card>
  );
}
