'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  unit: string;
  duration: string;
  participants: number;
  joined: boolean;
  progress: number;
}

const challenges: ChallengeItem[] = [
  { id: '1', title: '30 Day Quran Challenge', description: 'Read 1 Juz daily for 30 days', icon: '📖', target: 30, unit: 'Juz', duration: '30 days', participants: 156, joined: false, progress: 0 },
  { id: '2', title: 'Fajr Warriors', description: "Don't miss Fajr for 7 days", icon: '🌅', target: 7, unit: 'days', duration: '7 days', participants: 342, joined: false, progress: 0 },
  { id: '3', title: 'Tasbih Marathon', description: 'Complete 10,000 tasbih in a week', icon: '📿', target: 10000, unit: 'tasbih', duration: '7 days', participants: 89, joined: false, progress: 0 },
  { id: '4', title: 'Perfect Score Week', description: 'Score 100/100 every day for a week', icon: '💯', target: 7, unit: 'days', duration: '7 days', participants: 67, joined: false, progress: 0 },
  { id: '5', title: 'Dhikr Daily', description: 'Complete morning & evening azkar for 14 days', icon: '🤲', target: 14, unit: 'days', duration: '14 days', participants: 201, joined: false, progress: 0 },
];

export default function CommunityChallenge() {
  const [challengeList, setChallengeList] = useState(challenges);

  const toggleJoin = (id: string) => {
    setChallengeList((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              joined: !c.joined,
              participants: c.joined ? c.participants - 1 : c.participants + 1,
            }
          : c
      )
    );
  };

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Community Challenges
      </h3>

      <div className="space-y-3">
        {challengeList.map((challenge) => (
          <motion.div
            key={challenge.id}
            layout
            className={`p-4 rounded-xl border transition-all ${
              challenge.joined
                ? 'bg-primary/10 border-primary/20'
                : 'bg-surface border-white/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{challenge.icon}</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-text">{challenge.title}</h4>
                <p className="text-xs text-subtext mt-0.5">{challenge.description}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-subtext">
                  <span>{challenge.duration}</span>
                  <span>·</span>
                  <span>{challenge.participants} participants</span>
                  <span>·</span>
                  <span>{challenge.target} {challenge.unit}</span>
                </div>

                {challenge.joined && (
                  <div className="mt-2">
                    <div className="w-full bg-white/5 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-primary mt-1">{challenge.progress}/{challenge.target} {challenge.unit}</p>
                  </div>
                )}
              </div>
              <Button
                variant={challenge.joined ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => toggleJoin(challenge.id)}
              >
                {challenge.joined ? 'Joined' : 'Join'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
