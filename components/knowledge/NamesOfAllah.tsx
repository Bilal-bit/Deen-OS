'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { allahNames, getNameOfTheDay } from '@/data/allahNames';
import { motion, AnimatePresence } from 'framer-motion';

export default function NamesOfAllah() {
  const todayName = getNameOfTheDay();
  const [showAll, setShowAll] = useState(false);
  const [selectedName, setSelectedName] = useState(todayName);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          99 Names of Allah
        </h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-primary hover:text-accent cursor-pointer"
        >
          {showAll ? 'Show Today' : 'View All'}
        </button>
      </div>

      {!showAll ? (
        <motion.div
          key={selectedName.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <p className="text-xs text-subtext">Name of the Day — #{todayName.id}</p>
          <p className="text-4xl text-accent leading-relaxed">{selectedName.arabic}</p>
          <p className="text-lg text-primary font-medium">{selectedName.transliteration}</p>
          <p className="text-sm text-text">{selectedName.meaning}</p>
          <p className="text-xs text-subtext">{selectedName.brief}</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-3 gap-1.5 max-h-80 overflow-y-auto pr-1">
          {allahNames.map((name) => (
            <button
              key={name.id}
              onClick={() => { setSelectedName(name); setShowAll(false); }}
              className={`p-2 rounded-lg text-center cursor-pointer transition-all hover:bg-primary/10 ${
                name.id === selectedName.id ? 'bg-primary/15 border border-primary/30' : 'bg-surface border border-white/5'
              }`}
            >
              <p className="text-lg text-accent">{name.arabic}</p>
              <p className="text-[9px] text-subtext truncate">{name.transliteration}</p>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
