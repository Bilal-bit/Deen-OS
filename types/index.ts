export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level?: number;
  total_points?: number;
  onboarding_done?: boolean;
  city?: string;
  country?: string;
}

// Prayer state: 'none' | 'on_time' | 'late'
export type PrayerStatus = 'none' | 'on_time' | 'late';

export interface DailyLog {
  id?: string;
  user_id: string;
  date: string;
  // Fard prayers (3-state)
  fajr: PrayerStatus;
  dhuhr: PrayerStatus;
  asr: PrayerStatus;
  maghrib: PrayerStatus;
  isha: PrayerStatus;
  // Habits
  quran: boolean;
  quran_pages?: number;
  quran_minutes?: number;
  morning_dhikr: boolean;
  evening_dhikr: boolean;
  tahajjud: boolean;
  fasting: boolean;
  sadaqah: boolean;
  sadaqah_amount?: number;
  sadaqah_note?: string;
  duaa_journal?: string;
  // Other habits (legacy compat)
  water: boolean;
  sleep: boolean;
  exercise: boolean;
  // Azkar (legacy compat)
  morning_azkar: boolean;
  evening_azkar: boolean;
  // Nawafil
  ishraq: boolean;
  duha: boolean;
  awwabin: boolean;
  // Ramadan
  taraweeh: boolean;
  taraweeh_rakaat?: number;
  sehri: boolean;
  iftar_dua: boolean;
  quran_khatam_page?: number;
  // Scoring
  score: number;
  akhirah_score: number;
  // Meta
  mood?: MoodType;
  journal?: string;
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

export interface QazaPrayer {
  id?: string;
  user_id: string;
  prayer: SalahName;
  date: string;
  made_up: boolean;
  made_up_date?: string;
  created_at?: string;
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

export interface QuranProgress {
  id?: string;
  user_id: string;
  total_juz_read: number;
  current_juz: number;
  current_surah: string;
  total_pages_read: number;
  khatm_count: number;
}

export interface PrayerTime {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface AkhirahScoreBreakdown {
  prayers_on_time: number;
  prayers_late: number;
  quran: number;
  dhikr: number;
  fasting: number;
  sadaqah: number;
  consistency_bonus: number;
  ramadan_multiplier: number;
  total: number;
}

export type SalahName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
export type HabitName = 'water' | 'sleep' | 'exercise' | 'quran';
export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'bad';

export type ToggleField =
  | 'quran' | 'morning_dhikr' | 'evening_dhikr' | 'tahajjud'
  | 'fasting' | 'sadaqah' | 'water' | 'sleep' | 'exercise'
  | 'ishraq' | 'duha' | 'awwabin'
  | 'taraweeh' | 'sehri' | 'iftar_dua'
  | 'morning_azkar' | 'evening_azkar';

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

export interface AccountabilityPartner {
  id?: string;
  user_id: string;
  partner_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at?: string;
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

export interface LeaderboardEntry {
  user_id: string;
  name: string;
  score: number;
  streak: number;
  level: number;
  rank: number;
}

export interface Dua { id: number; arabic: string; transliteration: string; translation: string; reference: string; }
export interface Hadith { id: number; arabic: string; translation: string; narrator: string; source: string; chapter?: string; }
export interface QuizQuestion { id: number; question: string; options: string[]; correct: number; explanation: string; category: string; }
export interface AllahName { id: number; arabic: string; transliteration: string; meaning: string; brief: string; }
export interface QuranAyah { id: number; arabic: string; translation: string; surah: string; surah_number: number; ayah_number: number; }
