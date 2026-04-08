'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const prompts = [
  'What are you grateful for today?',
  'How did you feel during prayer today?',
  'What good deed did you do today?',
  'What lesson did you learn today?',
  'How can you improve tomorrow?',
  'What made you smile today?',
  'Write a dua from your heart...',
];

export default function DailyJournal() {
  const [entry, setEntry] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [taubah, setTaubah] = useState('');
  const [saved, setSaved] = useState(false);
  const [currentPrompt] = useState(() => prompts[Math.floor(Math.random() * prompts.length)]);

  const handleSave = () => {
    if (!entry.trim() && !gratitude.trim()) {
      toast.error('Write something first!');
      return;
    }
    setSaved(true);
    toast.success('Journal saved!');
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Daily Journal
        </h3>
        <span className="text-xs text-subtext">{format(new Date(), 'MMM d, yyyy')}</span>
      </div>

      <div className="space-y-4">
        {/* Prompt */}
        <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
          <p className="text-xs text-primary italic">{currentPrompt}</p>
        </div>

        {/* Main entry */}
        <div>
          <label className="text-xs text-subtext mb-1 block">Reflection</label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your thoughts..."
            rows={4}
            disabled={saved}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-text placeholder-subtext resize-none disabled:opacity-50"
          />
        </div>

        {/* Gratitude */}
        <div>
          <label className="text-xs text-subtext mb-1 block">Gratitude (Shukr)</label>
          <textarea
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            placeholder="What are you thankful for?"
            rows={2}
            disabled={saved}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-text placeholder-subtext resize-none disabled:opacity-50"
          />
        </div>

        {/* Taubah */}
        <div>
          <label className="text-xs text-subtext mb-1 block">Taubah (Repentance)</label>
          <textarea
            value={taubah}
            onChange={(e) => setTaubah(e.target.value)}
            placeholder="Seek forgiveness..."
            rows={2}
            disabled={saved}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-text placeholder-subtext resize-none disabled:opacity-50"
          />
        </div>

        {!saved ? (
          <Button onClick={handleSave} className="w-full">
            Save Journal Entry
          </Button>
        ) : (
          <div className="text-center p-3 bg-primary/10 rounded-xl">
            <p className="text-sm text-primary font-medium">Saved for today! JazakAllah Khair</p>
          </div>
        )}
      </div>
    </Card>
  );
}
