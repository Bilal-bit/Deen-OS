'use client';

import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import { DailyLog } from '@/types';
import { useLogStore } from '@/stores/logStore';
import { motion } from 'framer-motion';

interface RamadanModeProps {
  log: DailyLog | null;
  loading: boolean;
}

const ramadanItems = [
  { name: 'fasting' as const, label: 'Fasting Today', icon: '🌙' },
  { name: 'sehri' as const, label: 'Had Sehri', icon: '🍽️' },
  { name: 'iftar_dua' as const, label: 'Iftar Dua', icon: '🤲' },
  { name: 'taraweeh' as const, label: 'Taraweeh Prayed', icon: '🕌' },
];

export default function RamadanMode({ log, loading }: RamadanModeProps) {
  const toggleField = useLogStore((s) => s.toggleField);

  if (loading) return null;

  const completedCount = ramadanItems.filter((item) => log?.[item.name]).length;

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-card to-amber-950/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌙</span>
          <div>
            <h3 className="text-amber-400 text-sm font-semibold">Ramadan Mode</h3>
            <p className="text-[10px] text-subtext">Track your Ramadan ibaadat</p>
          </div>
        </div>
        <span className="text-xs text-amber-400 font-medium">
          {completedCount}/{ramadanItems.length}
        </span>
      </div>

      <div className="space-y-2">
        {ramadanItems.map((item) => (
          <Toggle
            key={item.name}
            label={item.label}
            icon={item.icon}
            checked={log?.[item.name] ?? false}
            onChange={() => toggleField(item.name)}
          />
        ))}
      </div>

      {completedCount === ramadanItems.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 bg-amber-500/10 rounded-xl text-center"
        >
          <p className="text-amber-400 text-sm font-medium">MashaAllah! Ramadan complete for today!</p>
        </motion.div>
      )}
    </Card>
  );
}
