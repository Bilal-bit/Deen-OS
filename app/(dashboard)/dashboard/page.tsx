'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useLogStore } from '@/stores/logStore';
import { useStreak } from '@/hooks/useStreak';
import AkhirahScore from '@/components/dashboard/AkhirahScore';
import SalahTracker from '@/components/dashboard/SalahTracker';
import DailyHabits from '@/components/dashboard/DailyHabits';
import StreakCard from '@/components/dashboard/StreakCard';
import QuickActions from '@/components/dashboard/QuickActions';
import DailyChallenge from '@/components/gamification/DailyChallenge';
import DuaOfTheDay from '@/components/ibaadat/DuaOfTheDay';
import HadithOfTheDay from '@/components/knowledge/HadithOfTheDay';
import RewardAnimation from '@/components/gamification/RewardAnimation';
import Onboarding from '@/components/ui/Onboarding';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { todayLog, loading, fetchTodayLog } = useLogStore();
  const { streak, loading: streakLoading } = useStreak(user?.id);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchTodayLog(user.id);
    }
  }, [user?.id, fetchTodayLog]);

  // Check if first visit
  useEffect(() => {
    const done = localStorage.getItem('deen-os-onboarding');
    if (!done) setShowOnboarding(true);
  }, []);

  // Reward on perfect score
  useEffect(() => {
    if (todayLog?.score === 100) {
      setShowReward(true);
    }
  }, [todayLog?.score]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('deen-os-onboarding', 'true');
  };

  return (
    <>
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      <RewardAnimation score={todayLog?.score ?? 0} show={showReward} />

      <div className="space-y-6">
        {/* Row 1: Score + Salah */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AkhirahScore score={todayLog?.score ?? 0} loading={loading} />
          <div className="md:col-span-2">
            <SalahTracker log={todayLog} loading={loading} />
          </div>
        </div>

        {/* Row 2: Habits + Streak + Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DailyHabits log={todayLog} loading={loading} />
          <StreakCard streak={streak} loading={streakLoading} />
          <QuickActions />
        </div>

        {/* Row 3: Challenges + Daily Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DailyChallenge log={todayLog} />
          <DuaOfTheDay />
        </div>

        {/* Row 4: Hadith */}
        <HadithOfTheDay />
      </div>
    </>
  );
}
