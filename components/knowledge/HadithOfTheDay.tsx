'use client';

import Card from '@/components/ui/Card';
import { getHadithOfTheDay } from '@/data/hadiths';
import { motion } from 'framer-motion';

export default function HadithOfTheDay() {
  const hadith = getHadithOfTheDay();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Hadith of the Day
        </h3>
        <span className="text-xs text-highlight bg-highlight/10 px-2 py-1 rounded-lg">
          {hadith.source}
        </span>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
        <p className="text-lg text-right leading-loose text-accent">{hadith.arabic}</p>
        <p className="text-sm text-text leading-relaxed">&ldquo;{hadith.translation}&rdquo;</p>
        <p className="text-xs text-subtext">— {hadith.narrator} | {hadith.source}</p>
      </motion.div>
    </Card>
  );
}
