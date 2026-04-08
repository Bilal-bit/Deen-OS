'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { getLevelForPoints } from '@/data/badges';
import { motion } from 'framer-motion';

interface LeaderboardUser {
  user_id: string;
  name: string;
  total_score: number;
  streak: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'weekly' | 'alltime'>('weekly');
  const currentUser = useAuthStore((s) => s.user);

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase.from('logs').select('user_id, score');

    if (timeframe === 'weekly') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      query = query.gte('date', weekAgo.toISOString().split('T')[0]);
    }

    const { data: logs } = await query;

    if (logs) {
      const scoreMap = new Map<string, number>();
      logs.forEach((log) => {
        scoreMap.set(log.user_id, (scoreMap.get(log.user_id) || 0) + log.score);
      });

      const { data: allUsers } = await supabase.from('users').select('id, name');
      const { data: streaks } = await supabase.from('streaks').select('user_id, current_streak');

      const streakMap = new Map<string, number>();
      streaks?.forEach((s) => streakMap.set(s.user_id, s.current_streak));

      const nameMap = new Map<string, string>();
      allUsers?.forEach((u) => nameMap.set(u.id, u.name));

      const leaderboard: LeaderboardUser[] = Array.from(scoreMap.entries())
        .map(([user_id, total_score]) => ({
          user_id,
          name: nameMap.get(user_id) || 'Anonymous',
          total_score,
          streak: streakMap.get(user_id) || 0,
        }))
        .sort((a, b) => b.total_score - a.total_score)
        .slice(0, 20);

      setUsers(leaderboard);
    }
    setLoading(false);
  };

  const rankColors = ['text-amber-400', 'text-gray-300', 'text-amber-600'];
  const rankIcons = ['🥇', '🥈', '🥉'];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Leaderboard
        </h3>
        <div className="flex gap-1">
          {(['weekly', 'alltime'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                timeframe === tf
                  ? 'bg-primary/20 text-primary'
                  : 'text-subtext hover:text-text'
              }`}
            >
              {tf === 'weekly' ? 'This Week' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
        </div>
      ) : users.length === 0 ? (
        <p className="text-sm text-subtext text-center py-8">No data yet. Start tracking!</p>
      ) : (
        <div className="space-y-1.5">
          {users.map((user, index) => {
            const isMe = user.user_id === currentUser?.id;
            const level = getLevelForPoints(user.total_score);
            return (
              <motion.div
                key={user.user_id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  isMe ? 'bg-primary/10 border border-primary/20' : 'bg-surface border border-white/5'
                }`}
              >
                <span className={`text-sm font-bold w-6 text-center ${rankColors[index] || 'text-subtext'}`}>
                  {index < 3 ? rankIcons[index] : index + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isMe ? 'text-primary' : 'text-text'}`}>
                    {isMe ? `${user.name} (You)` : user.name}
                  </p>
                  <p className="text-[10px] text-subtext">{level.icon} {level.name} · {user.streak} day streak</p>
                </div>
                <span className="text-sm font-bold text-highlight">{user.total_score}</span>
              </motion.div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
