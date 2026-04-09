'use client';

import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import { DailyLog } from '@/types';
import { useLogStore } from '@/stores/logStore';

interface RamadanTrackerProps {
  log: DailyLog | null;
  loading: boolean;
}

export default function RamadanTracker({ log, loading }: RamadanTrackerProps) {
  const { toggleField, updateField } = useLogStore();

  if (loading || !log) return null;

  const items = [
    { field: 'sehri' as const, label: 'Sehri Eaten', icon: '🍽️' },
    { field: 'fasting' as const, label: 'Fasting Today', icon: '🌙' },
    { field: 'iftar_dua' as const, label: 'Iftar Dua', icon: '🤲' },
    { field: 'taraweeh' as const, label: 'Tarawih Prayed', icon: '🕌' },
  ];

  const completedCount = items.filter((i) => log?.[i.field]).length;

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-card to-amber-100/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌙</span>
          <div>
            <h3 className="text-amber-600 text-sm font-semibold">Ramadan Mode</h3>
            <p className="text-[10px] text-subtext">1.5x Akhirah Score multiplier active</p>
          </div>
        </div>
        <span className="text-xs text-amber-600 font-medium">{completedCount}/{items.length}</span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <Toggle
            key={item.field}
            label={item.label}
            icon={item.icon}
            checked={!!log?.[item.field]}
            onChange={() => toggleField(item.field)}
          />
        ))}
      </div>

      {/* Tarawih rakaat */}
      {log.taraweeh && (
        <div className="mt-3 p-3 bg-surface rounded-xl border border-white/5">
          <label className="text-xs text-subtext mb-1 block">Tarawih Rakaat</label>
          <div className="flex gap-2">
            {[8, 12, 20].map((r) => (
              <button key={r} onClick={() => updateField('taraweeh_rakaat', r)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  log.taraweeh_rakaat === r ? 'bg-primary text-white' : 'bg-card border border-white/10 text-text'
                }`}>{r}</button>
            ))}
          </div>
        </div>
      )}

      {/* Quran Khatam progress */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-subtext">Quran Khatam Progress</label>
          <span className="text-xs text-primary font-medium">{log.quran_khatam_page || 0}/604 pages</span>
        </div>
        <div className="w-full bg-surface rounded-full h-2">
          <div className="h-2 rounded-full bg-amber-500 transition-all" style={{ width: `${((log.quran_khatam_page || 0) / 604) * 100}%` }} />
        </div>
        <input
          type="range"
          min={0}
          max={604}
          value={log.quran_khatam_page || 0}
          onChange={(e) => updateField('quran_khatam_page', Number(e.target.value))}
          className="w-full mt-1 accent-amber-500"
        />
      </div>
    </Card>
  );
}
