'use client';

import PrayerTimesWidget from '@/components/prayer/PrayerTimesWidget';

export default function PrayerTimesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Prayer Times</h2>
      <p className="text-sm text-subtext">Accurate daily prayer times based on your location, powered by Aladhan API.</p>
      <div className="max-w-md">
        <PrayerTimesWidget />
      </div>
    </div>
  );
}
