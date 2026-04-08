'use client';

import QuranTracker from '@/components/ibaadat/QuranTracker';
import AyahOfTheDay from '@/components/knowledge/AyahOfTheDay';

export default function QuranPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Quran</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuranTracker />
        <AyahOfTheDay />
      </div>
    </div>
  );
}
