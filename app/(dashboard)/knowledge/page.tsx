'use client';

import HadithOfTheDay from '@/components/knowledge/HadithOfTheDay';
import IslamicQuiz from '@/components/knowledge/IslamicQuiz';
import NamesOfAllah from '@/components/knowledge/NamesOfAllah';
import AyahOfTheDay from '@/components/knowledge/AyahOfTheDay';
import DuaOfTheDay from '@/components/ibaadat/DuaOfTheDay';

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Knowledge & Learning</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AyahOfTheDay />
        <HadithOfTheDay />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IslamicQuiz />
        <NamesOfAllah />
      </div>

      <DuaOfTheDay />
    </div>
  );
}
