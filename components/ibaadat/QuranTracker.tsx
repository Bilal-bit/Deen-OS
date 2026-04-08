'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { motion } from 'framer-motion';

const surahs = [
  'Al-Fatiha','Al-Baqarah','Al-Imran','An-Nisa','Al-Maidah','Al-Anam','Al-Araf',
  'Al-Anfal','At-Tawbah','Yunus','Hud','Yusuf','Ar-Rad','Ibrahim','Al-Hijr',
  'An-Nahl','Al-Isra','Al-Kahf','Maryam','Taha','Al-Anbiya','Al-Hajj',
  'Al-Muminun','An-Nur','Al-Furqan','Ash-Shuara','An-Naml','Al-Qasas',
  'Al-Ankabut','Ar-Rum','Luqman','As-Sajdah','Al-Ahzab','Saba','Fatir',
  'Ya-Sin','As-Saffat','Sad','Az-Zumar','Ghafir','Fussilat','Ash-Shura',
  'Az-Zukhruf','Ad-Dukhan','Al-Jathiyah','Al-Ahqaf','Muhammad','Al-Fath',
  'Al-Hujurat','Qaf','Adh-Dhariyat','At-Tur','An-Najm','Al-Qamar','Ar-Rahman',
  'Al-Waqiah','Al-Hadid','Al-Mujadila','Al-Hashr','Al-Mumtahanah','As-Saff',
  'Al-Jumuah','Al-Munafiqun','At-Taghabun','At-Talaq','At-Tahrim','Al-Mulk',
  'Al-Qalam','Al-Haqqah','Al-Maarij','Nuh','Al-Jinn','Al-Muzzammil',
  'Al-Muddaththir','Al-Qiyamah','Al-Insan','Al-Mursalat','An-Naba','An-Naziat',
  'Abasa','At-Takwir','Al-Infitar','Al-Mutaffifin','Al-Inshiqaq','Al-Buruj',
  'At-Tariq','Al-Ala','Al-Ghashiyah','Al-Fajr','Al-Balad','Ash-Shams',
  'Al-Lail','Ad-Duha','Ash-Sharh','At-Tin','Al-Alaq','Al-Qadr','Al-Bayyinah',
  'Az-Zalzalah','Al-Adiyat','Al-Qariah','At-Takathur','Al-Asr','Al-Humazah',
  'Al-Fil','Quraysh','Al-Maun','Al-Kawthar','Al-Kafirun','An-Nasr',
  'Al-Masad','Al-Ikhlas','Al-Falaq','An-Nas',
];

export default function QuranTracker() {
  const [currentJuz, setCurrentJuz] = useState(1);
  const [pagesRead, setPagesRead] = useState(0);
  const [currentSurah, setCurrentSurah] = useState(surahs[0]);
  const totalPages = 604;
  const khatmProgress = (pagesRead / totalPages) * 100;
  const juzProgress = (currentJuz / 30) * 100;

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Quran Progress
      </h3>

      {/* Khatm progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-text font-medium">Khatm Progress</span>
          <span className="text-primary">{pagesRead}/{totalPages} pages</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3">
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-primary to-highlight"
            animate={{ width: `${khatmProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-[10px] text-subtext mt-1">{khatmProgress.toFixed(1)}% complete</p>
      </div>

      {/* Current Juz & Surah */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs text-subtext mb-1 block">Current Juz</label>
          <select
            value={currentJuz}
            onChange={(e) => setCurrentJuz(Number(e.target.value))}
            className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-text appearance-none cursor-pointer"
          >
            {Array.from({ length: 30 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Juz {i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-subtext mb-1 block">Current Surah</label>
          <select
            value={currentSurah}
            onChange={(e) => setCurrentSurah(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-text appearance-none cursor-pointer"
          >
            {surahs.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pages today */}
      <div className="mb-4">
        <label className="text-xs text-subtext mb-1 block">Pages Read (Total)</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPagesRead(Math.max(0, pagesRead - 1))}
            className="w-8 h-8 rounded-lg bg-surface border border-white/10 text-text flex items-center justify-center cursor-pointer hover:bg-white/5"
          >
            -
          </button>
          <input
            type="number"
            value={pagesRead}
            onChange={(e) => setPagesRead(Math.min(totalPages, Math.max(0, Number(e.target.value))))}
            className="flex-1 bg-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-text text-center"
          />
          <button
            onClick={() => setPagesRead(Math.min(totalPages, pagesRead + 1))}
            className="w-8 h-8 rounded-lg bg-surface border border-white/10 text-text flex items-center justify-center cursor-pointer hover:bg-white/5"
          >
            +
          </button>
        </div>
      </div>

      {/* Juz visual */}
      <div>
        <p className="text-xs text-subtext mb-2">Juz Progress ({currentJuz}/30)</p>
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className={`h-3 rounded-sm transition-colors ${
                i + 1 <= currentJuz
                  ? 'bg-primary'
                  : 'bg-white/5'
              }`}
              title={`Juz ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
