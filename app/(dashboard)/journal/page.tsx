'use client';

import DailyJournal from '@/components/productivity/DailyJournal';
import MoodTracker from '@/components/productivity/MoodTracker';

export default function JournalPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Daily Journal & Reflection</h2>
      <MoodTracker />
      <DailyJournal />
    </div>
  );
}
