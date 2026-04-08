export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level?: number;
  total_points?: number;
  onboarding_done?: boolean;
}

export interface DailyLog {
  id?: string;
  user_id: string;
  date: string;
  fajr: boolean;
  zuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  water: boolean;
  sleep: boolean;
  exercise: boolean;
  quran: boolean;
  tahajjud: boolean;
  ishraq: boolean;
  duha: boolean;
  awwabin: boolean;
  morning_azkar: boolean;
  evening_azkar: boolean;
  score: number;
  mood?: MoodType;
  journal?: string;
  quran_juz?: number;
  quran_surah?: string;
  quran_pages?: number;
  fasting?: boolean;
  taraweeh?: boolean;
  sehri?: boolean;
  iftar_dua?: boolean;
}

export interface Streak {
  user_id: string;
  current_streak: number;
  best_streak: number;
}

export interface CustomHabit {
  id?: string;
  user_id: string;
  name: string;
  icon: string;
  points: number;
  created_at?: string;
}

export interface CustomHabitLog {
  id?: string;
  user_id: string;
  habit_id: string;
  date: string;
  completed: boolean;
}

export interface Goal {
  id?: string;
  user_id: string;
  title: string;
  description?: string;
  target_type: 'daily' | 'weekly' | 'monthly';
  target_value: number;
  current_value: number;
  category: 'salah' | 'quran' | 'habit' | 'custom';
  start_date: string;
  end_date: string;
  completed: boolean;
  created_at?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'salah' | 'quran' | 'habit' | 'special';
  requirement: number;
  earned?: boolean;
  earned_at?: string;
}

export interface UserBadge {
  id?: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

export interface Challenge {
  id?: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'community';
  target: number;
  reward_points: number;
  start_date: string;
  end_date: string;
  participants?: number;
}

export interface UserChallenge {
  id?: string;
  user_id: string;
  challenge_id: string;
  progress: number;
  completed: boolean;
  joined_at: string;
}

export interface TasbihSession {
  id?: string;
  user_id: string;
  type: 'subhanallah' | 'alhamdulillah' | 'allahuakbar' | 'custom';
  count: number;
  target: number;
  custom_text?: string;
  date: string;
  created_at?: string;
}

export interface AccountabilityPartner {
  id?: string;
  user_id: string;
  partner_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at?: string;
}

export interface QuranProgress {
  id?: string;
  user_id: string;
  total_juz_read: number;
  current_juz: number;
  current_surah: string;
  total_pages_read: number;
  khatm_count: number;
}

export interface TimeBlock {
  id?: string;
  user_id: string;
  title: string;
  start_time: string;
  end_time: string;
  salah_anchor?: SalahName;
  category: 'ibadah' | 'work' | 'study' | 'personal' | 'rest';
  date: string;
}

export type SalahName = 'fajr' | 'zuhr' | 'asr' | 'maghrib' | 'isha';
export type HabitName = 'water' | 'sleep' | 'exercise' | 'quran';
export type NafilName = 'tahajjud' | 'ishraq' | 'duha' | 'awwabin';
export type AzkarName = 'morning_azkar' | 'evening_azkar';
export type RamadanField = 'fasting' | 'taraweeh' | 'sehri' | 'iftar_dua';
export type ToggleField = SalahName | HabitName | NafilName | AzkarName | RamadanField;
export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'bad';

export interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export interface Hadith {
  id: number;
  arabic: string;
  translation: string;
  narrator: string;
  source: string;
  chapter?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

export interface AllahName {
  id: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  brief: string;
}

export interface QuranAyah {
  id: number;
  arabic: string;
  translation: string;
  surah: string;
  surah_number: number;
  ayah_number: number;
}

export interface LeaderboardEntry {
  user_id: string;
  name: string;
  score: number;
  streak: number;
  level: number;
  rank: number;
}

export interface PrayerTime {
  fajr: string;
  sunrise: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}
