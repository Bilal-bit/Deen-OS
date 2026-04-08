'use client';

import CustomHabits from '@/components/productivity/CustomHabits';
import GoalsTracker from '@/components/productivity/GoalsTracker';
import MoodTracker from '@/components/productivity/MoodTracker';

export default function ProductivityPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Productivity</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GoalsTracker />
        <CustomHabits />
      </div>

      <MoodTracker />
    </div>
  );
}
