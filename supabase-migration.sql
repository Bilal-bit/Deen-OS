-- Deen OS Migration v1 → v2
-- Run this in Supabase SQL Editor
-- Only adds NEW columns and tables (won't conflict with existing schema)

-- ============================================
-- 1. ADD NEW COLUMNS TO EXISTING TABLES
-- ============================================

-- Users table: add new columns
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS level integer DEFAULT 1;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS total_points integer DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onboarding_done boolean DEFAULT false;

-- Logs table: add nawafil columns
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS tahajjud boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS ishraq boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS duha boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS awwabin boolean DEFAULT false;

-- Logs table: add azkar columns
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS morning_azkar boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS evening_azkar boolean DEFAULT false;

-- Logs table: add ramadan columns
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS fasting boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS taraweeh boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS sehri boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS iftar_dua boolean DEFAULT false;

-- Logs table: add mood, journal, quran tracking
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS mood text;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS journal text;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS quran_juz integer;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS quran_surah text;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS quran_pages integer DEFAULT 0;


-- ============================================
-- 2. CREATE NEW TABLES
-- ============================================

-- Custom habits
CREATE TABLE IF NOT EXISTS public.custom_habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  icon text DEFAULT '🎯',
  points integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

-- Custom habit logs
CREATE TABLE IF NOT EXISTS public.custom_habit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  habit_id uuid NOT NULL REFERENCES public.custom_habits(id) ON DELETE CASCADE,
  date date NOT NULL,
  completed boolean DEFAULT false,
  UNIQUE(habit_id, date)
);

-- Goals
CREATE TABLE IF NOT EXISTS public.goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  target_type text DEFAULT 'weekly',
  target_value integer DEFAULT 7,
  current_value integer DEFAULT 0,
  category text DEFAULT 'custom',
  start_date date NOT NULL,
  end_date date NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Tasbih sessions
CREATE TABLE IF NOT EXISTS public.tasbih_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  count integer DEFAULT 0,
  target integer DEFAULT 33,
  custom_text text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User badges
CREATE TABLE IF NOT EXISTS public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id text NOT NULL,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Quran progress
CREATE TABLE IF NOT EXISTS public.quran_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  total_juz_read integer DEFAULT 0,
  current_juz integer DEFAULT 1,
  current_surah text DEFAULT 'Al-Fatiha',
  total_pages_read integer DEFAULT 0,
  khatm_count integer DEFAULT 0
);

-- Accountability partners
CREATE TABLE IF NOT EXISTS public.accountability_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  partner_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, partner_id)
);

-- Community challenges
CREATE TABLE IF NOT EXISTS public.challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text DEFAULT 'weekly',
  target integer DEFAULT 7,
  reward_points integer DEFAULT 50,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User challenge participation
CREATE TABLE IF NOT EXISTS public.user_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  progress integer DEFAULT 0,
  completed boolean DEFAULT false,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Time blocks
CREATE TABLE IF NOT EXISTS public.time_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  category text DEFAULT 'personal',
  date date NOT NULL,
  salah_anchor text
);


-- ============================================
-- 3. ENABLE RLS ON NEW TABLES
-- ============================================

ALTER TABLE public.custom_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasbih_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quran_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accountability_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_blocks ENABLE ROW LEVEL SECURITY;


-- ============================================
-- 4. RLS POLICIES FOR NEW TABLES
-- ============================================

-- Custom habits
CREATE POLICY "Users can manage own custom habits" ON public.custom_habits FOR ALL USING (auth.uid() = user_id);

-- Custom habit logs
CREATE POLICY "Users can manage own habit logs" ON public.custom_habit_logs FOR ALL USING (auth.uid() = user_id);

-- Goals
CREATE POLICY "Users can manage own goals" ON public.goals FOR ALL USING (auth.uid() = user_id);

-- Tasbih sessions
CREATE POLICY "Users can manage own tasbih" ON public.tasbih_sessions FOR ALL USING (auth.uid() = user_id);

-- User badges
CREATE POLICY "Users can manage own badges" ON public.user_badges FOR ALL USING (auth.uid() = user_id);

-- Quran progress
CREATE POLICY "Users can manage own quran progress" ON public.quran_progress FOR ALL USING (auth.uid() = user_id);

-- Accountability partners (can see partner data too)
CREATE POLICY "Users can manage own partnerships" ON public.accountability_partners FOR ALL USING (auth.uid() = user_id OR auth.uid() = partner_id);

-- Challenges (viewable by all)
CREATE POLICY "Anyone can view challenges" ON public.challenges FOR SELECT USING (true);

-- User challenges
CREATE POLICY "Users can manage own challenge participation" ON public.user_challenges FOR ALL USING (auth.uid() = user_id);

-- Time blocks
CREATE POLICY "Users can manage own time blocks" ON public.time_blocks FOR ALL USING (auth.uid() = user_id);
