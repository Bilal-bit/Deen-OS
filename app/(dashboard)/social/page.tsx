'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useLogStore } from '@/stores/logStore';
import Leaderboard from '@/components/social/Leaderboard';
import ShareScoreCard from '@/components/social/ShareScoreCard';
import AccountabilityPartner from '@/components/social/AccountabilityPartner';

export default function SocialPage() {
  const user = useAuthStore((s) => s.user);
  const { currentLog, currentDate, fetchLog } = useLogStore();

  useEffect(() => {
    if (user?.id) fetchLog(user.id, currentDate);
  }, [user?.id, currentDate, fetchLog]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Community</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Leaderboard />
        <div className="space-y-6">
          <ShareScoreCard log={currentLog} />
          <AccountabilityPartner />
        </div>
      </div>
    </div>
  );
}
