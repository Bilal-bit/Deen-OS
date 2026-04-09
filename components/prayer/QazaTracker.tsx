'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SalahName } from '@/types';
import { prayerInfo } from '@/lib/prayerTimes';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface QazaEntry {
  id: string;
  prayer: SalahName;
  date: string;
  made_up: boolean;
}

const prayers: SalahName[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

export default function QazaTracker() {
  const user = useAuthStore((s) => s.user);
  const [entries, setEntries] = useState<QazaEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newPrayer, setNewPrayer] = useState<SalahName>('fajr');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    if (user?.id) fetchQaza();
  }, [user?.id]);

  const fetchQaza = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('qaza_prayers').select('*').eq('user_id', user!.id).order('date', { ascending: false });
    setEntries((data as QazaEntry[]) || []);
    setLoading(false);
  };

  const addQaza = async () => {
    if (!newDate) { toast.error('Select a date'); return; }
    const supabase = createClient();
    const { error } = await supabase.from('qaza_prayers').insert({
      user_id: user!.id, prayer: newPrayer, date: newDate, made_up: false,
    });
    if (error) toast.error('Failed to add');
    else { toast.success('Qaza prayer added'); setShowAdd(false); setNewDate(''); fetchQaza(); }
  };

  const markMadeUp = async (id: string) => {
    const supabase = createClient();
    await supabase.from('qaza_prayers').update({ made_up: true, made_up_date: new Date().toISOString().split('T')[0] }).eq('id', id);
    toast.success('Marked as made up!');
    fetchQaza();
  };

  const pending = entries.filter((e) => !e.made_up);
  const madeUp = entries.filter((e) => e.made_up);

  // Count per prayer
  const countByPrayer = prayers.map((p) => ({
    prayer: p,
    pending: pending.filter((e) => e.prayer === p).length,
    total: entries.filter((e) => e.prayer === p).length,
  }));

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">Qaza Tracker</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center cursor-pointer text-sm"
        >
          {showAdd ? '×' : '+'}
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
            <div className="p-3 bg-surface rounded-xl border border-white/5 space-y-3">
              <div className="flex gap-2">
                <select value={newPrayer} onChange={(e) => setNewPrayer(e.target.value as SalahName)}
                  className="flex-1 bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-text">
                  {prayers.map((p) => <option key={p} value={p}>{prayerInfo[p].label}</option>)}
                </select>
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}
                  className="flex-1 bg-card border border-white/10 rounded-xl px-3 py-2 text-sm text-text" />
              </div>
              <Button onClick={addQaza} size="sm" className="w-full">Add Missed Prayer</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <div className="grid grid-cols-5 gap-1.5 mb-4">
        {countByPrayer.map((cp) => (
          <div key={cp.prayer} className={`text-center p-2 rounded-xl border ${cp.pending > 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-surface border-white/5'}`}>
            <p className="text-xs font-medium text-text">{prayerInfo[cp.prayer].label}</p>
            <p className={`text-lg font-bold ${cp.pending > 0 ? 'text-red-400' : 'text-primary'}`}>{cp.pending}</p>
            <p className="text-[9px] text-subtext">owed</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-subtext mb-3">Total pending: <span className="font-bold text-text">{pending.length}</span> &middot; Made up: <span className="text-primary">{madeUp.length}</span></p>

      {/* Pending list */}
      {pending.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-2xl mb-2">✨</p>
          <p className="text-xs text-subtext">No Qaza prayers pending. MashaAllah!</p>
        </div>
      ) : (
        <div className="space-y-1.5 max-h-60 overflow-y-auto">
          {pending.slice(0, 10).map((entry) => (
            <div key={entry.id} className="flex items-center gap-3 p-2 bg-surface rounded-xl border border-white/5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text">{prayerInfo[entry.prayer].label}</p>
                <p className="text-[10px] text-subtext">{entry.date}</p>
              </div>
              <button onClick={() => markMadeUp(entry.id)}
                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-lg hover:bg-primary/20 cursor-pointer">
                Made Up
              </button>
            </div>
          ))}
          {pending.length > 10 && <p className="text-xs text-subtext text-center">+{pending.length - 10} more</p>}
        </div>
      )}
    </Card>
  );
}
