'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface GoalItem {
  id: string;
  title: string;
  category: string;
  target: number;
  current: number;
  unit: string;
  type: 'daily' | 'weekly' | 'monthly';
}

export default function GoalsTracker() {
  const [goals, setGoals] = useState<GoalItem[]>([
    { id: '1', title: 'Read 5 Juz this month', category: 'quran', target: 5, current: 2, unit: 'Juz', type: 'monthly' },
    { id: '2', title: 'Pray all 5 Salah daily', category: 'salah', target: 7, current: 4, unit: 'days', type: 'weekly' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState<{ title: string; target: number; unit: string; type: 'daily' | 'weekly' | 'monthly' }>({ title: '', target: 10, unit: 'times', type: 'weekly' });

  const addGoal = () => {
    if (!newGoal.title.trim()) return;
    setGoals([...goals, {
      id: Date.now().toString(),
      title: newGoal.title,
      category: 'custom',
      target: newGoal.target,
      current: 0,
      unit: newGoal.unit,
      type: newGoal.type,
    }]);
    setNewGoal({ title: '', target: 10, unit: 'times', type: 'weekly' });
    setShowForm(false);
  };

  const incrementGoal = (id: string) => {
    setGoals(goals.map((g) =>
      g.id === id ? { ...g, current: Math.min(g.current + 1, g.target) } : g
    ));
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Goals
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center cursor-pointer hover:bg-primary/30 text-sm"
        >
          {showForm ? '×' : '+'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="p-3 bg-surface rounded-xl border border-white/5 space-y-3">
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Goal title..."
                className="w-full bg-card border border-white/10 rounded-xl px-4 py-2 text-sm text-text placeholder-subtext"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                  className="w-20 bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-text text-center"
                />
                <input
                  type="text"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  placeholder="unit"
                  className="flex-1 bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-text"
                />
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as 'daily' | 'weekly' | 'monthly' })}
                  className="bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-text"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <Button onClick={addGoal} size="sm" className="w-full">Add Goal</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const done = goal.current >= goal.target;
          return (
            <motion.div
              key={goal.id}
              layout
              className={`p-3 rounded-xl border ${
                done ? 'bg-primary/10 border-primary/20' : 'bg-surface border-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${done ? 'text-primary' : 'text-text'}`}>
                    {done && '✓ '}{goal.title}
                  </p>
                  <p className="text-[10px] text-subtext capitalize">{goal.type}</p>
                </div>
                <div className="flex items-center gap-1">
                  {!done && (
                    <button
                      onClick={() => incrementGoal(goal.id)}
                      className="w-6 h-6 rounded bg-primary/20 text-primary text-xs flex items-center justify-center cursor-pointer hover:bg-primary/30"
                    >
                      +
                    </button>
                  )}
                  <button
                    onClick={() => removeGoal(goal.id)}
                    className="w-6 h-6 rounded text-subtext hover:text-red-400 text-xs flex items-center justify-center cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${done ? 'bg-primary' : 'bg-gradient-to-r from-primary to-highlight'}`}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-subtext mt-1">{goal.current}/{goal.target} {goal.unit}</p>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
