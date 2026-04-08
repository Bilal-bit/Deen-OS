'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeBlockItem {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: 'ibadah' | 'work' | 'study' | 'personal' | 'rest';
  done: boolean;
}

const categoryColors: Record<string, string> = {
  ibadah: 'bg-primary/15 border-primary/30 text-primary',
  work: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
  study: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
  personal: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
  rest: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
};

const categoryIcons: Record<string, string> = {
  ibadah: '🕌',
  work: '💼',
  study: '📚',
  personal: '🏠',
  rest: '😴',
};

const defaultBlocks: TimeBlockItem[] = [
  { id: '1', title: 'Fajr & Morning Azkar', startTime: '05:00', endTime: '06:00', category: 'ibadah', done: false },
  { id: '2', title: 'Quran Reading', startTime: '06:00', endTime: '06:30', category: 'ibadah', done: false },
  { id: '3', title: 'Work / Study', startTime: '09:00', endTime: '12:00', category: 'work', done: false },
  { id: '4', title: 'Zuhr Prayer', startTime: '12:30', endTime: '12:45', category: 'ibadah', done: false },
  { id: '5', title: 'Work / Study', startTime: '13:00', endTime: '16:00', category: 'work', done: false },
  { id: '6', title: 'Asr Prayer', startTime: '16:00', endTime: '16:15', category: 'ibadah', done: false },
  { id: '7', title: 'Exercise', startTime: '17:00', endTime: '18:00', category: 'personal', done: false },
  { id: '8', title: 'Maghrib & Evening Azkar', startTime: '18:30', endTime: '19:00', category: 'ibadah', done: false },
  { id: '9', title: 'Isha Prayer', startTime: '20:00', endTime: '20:15', category: 'ibadah', done: false },
  { id: '10', title: 'Rest & Sleep', startTime: '22:00', endTime: '05:00', category: 'rest', done: false },
];

export default function TimeBlocking() {
  const [blocks, setBlocks] = useState<TimeBlockItem[]>(defaultBlocks);
  const [showAdd, setShowAdd] = useState(false);
  const [newBlock, setNewBlock] = useState<{ title: string; startTime: string; endTime: string; category: TimeBlockItem['category'] }>({ title: '', startTime: '12:00', endTime: '13:00', category: 'personal' });

  const toggleDone = (id: string) => {
    setBlocks(blocks.map((b) => b.id === id ? { ...b, done: !b.done } : b));
  };

  const addBlock = () => {
    if (!newBlock.title.trim()) return;
    setBlocks([...blocks, { ...newBlock, id: Date.now().toString(), done: false }].sort((a, b) => a.startTime.localeCompare(b.startTime)));
    setNewBlock({ title: '', startTime: '12:00', endTime: '13:00', category: 'personal' });
    setShowAdd(false);
  };

  const doneCount = blocks.filter((b) => b.done).length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Daily Schedule
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-accent">{doneCount}/{blocks.length}</span>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center cursor-pointer text-sm"
          >
            {showAdd ? '×' : '+'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3">
            <div className="p-3 bg-surface rounded-xl border border-white/5 space-y-2">
              <input type="text" value={newBlock.title} onChange={(e) => setNewBlock({ ...newBlock, title: e.target.value })} placeholder="Block title..." className="w-full bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-text placeholder-subtext" />
              <div className="flex gap-2">
                <input type="time" value={newBlock.startTime} onChange={(e) => setNewBlock({ ...newBlock, startTime: e.target.value })} className="flex-1 bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-text" />
                <input type="time" value={newBlock.endTime} onChange={(e) => setNewBlock({ ...newBlock, endTime: e.target.value })} className="flex-1 bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-text" />
              </div>
              <select value={newBlock.category} onChange={(e) => setNewBlock({ ...newBlock, category: e.target.value as TimeBlockItem['category'] })} className="w-full bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-text">
                <option value="ibadah">Ibadah</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="personal">Personal</option>
                <option value="rest">Rest</option>
              </select>
              <button onClick={addBlock} className="w-full py-2 bg-primary text-white rounded-xl text-sm cursor-pointer">Add Block</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
        {blocks.map((block) => (
          <motion.button
            key={block.id}
            layout
            onClick={() => toggleDone(block.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-left ${
              block.done ? 'opacity-50' : ''
            } ${categoryColors[block.category]}`}
          >
            <span className="text-lg">{categoryIcons[block.category]}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${block.done ? 'line-through' : ''}`}>
                {block.title}
              </p>
              <p className="text-[10px] opacity-70">{block.startTime} - {block.endTime}</p>
            </div>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
              block.done ? 'bg-primary text-white' : 'bg-white/10'
            }`}>
              {block.done ? '✓' : ''}
            </span>
          </motion.button>
        ))}
      </div>
    </Card>
  );
}
