import { DailyLog, AkhirahScoreBreakdown } from '@/types';

// Legacy simple score (0-100) for backward compat
export function calculateScore(log: Partial<DailyLog>): number {
  let score = 0;
  const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
  prayers.forEach((p) => {
    const v = log[p];
    if (v === 'on_time' || v === 'late') score += 10;
  });
  if (log.quran) score += 20;
  if (log.water) score += 10;
  if (log.sleep) score += 10;
  if (log.exercise) score += 10;
  return score;
}

// Full Akhirah Score (0-1000 scale)
export function calculateAkhirahScore(
  log: Partial<DailyLog>,
  consecutiveDaysAll5: number,
  isRamadan: boolean
): AkhirahScoreBreakdown {
  let prayersOnTime = 0;
  let prayersLate = 0;
  const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;

  prayers.forEach((p) => {
    const v = log[p];
    if (v === 'on_time') prayersOnTime += 20;
    else if (v === 'late') prayersLate += 10;
  });

  const quranScore = log.quran ? 15 : 0;

  let dhikrScore = 0;
  if (log.morning_dhikr) dhikrScore += 10;
  if (log.evening_dhikr) dhikrScore += 10;

  const fastingScore = log.fasting ? 30 : 0;
  const sadaqahScore = log.sadaqah ? 25 : 0;
  const consistencyBonus = consecutiveDaysAll5 >= 7 ? 50 : 0;
  const rawTotal = prayersOnTime + prayersLate + quranScore + dhikrScore + fastingScore + sadaqahScore + consistencyBonus;
  const multiplier = isRamadan ? 1.5 : 1;
  const total = Math.round(rawTotal * multiplier);

  return {
    prayers_on_time: prayersOnTime,
    prayers_late: prayersLate,
    quran: quranScore,
    dhikr: dhikrScore,
    fasting: fastingScore,
    sadaqah: sadaqahScore,
    consistency_bonus: consistencyBonus,
    ramadan_multiplier: multiplier,
    total: Math.min(total, 1000),
  };
}

// Get top 3 improvement suggestions
export function getImprovementTips(breakdown: AkhirahScoreBreakdown): string[] {
  const tips: { tip: string; potential: number }[] = [];
  if (breakdown.prayers_on_time < 100)
    tips.push({ tip: 'Pray all 5 prayers on time (+20 pts each)', potential: 100 - breakdown.prayers_on_time });
  if (breakdown.quran === 0)
    tips.push({ tip: 'Read Quran today (+15 pts)', potential: 15 });
  if (breakdown.dhikr < 20)
    tips.push({ tip: 'Complete morning & evening dhikr (+10 pts each)', potential: 20 - breakdown.dhikr });
  if (breakdown.fasting === 0)
    tips.push({ tip: 'Fast today for extra reward (+30 pts)', potential: 30 });
  if (breakdown.sadaqah === 0)
    tips.push({ tip: 'Give sadaqah today (+25 pts)', potential: 25 });
  if (breakdown.consistency_bonus === 0)
    tips.push({ tip: 'Maintain 7-day all-prayers streak for bonus (+50 pts)', potential: 50 });

  return tips.sort((a, b) => b.potential - a.potential).slice(0, 3).map((t) => t.tip);
}

// Count how many of the 5 fard prayers were prayed
export function getPrayerCount(log: Partial<DailyLog>): { completed: number; onTime: number; late: number } {
  const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
  let onTime = 0, late = 0;
  prayers.forEach((p) => {
    const v = log[p];
    if (v === 'on_time') onTime++;
    else if (v === 'late') late++;
  });
  return { completed: onTime + late, onTime, late };
}

// Check if all 5 prayers were completed for a log
export function allPrayersCompleted(log: Partial<DailyLog>): boolean {
  const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
  return prayers.every((p) => log[p] === 'on_time' || log[p] === 'late');
}
