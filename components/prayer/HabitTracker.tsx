'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { DailyLog, ToggleField } from '@/types';
import { useLogStore } from '@/stores/logStore';
import { motion, AnimatePresence } from 'framer-motion';

interface HabitTrackerProps {
  log: DailyLog | null;
  loading: boolean;
}

const habits: { field: ToggleField; label: string; icon: string; hasInput?: 'pages' | 'minutes' | 'amount' | 'text' }[] = [
  { field: 'quran', label: 'Quran Reading', icon: '📖', hasInput: 'pages' },
  { field: 'morning_dhikr', label: 'Morning Dhikr', icon: '🌅' },
  { field: 'evening_dhikr', label: 'Evening Dhikr', icon: '🌙' },
  { field: 'sadaqah', label: 'Sadaqah / Charity', icon: '💰', hasInput: 'amount' },
  { field: 'fasting', label: 'Fasting', icon: '🍽️' },
  { field: 'tahajjud', label: 'Tahajjud Prayer', icon: '🌃' },
];

export default function HabitTracker({ log, loading }: HabitTrackerProps) {
  const { toggleField, updateField } = useLogStore();
  const [expandedHabit, setExpandedHabit] = useState<string | null>(null);

  if (loading) {
    return <Card><Skeleton className="h-6 w-32 mb-4" /><div className="space-y-2">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14" />)}</div></Card>;
  }

  const completedCount = habits.filter((h) => log?.[h.field as keyof DailyLog]).length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">Daily Habits</h3>
        <span className="text-xs text-primary font-medium">{completedCount}/{habits.length}</span>
      </div>

      <div className="space-y-2">
        {habits.map((habit) => {
          const checked = !!log?.[habit.field as keyof DailyLog];
          const expanded = expandedHabit === habit.field;

          return (
            <div key={habit.field}>
              <button
                onClick={() => {
                  if (habit.hasInput && !checked) {
                    setExpandedHabit(expanded ? null : habit.field);
                  }
                  toggleField(habit.field);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer text-left border ${
                  checked
                    ? 'bg-primary/10 border-primary/20'
                    : 'bg-surface border-white/5 hover:border-white/10'
                }`}
              >
                <motion.div
                  animate={{ scale: checked ? 1.05 : 1 }}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${
                    checked ? 'bg-primary text-white' : 'bg-white/5'
                  }`}
                >
                  {checked ? '✓' : habit.icon}
                </motion.div>
                <span className={`text-sm font-medium flex-1 ${checked ? 'text-primary' : 'text-text'}`}>
                  {habit.label}
                </span>
                {habit.hasInput && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setExpandedHabit(expanded ? null : habit.field); }}
                    className="text-xs text-subtext hover:text-text cursor-pointer"
                  >
                    {expanded ? '▲' : '▼'}
                  </button>
                )}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 bg-surface rounded-b-xl border border-t-0 border-white/5">
                      {habit.hasInput === 'pages' && (
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-[10px] text-subtext">Pages</label>
                            <input
                              type="number"
                              value={log?.quran_pages || ''}
                              onChange={(e) => updateField('quran_pages', Number(e.target.value))}
                              placeholder="0"
                              className="w-full bg-card border border-white/10 rounded-lg px-3 py-1.5 text-sm text-text mt-0.5"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-[10px] text-subtext">Minutes</label>
                            <input
                              type="number"
                              value={log?.quran_minutes || ''}
                              onChange={(e) => updateField('quran_minutes', Number(e.target.value))}
                              placeholder="0"
                              className="w-full bg-card border border-white/10 rounded-lg px-3 py-1.5 text-sm text-text mt-0.5"
                            />
                          </div>
                        </div>
                      )}
                      {habit.hasInput === 'amount' && (
                        <div className="space-y-2">
                          <div>
                            <label className="text-[10px] text-subtext">Amount</label>
                            <input
                              type="number"
                              value={log?.sadaqah_amount || ''}
                              onChange={(e) => updateField('sadaqah_amount', Number(e.target.value))}
                              placeholder="0"
                              className="w-full bg-card border border-white/10 rounded-lg px-3 py-1.5 text-sm text-text mt-0.5"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-subtext">Note (optional)</label>
                            <input
                              type="text"
                              value={log?.sadaqah_note || ''}
                              onChange={(e) => updateField('sadaqah_note', e.target.value)}
                              placeholder="Who/what did you give to?"
                              className="w-full bg-card border border-white/10 rounded-lg px-3 py-1.5 text-sm text-text mt-0.5"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Duaa journaling */}
      <div className="mt-4">
        <label className="text-xs text-subtext mb-1 block">Duaa / Reflection (optional)</label>
        <textarea
          value={log?.duaa_journal || ''}
          onChange={(e) => updateField('duaa_journal', e.target.value)}
          placeholder="Write a duaa or reflection..."
          rows={2}
          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-text placeholder-subtext resize-none"
        />
      </div>
    </Card>
  );
}
