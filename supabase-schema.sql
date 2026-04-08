-- Deen OS Database Schema v2.0
-- Run this in your Supabase SQL Editor

-- Users table
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  level integer default 1,
  total_points integer default 0,
  onboarding_done boolean default false
);

-- Daily logs table (updated with new fields)
create table if not exists public.logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  date date not null,
  -- Fard Salah
  fajr boolean default false,
  zuhr boolean default false,
  asr boolean default false,
  maghrib boolean default false,
  isha boolean default false,
  -- Core habits
  water boolean default false,
  sleep boolean default false,
  exercise boolean default false,
  quran boolean default false,
  -- Nawafil
  tahajjud boolean default false,
  ishraq boolean default false,
  duha boolean default false,
  awwabin boolean default false,
  -- Azkar
  morning_azkar boolean default false,
  evening_azkar boolean default false,
  -- Ramadan
  fasting boolean default false,
  taraweeh boolean default false,
  sehri boolean default false,
  iftar_dua boolean default false,
  -- Other
  score integer default 0,
  mood text,
  journal text,
  quran_juz integer,
  quran_surah text,
  quran_pages integer default 0,
  unique(user_id, date)
);

-- Streaks table
create table if not exists public.streaks (
  user_id uuid primary key references public.users(id) on delete cascade,
  current_streak integer default 0,
  best_streak integer default 0
);

-- Custom habits table
create table if not exists public.custom_habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  icon text default '🎯',
  points integer default 5,
  created_at timestamptz default now()
);

-- Custom habit logs
create table if not exists public.custom_habit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  habit_id uuid not null references public.custom_habits(id) on delete cascade,
  date date not null,
  completed boolean default false,
  unique(habit_id, date)
);

-- Goals table
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text,
  target_type text default 'weekly',
  target_value integer default 7,
  current_value integer default 0,
  category text default 'custom',
  start_date date not null,
  end_date date not null,
  completed boolean default false,
  created_at timestamptz default now()
);

-- Tasbih sessions
create table if not exists public.tasbih_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null,
  count integer default 0,
  target integer default 33,
  custom_text text,
  date date not null,
  created_at timestamptz default now()
);

-- User badges
create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

-- Quran progress
create table if not exists public.quran_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.users(id) on delete cascade,
  total_juz_read integer default 0,
  current_juz integer default 1,
  current_surah text default 'Al-Fatiha',
  total_pages_read integer default 0,
  khatm_count integer default 0
);

-- Accountability partners
create table if not exists public.accountability_partners (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  partner_id uuid not null references public.users(id) on delete cascade,
  status text default 'pending',
  created_at timestamptz default now(),
  unique(user_id, partner_id)
);

-- Community challenges
create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text default 'weekly',
  target integer default 7,
  reward_points integer default 50,
  start_date date not null,
  end_date date not null,
  created_at timestamptz default now()
);

-- User challenge participation
create table if not exists public.user_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  progress integer default 0,
  completed boolean default false,
  joined_at timestamptz default now(),
  unique(user_id, challenge_id)
);

-- Time blocks
create table if not exists public.time_blocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  start_time time not null,
  end_time time not null,
  category text default 'personal',
  date date not null,
  salah_anchor text
);

-- Enable Row Level Security on all tables
alter table public.users enable row level security;
alter table public.logs enable row level security;
alter table public.streaks enable row level security;
alter table public.custom_habits enable row level security;
alter table public.custom_habit_logs enable row level security;
alter table public.goals enable row level security;
alter table public.tasbih_sessions enable row level security;
alter table public.user_badges enable row level security;
alter table public.quran_progress enable row level security;
alter table public.accountability_partners enable row level security;
alter table public.challenges enable row level security;
alter table public.user_challenges enable row level security;
alter table public.time_blocks enable row level security;

-- RLS Policies: users can only access their own data

-- Users
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can insert own profile" on public.users for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

-- Logs
create policy "Users can view own logs" on public.logs for select using (auth.uid() = user_id);
create policy "Users can insert own logs" on public.logs for insert with check (auth.uid() = user_id);
create policy "Users can update own logs" on public.logs for update using (auth.uid() = user_id);

-- Streaks
create policy "Users can view own streaks" on public.streaks for select using (auth.uid() = user_id);
create policy "Users can insert own streaks" on public.streaks for insert with check (auth.uid() = user_id);
create policy "Users can update own streaks" on public.streaks for update using (auth.uid() = user_id);

-- Custom habits
create policy "Users can manage own custom habits" on public.custom_habits for all using (auth.uid() = user_id);

-- Custom habit logs
create policy "Users can manage own habit logs" on public.custom_habit_logs for all using (auth.uid() = user_id);

-- Goals
create policy "Users can manage own goals" on public.goals for all using (auth.uid() = user_id);

-- Tasbih sessions
create policy "Users can manage own tasbih" on public.tasbih_sessions for all using (auth.uid() = user_id);

-- User badges
create policy "Users can manage own badges" on public.user_badges for all using (auth.uid() = user_id);

-- Quran progress
create policy "Users can manage own quran progress" on public.quran_progress for all using (auth.uid() = user_id);

-- Accountability partners (can see partner data too)
create policy "Users can manage own partnerships" on public.accountability_partners for all using (auth.uid() = user_id or auth.uid() = partner_id);

-- Challenges (viewable by all, join restrictions on user_challenges)
create policy "Anyone can view challenges" on public.challenges for select using (true);

-- User challenges
create policy "Users can manage own challenge participation" on public.user_challenges for all using (auth.uid() = user_id);

-- Time blocks
create policy "Users can manage own time blocks" on public.time_blocks for all using (auth.uid() = user_id);

-- Leaderboard: allow users to view other users' names and logs for leaderboard
create policy "Users can view all user names for leaderboard" on public.users for select using (true);
create policy "Users can view all logs for leaderboard" on public.logs for select using (true);
create policy "Users can view all streaks for leaderboard" on public.streaks for select using (true);

-- Enable realtime for streaks table
alter publication supabase_realtime add table public.streaks;
