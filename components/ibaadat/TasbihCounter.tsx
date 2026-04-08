'use client';

import { useState, useCallback } from 'react';
import Card from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

const tasbihTypes = [
  { id: 'subhanallah', label: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', meaning: 'Glory be to Allah' },
  { id: 'alhamdulillah', label: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', meaning: 'Praise be to Allah' },
  { id: 'allahuakbar', label: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', meaning: 'Allah is the Greatest' },
  { id: 'astaghfirullah', label: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', meaning: 'I seek forgiveness from Allah' },
  { id: 'lahawla', label: 'La Hawla', arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', meaning: 'There is no power except with Allah' },
];

const targets = [33, 99, 100, 500, 1000];

export default function TasbihCounter() {
  const [selectedType, setSelectedType] = useState(tasbihTypes[0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [showRipple, setShowRipple] = useState(false);
  const [totalSession, setTotalSession] = useState(0);

  const handleCount = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      if (next >= target) {
        setTotalSession((t) => t + target);
        return 0;
      }
      return next;
    });
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 300);
  }, [target]);

  const handleReset = () => {
    setCount(0);
  };

  const progress = (count / target) * 100;

  return (
    <Card className="text-center">
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Tasbih Counter
      </h3>

      {/* Type selector */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {tasbihTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => { setSelectedType(type); setCount(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedType.id === type.id
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-surface text-subtext border border-white/5 hover:border-white/10'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Arabic text */}
      <p className="text-2xl text-accent mb-1">{selectedType.arabic}</p>
      <p className="text-xs text-subtext mb-6">{selectedType.meaning}</p>

      {/* Counter circle */}
      <div className="relative mx-auto mb-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCount}
          className="relative w-40 h-40 rounded-full bg-surface border-2 border-primary/30 flex items-center justify-center cursor-pointer mx-auto hover:border-primary/50 transition-colors"
        >
          <svg className="absolute inset-0 w-40 h-40 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" fill="none" className="text-white/5" />
            <motion.circle
              cx="50" cy="50" r="46"
              stroke="url(#tasbihGrad)"
              strokeWidth="3" fill="none" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 46}
              animate={{ strokeDashoffset: 2 * Math.PI * 46 * (1 - progress / 100) }}
              transition={{ duration: 0.3 }}
            />
            <defs>
              <linearGradient id="tasbihGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>

          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-4xl font-bold text-text z-10"
            >
              {count}
            </motion.span>
          </AnimatePresence>

          {showRipple && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              className="absolute inset-0 rounded-full border-2 border-primary"
            />
          )}
        </motion.button>
      </div>

      {/* Target selector */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs text-subtext">Target:</span>
        {targets.map((t) => (
          <button
            key={t}
            onClick={() => { setTarget(t); setCount(0); }}
            className={`px-2 py-0.5 rounded text-xs cursor-pointer transition-all ${
              target === t
                ? 'bg-primary text-white'
                : 'bg-surface text-subtext hover:text-text'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-between text-xs text-subtext mt-4 pt-3 border-t border-white/5">
        <span>{count}/{target}</span>
        <span>Session total: {totalSession + count}</span>
        <button onClick={handleReset} className="text-red-400 hover:text-red-300 cursor-pointer">
          Reset
        </button>
      </div>
    </Card>
  );
}
