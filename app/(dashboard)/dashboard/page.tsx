'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useLogStore } from '@/stores/logStore';
import { useStreak } from '@/hooks/useStreak';
import PrayerTracker from '@/components/prayer/PrayerTracker';
import AkhirahScoreCard from '@/components/prayer/AkhirahScoreCard';
import HabitTracker from '@/components/prayer/HabitTracker';
import PrayerTimesWidget from '@/components/prayer/PrayerTimesWidget';
import RamadanTracker from '@/components/prayer/RamadanTracker';
import StreakCard from '@/components/dashboard/StreakCard';
import QuickActions from '@/components/dashboard/QuickActions';
import DuaOfTheDay from '@/components/ibaadat/DuaOfTheDay';
import RewardAnimation from '@/components/gamification/RewardAnimation';
import Onboarding from '@/components/ui/Onboarding';
import { PrayerTime } from '@/types';
import { fetchPrayerTimes, isRamadan as checkRamadan } from '@/lib/prayerTimes';
import { createClient } from '@/lib/supabase/client';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { currentLog, currentDate, loading, fetchLog, consecutiveAll5 } = useLogStore();
  const { streak, loading: streakLoading } = useStreak(user?.id);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null);
  const [ramadan, setRamadan] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchLog(user.id, currentDate);
      loadPrayerTimes();
    }
  }, [user?.id, currentDate, fetchLog]);

  useEffect(() => {
    const done = localStorage.getItem('deen-os-onboarding');
    if (!done) setShowOnboarding(true);
  }, []);

  useEffect(() => {
    if (currentLog?.akhirah_score && currentLog.akhirah_score >= 200) setShowReward(true);
  }, [currentLog?.akhirah_score]);

  const loadPrayerTimes = async () => {
    const supabase = createClient();
    const { data } = await supabase.from('users').select('city, country').eq('id', user!.id).single();
    if (data?.city && data?.country) {
      const times = await fetchPrayerTimes(data.city, data.country);
      setPrayerTimes(times);
      const isRam = await checkRamadan(data.city, data.country);
      setRamadan(isRam);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('deen-os-onboarding', 'true');
  };

  return (
    <>
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      <RewardAnimation score={currentLog?.score ?? 0} show={showReward} />

      <div className="space-y-6">
        {/* Row 1: Score + Prayer Times */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AkhirahScoreCard log={currentLog} loading={loading} consecutiveAll5={consecutiveAll5} isRamadan={ramadan} />
          <div className="md:col-span-2">
            <PrayerTracker log={currentLog} loading={loading} prayerTimes={prayerTimes} />
          </div>
        </div>

        {/* Row 2: Habits + Streak + Prayer Times */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HabitTracker log={currentLog} loading={loading} />
          <StreakCard streak={streak} loading={streakLoading} />
          <PrayerTimesWidget />
        </div>

        {/* Ramadan mode */}
        {ramadan && (
          <RamadanTracker log={currentLog} loading={loading} />
        )}

        {/* Row 3: Quick Actions + Dua */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickActions />
          <DuaOfTheDay />
        </div>
      </div>
    </>
  );
}
