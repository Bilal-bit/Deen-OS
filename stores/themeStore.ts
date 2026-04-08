'use client';

import { create } from 'zustand';

type Theme = 'dark' | 'light';
type Language = 'en' | 'ur';

interface ThemeState {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  language: 'en',

  initTheme: () => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('deen-os-theme') as Theme | null;
    const theme = saved || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });

    const savedLang = localStorage.getItem('deen-os-lang') as Language | null;
    if (savedLang) set({ language: savedLang });
  },

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('deen-os-theme', newTheme);
    }
    return { theme: newTheme };
  }),

  setLanguage: (language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('deen-os-lang', language);
    }
    set({ language });
  },
}));

export const translations = {
  en: {
    dashboard: 'Dashboard',
    insights: 'Insights',
    streaks: 'Streaks',
    profile: 'Profile',
    ibaadat: 'Ibaadat',
    knowledge: 'Knowledge',
    social: 'Social',
    productivity: 'Productivity',
    achievements: 'Achievements',
    salahTracker: 'Salah Tracker',
    dailyHabits: 'Daily Habits',
    akhirahScore: 'Akhirah Score',
    greeting: 'Assalamu Alaikum',
    completed: 'completed',
    done: 'done',
    prayed: 'prayed',
    today: 'today',
    schedule: 'Schedule',
    tasbih: 'Tasbih',
  },
  ur: {
    dashboard: 'ڈیش بورڈ',
    insights: 'بصیرت',
    streaks: 'سلسلہ',
    profile: 'پروفائل',
    ibaadat: 'عبادات',
    knowledge: 'علم',
    social: 'سماجی',
    productivity: 'پیداواریت',
    achievements: 'کامیابیاں',
    salahTracker: 'نماز ٹریکر',
    dailyHabits: 'روزانہ عادات',
    akhirahScore: 'آخرت سکور',
    greeting: 'السلام علیکم',
    completed: 'مکمل',
    done: 'ہو گیا',
    prayed: 'ادا کی',
    today: 'آج',
    schedule: 'شیڈول',
    tasbih: 'تسبیح',
  },
};

export function useTranslation() {
  const language = useThemeStore((s) => s.language);
  return translations[language];
}
