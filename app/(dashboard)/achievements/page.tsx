'use client';

import BadgesDisplay from '@/components/gamification/BadgesDisplay';
import LevelProgress from '@/components/gamification/LevelProgress';

export default function AchievementsPage() {
  // TODO: fetch real total points from user data
  const totalPoints = 650;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Achievements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LevelProgress totalPoints={totalPoints} />
        <BadgesDisplay />
      </div>
    </div>
  );
}
