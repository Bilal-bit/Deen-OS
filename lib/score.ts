import { DailyLog } from '@/types';

export function calculateScore(log: Partial<DailyLog>): number {
  let score = 0;

  // Salah: 10 points each (50 max)
  const salahFields: (keyof DailyLog)[] = ['fajr', 'zuhr', 'asr', 'maghrib', 'isha'];
  salahFields.forEach((field) => {
    if (log[field]) score += 10;
  });

  // Quran: 20 points
  if (log.quran) score += 20;

  // Daily habits: 10 points each (30 max)
  const habitFields: (keyof DailyLog)[] = ['water', 'sleep', 'exercise'];
  habitFields.forEach((field) => {
    if (log[field]) score += 10;
  });

  return score; // max 100
}

// Extended score including bonus activities
export function calculateExtendedScore(log: Partial<DailyLog>): { base: number; bonus: number; total: number } {
  const base = calculateScore(log);
  let bonus = 0;

  // Nawafil: 5 points each
  if (log.tahajjud) bonus += 5;
  if (log.ishraq) bonus += 5;
  if (log.duha) bonus += 5;
  if (log.awwabin) bonus += 5;

  // Azkar: 5 points each
  if (log.morning_azkar) bonus += 5;
  if (log.evening_azkar) bonus += 5;

  // Ramadan: 5 points each
  if (log.fasting) bonus += 5;
  if (log.taraweeh) bonus += 5;
  if (log.sehri) bonus += 5;
  if (log.iftar_dua) bonus += 5;

  return { base, bonus, total: base + bonus };
}
