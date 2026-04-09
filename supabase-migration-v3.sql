-- Deen OS Migration v2 → v3 (Prayer Tracker + Akhirah Score + Habits + Qaza)
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. UPDATE LOGS TABLE — prayer status from boolean to text
-- ============================================

-- Change prayer columns from boolean to text (3-state: none/on_time/late)
-- First add new text columns
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS fajr_status text DEFAULT 'none';
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS dhuhr_status text DEFAULT 'none';
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS asr_status text DEFAULT 'none';
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS maghrib_status text DEFAULT 'none';
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS isha_status text DEFAULT 'none';

-- Migrate existing boolean data to status
UPDATE public.logs SET fajr_status = CASE WHEN fajr = true THEN 'on_time' ELSE 'none' END WHERE fajr_status = 'none' AND fajr IS NOT NULL;
UPDATE public.logs SET dhuhr_status = CASE WHEN zuhr = true THEN 'on_time' ELSE 'none' END WHERE dhuhr_status = 'none' AND zuhr IS NOT NULL;
UPDATE public.logs SET asr_status = CASE WHEN asr = true THEN 'on_time' ELSE 'none' END WHERE asr_status = 'none';
UPDATE public.logs SET maghrib_status = CASE WHEN maghrib = true THEN 'on_time' ELSE 'none' END WHERE maghrib_status = 'none';
UPDATE public.logs SET isha_status = CASE WHEN isha = true THEN 'on_time' ELSE 'none' END WHERE isha_status = 'none';

-- Now rename: drop old bool columns and rename new ones
-- (Keep old columns for backward compat — just use new ones in app)

-- New habit columns
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS morning_dhikr boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS evening_dhikr boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS sadaqah boolean DEFAULT false;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS sadaqah_amount numeric;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS sadaqah_note text;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS quran_minutes integer;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS duaa_journal text;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS taraweeh_rakaat integer;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS quran_khatam_page integer DEFAULT 0;

-- Akhirah score column
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS akhirah_score integer DEFAULT 0;

-- ============================================
-- 2. USER LOCATION
-- ============================================
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS country text;

-- ============================================
-- 3. QAZA PRAYERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.qaza_prayers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  prayer text NOT NULL,
  date date NOT NULL,
  made_up boolean DEFAULT false,
  made_up_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.qaza_prayers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own qaza" ON public.qaza_prayers FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- 4. CREATE VIEW for prayer status access
-- ============================================
-- The app will use fajr_status, dhuhr_status etc columns
-- But also keep reading from fajr, zuhr etc for backward compat
