'use client';

import Card from '@/components/ui/Card';
import { getAyahOfTheDay } from '@/data/ayahs';
import { motion } from 'framer-motion';

export default function AyahOfTheDay() {
  const ayah = getAyahOfTheDay();

  return (
    <Card className="border-primary/10 bg-gradient-to-br from-card to-primary/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Ayah of the Day
        </h3>
        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-lg">
          {ayah.surah} {ayah.surah_number}:{ayah.ayah_number}
        </span>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
        <p className="text-2xl text-right leading-loose text-accent">{ayah.arabic}</p>
        <p className="text-sm text-text leading-relaxed">&ldquo;{ayah.translation}&rdquo;</p>
        <p className="text-xs text-subtext">— Surah {ayah.surah} ({ayah.surah_number}:{ayah.ayah_number})</p>
      </motion.div>
    </Card>
  );
}
