'use client';

import Card from '@/components/ui/Card';
import { getDuaOfTheDay } from '@/data/duas';
import { motion } from 'framer-motion';

export default function DuaOfTheDay() {
  const dua = getDuaOfTheDay();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Dua of the Day
        </h3>
        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-lg">
          #{dua.id}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <p className="text-xl text-right leading-loose font-arabic text-accent">
          {dua.arabic}
        </p>

        <p className="text-sm text-highlight italic">
          {dua.transliteration}
        </p>

        <p className="text-sm text-text leading-relaxed">
          {dua.translation}
        </p>

        <p className="text-xs text-subtext">
          {dua.reference}
        </p>
      </motion.div>
    </Card>
  );
}
