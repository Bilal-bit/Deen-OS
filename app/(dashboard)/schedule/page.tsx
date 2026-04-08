'use client';

import TimeBlocking from '@/components/productivity/TimeBlocking';

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Daily Schedule</h2>
      <TimeBlocking />
    </div>
  );
}
