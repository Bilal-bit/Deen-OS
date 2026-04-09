'use client';

import { create } from 'zustand';
import { DailyLog, ToggleField, PrayerStatus, SalahName } from '@/types';
import { calculateScore, calculateAkhirahScore, allPrayersCompleted } from '@/lib/score';
import { createClient } from '@/lib/supabase/client';
import { format, addDays, subDays } from 'date-fns';
import toast from 'react-hot-toast';

interface LogState {
  currentLog: DailyLog | null;
  currentDate: string;
  weeklyLogs: DailyLog[];
  monthlyLogs: DailyLog[];
  loading: boolean;
  consecutiveAll5: number;
  setDate: (date: string) => void;
  goNextDay: () => void;
  goPrevDay: () => void;
  goToday: () => void;
  fetchLog: (userId: string, date: string) => Promise<void>;
  fetchWeeklyLogs: (userId: string) => Promise<void>;
  fetchMonthlyLogs: (userId: string) => Promise<void>;
  setPrayerStatus: (prayer: SalahName, status: PrayerStatus) => Promise<void>;
  toggleField: (field: ToggleField) => Promise<void>;
  updateField: (field: string, value: number | string | boolean) => Promise<void>;
}

const emptyLog = (userId: string, date: string): DailyLog => ({
  user_id: userId,
  date,
  fajr: 'none',
  dhuhr: 'none',
  asr: 'none',
  maghrib: 'none',
  isha: 'none',
  quran: false,
  morning_dhikr: false,
  evening_dhikr: false,
  tahajjud: false,
  fasting: false,
  sadaqah: false,
  water: false,
  sleep: false,
  exercise: false,
  morning_azkar: false,
  evening_azkar: false,
  ishraq: false,
  duha: false,
  awwabin: false,
  taraweeh: false,
  sehri: false,
  iftar_dua: false,
  score: 0,
  akhirah_score: 0,
});

export const useLogStore = create<LogState>((set, get) => ({
  currentLog: null,
  currentDate: format(new Date(), 'yyyy-MM-dd'),
  weeklyLogs: [],
  monthlyLogs: [],
  loading: true,
  consecutiveAll5: 0,

  setDate: (date) => set({ currentDate: date }),
  goNextDay: () => {
    const next = format(addDays(new Date(get().currentDate), 1), 'yyyy-MM-dd');
    const today = format(new Date(), 'yyyy-MM-dd');
    if (next <= today) set({ currentDate: next });
  },
  goPrevDay: () => {
    set({ currentDate: format(subDays(new Date(get().currentDate), 1), 'yyyy-MM-dd') });
  },
  goToday: () => set({ currentDate: format(new Date(), 'yyyy-MM-dd') }),

  fetchLog: async (userId, date) => {
    const supabase = createClient();
    set({ loading: true });

    const { data, error } = await supabase
      .from('logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .maybeSingle();

    if (error) {
      console.error('Error fetching log:', error);
      set({ loading: false });
      return;
    }

    if (data) {
      const merged = { ...emptyLog(userId, date), ...data } as DailyLog;
      set({ currentLog: merged, loading: false });
    } else {
      const newLog = emptyLog(userId, date);
      const { data: created, error: createError } = await supabase
        .from('logs').insert(newLog).select().single();
      if (createError) {
        set({ currentLog: newLog, loading: false });
        return;
      }
      set({ currentLog: { ...newLog, ...created } as DailyLog, loading: false });
    }

    // Calculate consecutive all-5 days
    const { data: recentLogs } = await supabase
      .from('logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(60);

    if (recentLogs) {
      let streak = 0;
      const today = new Date();
      for (let i = 0; i < recentLogs.length; i++) {
        const expected = format(subDays(today, i), 'yyyy-MM-dd');
        const log = recentLogs.find((l) => l.date === expected);
        if (log && allPrayersCompleted(log as DailyLog)) {
          streak++;
        } else break;
      }
      set({ consecutiveAll5: streak });
    }
  },

  fetchWeeklyLogs: async (userId) => {
    const supabase = createClient();
    const today = new Date();
    const weekAgo = subDays(today, 6);
    const { data } = await supabase
      .from('logs').select('*').eq('user_id', userId)
      .gte('date', format(weekAgo, 'yyyy-MM-dd'))
      .lte('date', format(today, 'yyyy-MM-dd'))
      .order('date', { ascending: true });
    set({ weeklyLogs: (data as DailyLog[]) || [] });
  },

  fetchMonthlyLogs: async (userId) => {
    const supabase = createClient();
    const today = new Date();
    const monthAgo = subDays(today, 29);
    const { data } = await supabase
      .from('logs').select('*').eq('user_id', userId)
      .gte('date', format(monthAgo, 'yyyy-MM-dd'))
      .lte('date', format(today, 'yyyy-MM-dd'))
      .order('date', { ascending: true });
    set({ monthlyLogs: (data as DailyLog[]) || [] });
  },

  setPrayerStatus: async (prayer, status) => {
    const { currentLog, consecutiveAll5 } = get();
    if (!currentLog) return;

    const updatedLog = { ...currentLog, [prayer]: status };
    updatedLog.score = calculateScore(updatedLog);
    updatedLog.akhirah_score = calculateAkhirahScore(updatedLog, consecutiveAll5, false).total;

    set({ currentLog: updatedLog });

    const supabase = createClient();
    const { error } = await supabase
      .from('logs')
      .update({ [prayer]: status, score: updatedLog.score, akhirah_score: updatedLog.akhirah_score })
      .eq('id', currentLog.id);

    if (error) {
      set({ currentLog });
      toast.error('Failed to update prayer');
    } else {
      const label = status === 'on_time' ? 'Prayed on time!' : status === 'late' ? 'Prayed late' : 'Unmarked';
      toast.success(label, { duration: 1500 });
      updateStreak(currentLog.user_id);
    }
  },

  toggleField: async (field) => {
    const { currentLog, consecutiveAll5 } = get();
    if (!currentLog) return;

    const newValue = !currentLog[field as keyof DailyLog];
    const updatedLog = { ...currentLog, [field]: newValue };
    updatedLog.score = calculateScore(updatedLog);
    updatedLog.akhirah_score = calculateAkhirahScore(updatedLog, consecutiveAll5, false).total;

    set({ currentLog: updatedLog });

    const supabase = createClient();
    const { error } = await supabase
      .from('logs')
      .update({ [field]: newValue, score: updatedLog.score, akhirah_score: updatedLog.akhirah_score })
      .eq('id', currentLog.id);

    if (error) {
      set({ currentLog });
      toast.error('Failed to update');
    } else {
      toast.success(newValue ? 'Completed!' : 'Unmarked', { duration: 1500 });
    }
  },

  updateField: async (field, value) => {
    const { currentLog } = get();
    if (!currentLog) return;

    const updatedLog = { ...currentLog, [field]: value };
    set({ currentLog: updatedLog });

    const supabase = createClient();
    await supabase.from('logs').update({ [field]: value }).eq('id', currentLog.id);
  },
}));

async function updateStreak(userId: string) {
  const supabase = createClient();
  const { data: logs } = await supabase
    .from('logs').select('date, fajr, dhuhr, asr, maghrib, isha')
    .eq('user_id', userId).order('date', { ascending: false }).limit(365);

  if (!logs || logs.length === 0) return;

  let currentStreak = 0;
  const today = new Date();

  for (let i = 0; i < logs.length; i++) {
    const expected = format(subDays(today, i), 'yyyy-MM-dd');
    const log = logs.find((l) => l.date === expected);
    if (!log) break;
    if (allPrayersCompleted(log as DailyLog)) {
      currentStreak++;
    } else break;
  }

  const { data: existing } = await supabase.from('streaks').select('*').eq('user_id', userId).maybeSingle();
  const bestStreak = existing ? Math.max(existing.best_streak, currentStreak) : currentStreak;

  if (existing) {
    await supabase.from('streaks').update({ current_streak: currentStreak, best_streak: bestStreak }).eq('user_id', userId);
  } else {
    await supabase.from('streaks').insert({ user_id: userId, current_streak: currentStreak, best_streak: bestStreak });
  }
}
