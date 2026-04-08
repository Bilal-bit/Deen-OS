'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { DailyLog } from '@/types';
import { useLogStore } from '@/stores/logStore';
import { morningAzkar, eveningAzkar, Zikr } from '@/data/azkar';
import { motion, AnimatePresence } from 'framer-motion';

interface AzkarChecklistProps {
  log: DailyLog | null;
  loading: boolean;
}

export default function AzkarChecklist({ log, loading }: AzkarChecklistProps) {
  const toggleField = useLogStore((s) => s.toggleField);
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const azkar = activeTab === 'morning' ? morningAzkar : eveningAzkar;
  const fieldName = activeTab === 'morning' ? 'morning_azkar' : 'evening_azkar';
  const isFieldDone = log?.[fieldName as keyof DailyLog] ?? false;

  const toggleZikr = (zikr: Zikr) => {
    const newSet = new Set(completedIds);
    if (newSet.has(zikr.id)) {
      newSet.delete(zikr.id);
    } else {
      newSet.add(zikr.id);
    }
    setCompletedIds(newSet);

    if (newSet.size === azkar.length && !isFieldDone) {
      toggleField(fieldName as 'morning_azkar' | 'evening_azkar');
    }
  };

  if (loading) return null;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Daily Azkar
        </h3>
        <span className="text-xs text-primary font-medium">
          {completedIds.size}/{azkar.length} done
        </span>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setActiveTab('morning'); setCompletedIds(new Set()); }}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'morning'
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              : 'bg-surface text-subtext border border-white/5'
          }`}
        >
          ☀️ Morning
        </button>
        <button
          onClick={() => { setActiveTab('evening'); setCompletedIds(new Set()); }}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'evening'
              ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
              : 'bg-surface text-subtext border border-white/5'
          }`}
        >
          🌙 Evening
        </button>
      </div>

      {/* Azkar list */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {azkar.map((zikr) => {
          const done = completedIds.has(zikr.id);
          return (
            <div key={zikr.id}>
              <button
                onClick={() => setExpandedId(expandedId === zikr.id ? null : zikr.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer text-left ${
                  done
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-surface border border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); toggleZikr(zikr); }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 cursor-pointer ${
                    done ? 'bg-primary text-white' : 'bg-white/5 text-subtext'
                  }`}
                >
                  {done ? '✓' : '○'}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text truncate">{zikr.transliteration}</p>
                  <p className="text-[10px] text-subtext">x{zikr.count}</p>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === zikr.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 bg-surface/50 rounded-b-xl border border-t-0 border-white/5 space-y-2">
                      <p className="text-right text-lg text-accent leading-loose">{zikr.arabic}</p>
                      <p className="text-xs text-text">{zikr.translation}</p>
                      <p className="text-[10px] text-subtext">Repeat {zikr.count} times — {zikr.reference}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
