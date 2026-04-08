'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { MoodType } from '@/types';
import { motion } from 'framer-motion';

const moods: { type: MoodType; emoji: string; label: string; color: string }[] = [
  { type: 'great', emoji: '😄', label: 'Great', color: 'text-green-400 bg-green-500/15 border-green-500/30' },
  { type: 'good', emoji: '🙂', label: 'Good', color: 'text-primary bg-primary/15 border-primary/30' },
  { type: 'okay', emoji: '😐', label: 'Okay', color: 'text-amber-400 bg-amber-500/15 border-amber-500/30' },
  { type: 'low', emoji: '😔', label: 'Low', color: 'text-orange-400 bg-orange-500/15 border-orange-500/30' },
  { type: 'bad', emoji: '😢', label: 'Bad', color: 'text-red-400 bg-red-500/15 border-red-500/30' },
];

const weekMoods: { day: string; mood: MoodType | null }[] = [
  { day: 'Mon', mood: 'great' },
  { day: 'Tue', mood: 'good' },
  { day: 'Wed', mood: 'okay' },
  { day: 'Thu', mood: 'good' },
  { day: 'Fri', mood: 'great' },
  { day: 'Sat', mood: null },
  { day: 'Sun', mood: null },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');

  const handleSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        How are you feeling today?
      </h3>

      {/* Mood selector */}
      <div className="flex justify-between mb-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.type}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSelect(mood.type)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer transition-all ${
              selectedMood === mood.type ? mood.color : 'bg-surface border-white/5 hover:border-white/10'
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className={`text-[10px] font-medium ${selectedMood === mood.type ? '' : 'text-subtext'}`}>
              {mood.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Note */}
      {selectedMood && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any thoughts? (optional)"
            rows={2}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-text placeholder-subtext resize-none mb-3"
          />
        </motion.div>
      )}

      {/* Week overview */}
      <div className="pt-3 border-t border-white/5">
        <p className="text-xs text-subtext mb-2">This Week</p>
        <div className="flex justify-between">
          {weekMoods.map((day, i) => {
            const moodData = moods.find((m) => m.type === day.mood);
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-subtext">{day.day}</span>
                <span className="text-lg">{moodData ? moodData.emoji : '·'}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
