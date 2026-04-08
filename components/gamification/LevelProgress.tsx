'use client';

import Card from '@/components/ui/Card';
import { getLevelForPoints, levels } from '@/data/badges';
import { motion } from 'framer-motion';

interface LevelProgressProps {
  totalPoints: number;
}

export default function LevelProgress({ totalPoints }: LevelProgressProps) {
  const current = getLevelForPoints(totalPoints);

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Your Level
      </h3>

      <div className="text-center mb-4">
        <motion.span
          key={current.level}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl block mb-2"
        >
          {current.icon}
        </motion.span>
        <h4 className="text-xl font-bold text-text">Level {current.level}</h4>
        <p className="text-sm text-primary font-medium">{current.name}</p>
        <p className="text-xs text-subtext mt-1">{totalPoints} total points</p>
      </div>

      {/* Progress to next level */}
      {current.nextLevel && (
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-subtext">{current.name}</span>
            <span className="text-subtext">{current.nextLevel.name}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-3">
            <motion.div
              className="h-3 rounded-full bg-gradient-to-r from-primary to-highlight"
              initial={{ width: 0 }}
              animate={{ width: `${current.progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-[10px] text-subtext mt-1 text-center">
            {current.nextLevel.minPoints - totalPoints} points to {current.nextLevel.name}
          </p>
        </div>
      )}

      {/* All levels */}
      <div className="space-y-1">
        {levels.map((level) => {
          const reached = totalPoints >= level.minPoints;
          return (
            <div
              key={level.level}
              className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                level.level === current.level
                  ? 'bg-primary/10 border border-primary/20'
                  : reached
                  ? 'text-text'
                  : 'text-subtext opacity-40'
              }`}
            >
              <span>{level.icon}</span>
              <span className="font-medium flex-1">Lv.{level.level} {level.name}</span>
              <span className="text-[10px]">{level.minPoints}+ pts</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
