'use client';

import QazaTracker from '@/components/prayer/QazaTracker';

export default function QazaPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Qaza Prayer Tracker</h2>
      <p className="text-sm text-subtext">Track and make up missed prayers. Add prayers you owe and mark them as completed.</p>
      <QazaTracker />
    </div>
  );
}
