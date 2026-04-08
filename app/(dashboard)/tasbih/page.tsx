'use client';

import TasbihCounter from '@/components/ibaadat/TasbihCounter';

export default function TasbihPage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-text text-center">Digital Tasbih</h2>
      <TasbihCounter />
    </div>
  );
}
