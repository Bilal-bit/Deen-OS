'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { allBadges } from '@/data/badges';
import { motion, AnimatePresence } from 'framer-motion';

// Simulated earned badges for demo
const earnedBadgeIds = new Set(['first-day', 'streak-3', 'streak-7', 'salah-perfect-1', 'habit-water-7', 'score-100']);

export default function BadgesDisplay() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedBadge, setSelectedBadge] = useState<typeof allBadges[0] | null>(null);

  const categories = ['all', 'streak', 'salah', 'quran', 'habit', 'special'];
  const filtered = filter === 'all' ? allBadges : allBadges.filter((b) => b.category === filter);
  const earnedCount = allBadges.filter((b) => earnedBadgeIds.has(b.id)).length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Badges & Achievements
        </h3>
        <span className="text-xs text-primary font-medium">
          {earnedCount}/{allBadges.length} earned
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap transition-all ${
              filter === cat
                ? 'bg-primary/20 text-primary'
                : 'text-subtext hover:text-text'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-4 gap-2">
        {filtered.map((badge) => {
          const earned = earnedBadgeIds.has(badge.id);
          return (
            <motion.button
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedBadge(badge)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer transition-all ${
                earned
                  ? 'bg-primary/10 border-primary/20'
                  : 'bg-surface border-white/5 opacity-40 grayscale'
              }`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-[9px] text-center leading-tight font-medium text-text truncate w-full">
                {badge.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Badge detail modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl p-6 border border-white/10 max-w-sm w-full text-center"
            >
              <span className="text-5xl block mb-3">{selectedBadge.icon}</span>
              <h4 className="text-lg font-bold text-text mb-1">{selectedBadge.name}</h4>
              <p className="text-sm text-subtext mb-2">{selectedBadge.description}</p>
              <span className={`text-xs px-3 py-1 rounded-full ${
                earnedBadgeIds.has(selectedBadge.id)
                  ? 'bg-primary/20 text-primary'
                  : 'bg-white/5 text-subtext'
              }`}>
                {earnedBadgeIds.has(selectedBadge.id) ? 'Earned!' : 'Locked'}
              </span>
              <button
                onClick={() => setSelectedBadge(null)}
                className="block w-full mt-4 py-2 text-sm text-subtext hover:text-text cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
