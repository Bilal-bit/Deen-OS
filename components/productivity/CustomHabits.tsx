'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomHabitItem {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
}

const iconOptions = ['📿', '🕋', '📚', '🏃', '🧘', '💤', '🥗', '🎯', '✍️', '🔔', '💰', '🤲', '❤️', '🌿', '🧠'];

export default function CustomHabits() {
  const [habits, setHabits] = useState<CustomHabitItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('🎯');

  const addHabit = () => {
    if (!newName.trim()) return;
    setHabits([...habits, { id: Date.now().toString(), name: newName, icon: newIcon, completed: false }]);
    setNewName('');
    setShowForm(false);
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map((h) => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const removeHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Custom Habits
        </h3>
        <div className="flex items-center gap-2">
          {habits.length > 0 && (
            <span className="text-xs text-accent font-medium">
              {completedCount}/{habits.length}
            </span>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center cursor-pointer hover:bg-primary/30 text-sm"
          >
            {showForm ? '×' : '+'}
          </button>
        </div>
      </div>

      {/* Add form */}
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
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Habit name..."
                className="w-full bg-card border border-white/10 rounded-xl px-4 py-2 text-sm text-text placeholder-subtext"
                onKeyDown={(e) => e.key === 'Enter' && addHabit()}
              />
              <div>
                <p className="text-xs text-subtext mb-1">Choose icon:</p>
                <div className="flex flex-wrap gap-1">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewIcon(icon)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                        newIcon === icon ? 'bg-primary/20 border border-primary/30' : 'bg-card hover:bg-white/5'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={addHabit} size="sm" className="w-full">Add Habit</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Habits list */}
      {habits.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-3xl mb-2">🎯</p>
          <p className="text-xs text-subtext">Add your own habits to track daily</p>
        </div>
      ) : (
        <div className="space-y-2">
          {habits.map((habit) => (
            <motion.div
              key={habit.id}
              layout
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                habit.completed
                  ? 'bg-primary/15 border border-primary/30'
                  : 'bg-surface border border-white/5'
              }`}
            >
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  habit.completed ? 'bg-primary text-white' : 'bg-white/5 text-subtext'
                }`}
              >
                {habit.completed ? '✓' : habit.icon}
              </button>
              <span className={`flex-1 text-sm font-medium ${habit.completed ? 'text-primary line-through' : 'text-text'}`}>
                {habit.name}
              </span>
              <button
                onClick={() => removeHabit(habit.id)}
                className="text-xs text-subtext hover:text-red-400 cursor-pointer"
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}
