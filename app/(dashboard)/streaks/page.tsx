'use client';

import { useAuthStore } from '@/stores/authStore';
import { useStreak } from '@/hooks/useStreak';
import Card from '@/components/ui/Card';
import StreakCalendar from '@/components/streaks/StreakCalendar';
import Skeleton from '@/components/ui/Skeleton';

export default function StreaksPage() {
  const user = useAuthStore((s) => s.user);
  const { streak, loading } = useStreak(user?.id);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Streaks</h2>

      {loading ? (
        <Card>
          <div className="flex gap-8">
            <Skeleton className="h-24 w-32" />
            <Skeleton className="h-24 w-32" />
          </div>
        </Card>
      ) : (
        <Card>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-highlight">
                {streak?.current_streak ?? 0}
              </div>
              <p className="text-sm text-subtext mt-2">Current Streak</p>
            </div>

            <div className="w-px h-16 bg-white/10" />

            <div className="text-center">
              <div className="text-5xl font-bold text-accent">
                {streak?.best_streak ?? 0}
              </div>
              <p className="text-sm text-subtext mt-2">Best Streak</p>
            </div>

            <div className="ml-auto text-5xl">🔥</div>
          </div>
        </Card>
      )}

      {user?.id && <StreakCalendar userId={user.id} />}
    </div>
  );
}
