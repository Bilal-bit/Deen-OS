'use client';

import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { motion } from 'framer-motion';

interface AkhirahScoreProps {
  score: number;
  loading: boolean;
}

export default function AkhirahScore({ score, loading }: AkhirahScoreProps) {
  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-20 w-20 rounded-full mx-auto mb-4" />
        <Skeleton className="h-3 w-full" />
      </Card>
    );
  }

  const percentage = Math.min(score, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="text-center">
      <h3 className="text-subtext text-sm font-medium mb-4 uppercase tracking-wider">
        Akhirah Score
      </h3>

      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-white/5"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#scoreGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeDasharray={circumference}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key={score}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-text"
          >
            {score}
          </motion.span>
        </div>
      </div>

      <div className="w-full bg-white/5 rounded-full h-2">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-primary to-highlight"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <p className="text-subtext text-xs mt-2">{score}/100 points today</p>
    </Card>
  );
}
