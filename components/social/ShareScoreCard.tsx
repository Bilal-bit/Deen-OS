'use client';

import { useRef } from 'react';
import Card from '@/components/ui/Card';
import { DailyLog } from '@/types';
import { useAuthStore } from '@/stores/authStore';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface ShareScoreCardProps {
  log: DailyLog | null;
}

export default function ShareScoreCard({ log }: ShareScoreCardProps) {
  const user = useAuthStore((s) => s.user);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!log) return null;

  const salahCount = (['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).filter((s) => log[s]).length;
  const habitCount = (['water', 'sleep', 'exercise', 'quran'] as const).filter((h) => log[h]).length;

  const handleShare = async () => {
    const shareData = {
      title: 'Deen OS - My Daily Score',
      text: `Assalamu Alaikum! My Deen OS score today: ${log.score}/100\nSalah: ${salahCount}/5 | Habits: ${habitCount}/4\n\nTrack your Islamic lifestyle with Deen OS!`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareData.text);
    }
  };

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Share Your Score
      </h3>

      {/* Score card preview */}
      <div
        ref={cardRef}
        className="bg-gradient-to-br from-surface via-card to-primary/10 rounded-2xl p-6 border border-white/10 mb-4"
      >
        <div className="text-center space-y-3">
          <p className="text-xs text-subtext">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>

          <div className="flex items-center justify-center gap-2">
            <span className="text-primary font-bold text-lg">Deen</span>
            <span className="text-text font-bold text-lg">OS</span>
          </div>

          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-highlight"
          >
            {log.score}
          </motion.div>
          <p className="text-xs text-subtext">Akhirah Score</p>

          <div className="flex justify-center gap-4 pt-2">
            <div className="text-center">
              <p className="text-lg font-bold text-primary">{salahCount}/5</p>
              <p className="text-[10px] text-subtext">Salah</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-lg font-bold text-accent">{habitCount}/4</p>
              <p className="text-[10px] text-subtext">Habits</p>
            </div>
          </div>

          <p className="text-[10px] text-subtext pt-2">— {user?.name} —</p>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium text-sm cursor-pointer transition-all flex items-center justify-center gap-2"
      >
        <span>📤</span> Share Score Card
      </button>
    </Card>
  );
}
