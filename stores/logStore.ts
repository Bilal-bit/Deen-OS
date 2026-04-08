'use client';

import { create } from 'zustand';
import { DailyLog, ToggleField } from '@/types';
import { calculateScore } from '@/lib/score';
import { createClient } from '@/lib/supabase/client';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface LogState {
  todayLog: DailyLog | null;
  weeklyLogs: DailyLog[];
  loading: boolean;
  fetchTodayLog: (userId: string) => Promise<void>;
  fetchWeeklyLogs: (userId: string) => Promise<void>;
  toggleField: (field: ToggleField) => Promise<void>;
}

const emptyLog = (userId: string, date: string): DailyLog => ({
  user_id: userId,
  date,
  fajr: false,
  zuhr: false,
  asr: false,
  maghrib: false,
  isha: false,
  water: false,
  sleep: false,
  exercise: false,
  quran: false,
  tahajjud: false,
  ishraq: false,
  duha: false,
  awwabin: false,
  morning_azkar: false,
  evening_azkar: false,
  fasting: false,
  taraweeh: false,
  sehri: false,
  iftar_dua: false,
  score: 0,
});

export const useLogStore = create<LogState>((set, get) => ({
  todayLog: null,
  weeklyLogs: [],
  loading: true,

  fetchTodayLog: async (userId: string) => {
    const supabase = createClient();
    const today = format(new Date(), 'yyyy-MM-dd');

    set({ loading: true });

    const { data, error } = await supabase
      .from('logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .maybeSingle();

    if (error) {
      console.error('Error fetching log:', error);
      set({ loading: false });
      return;
    }

    if (data) {
      // Merge with defaults for any new fields not in DB yet
      const merged = { ...emptyLog(userId, today), ...data } as DailyLog;
      set({ todayLog: merged, loading: false });
    } else {
      // Auto-create today's log
      const newLog = emptyLog(userId, today);
      const { data: created, error: createError } = await supabase
        .from('logs')
        .insert(newLog)
        .select()
        .single();

      if (createError) {
        console.error('Error creating log:', createError);
        set({ loading: false });
        return;
      }

      set({ todayLog: { ...newLog, ...created } as DailyLog, loading: false });
    }
  },

  fetchWeeklyLogs: async (userId: string) => {
    const supabase = createClient();
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);

    const { data, error } = await supabase
      .from('logs')
      .select('*')
      .eq('user_id', userId)
      .gte('date', format(weekAgo, 'yyyy-MM-dd'))
      .lte('date', format(today, 'yyyy-MM-dd'))
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching weekly logs:', error);
      return;
    }

    set({ weeklyLogs: (data as DailyLog[]) || [] });
  },

  toggleField: async (field: ToggleField) => {
    const { todayLog } = get();
    if (!todayLog) return;

    const newValue = !todayLog[field];
    const updatedLog = { ...todayLog, [field]: newValue };
    updatedLog.score = calculateScore(updatedLog);

    // Optimistic update
    set({ todayLog: updatedLog });

    const supabase = createClient();
    const { error } = await supabase
      .from('logs')
      .update({ [field]: newValue, score: updatedLog.score })
      .eq('id', todayLog.id);

    if (error) {
      // Revert on error
      set({ todayLog });
      toast.error('Failed to update. Please try again.');
      console.error('Toggle error:', error);
    } else {
      toast.success(
        newValue ? 'Marked as completed!' : 'Marked as incomplete',
        { duration: 1500 }
      );
      // Update streak
      updateStreak(todayLog.user_id, updatedLog);
    }
  },
}));

async function updateStreak(userId: string, log: DailyLog) {
  const supabase = createClient();

  const { data: logs } = await supabase
    .from('logs')
    .select('date, score')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(365);

  if (!logs || logs.length === 0) return;

  let currentStreak = 0;
  const today = new Date();

  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date);
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);

    if (format(logDate, 'yyyy-MM-dd') !== format(expectedDate, 'yyyy-MM-dd')) break;
    if (logs[i].score > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  const { data: existing } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  const bestStreak = existing
    ? Math.max(existing.best_streak, currentStreak)
    : currentStreak;

  if (existing) {
    await supabase
      .from('streaks')
      .update({ current_streak: currentStreak, best_streak: bestStreak })
      .eq('user_id', userId);
  } else {
    await supabase
      .from('streaks')
      .insert({ user_id: userId, current_streak: currentStreak, best_streak: bestStreak });
  }
}
