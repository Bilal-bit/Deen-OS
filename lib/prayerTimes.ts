import { PrayerTime, SalahName } from '@/types';

interface AladhanTiming {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface AladhanResponse {
  data: {
    timings: AladhanTiming;
    date: {
      hijri: {
        month: { number: number; en: string };
        year: string;
        day: string;
      };
    };
  };
}

export async function fetchPrayerTimes(city: string, country: string): Promise<PrayerTime | null> {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`
    );
    if (!res.ok) return null;
    const json: AladhanResponse = await res.json();
    const t = json.data.timings;
    return {
      fajr: t.Fajr.replace(/\s*\(.*\)/, ''),
      sunrise: t.Sunrise.replace(/\s*\(.*\)/, ''),
      dhuhr: t.Dhuhr.replace(/\s*\(.*\)/, ''),
      asr: t.Asr.replace(/\s*\(.*\)/, ''),
      maghrib: t.Maghrib.replace(/\s*\(.*\)/, ''),
      isha: t.Isha.replace(/\s*\(.*\)/, ''),
    };
  } catch {
    return null;
  }
}

export async function isRamadan(city: string, country: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`
    );
    if (!res.ok) return false;
    const json: AladhanResponse = await res.json();
    return json.data.date.hijri.month.number === 9;
  } catch {
    return false;
  }
}

export function getNextPrayer(times: PrayerTime): { name: SalahName; time: string; minutesLeft: number } | null {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayerOrder: { name: SalahName; key: keyof PrayerTime }[] = [
    { name: 'fajr', key: 'fajr' },
    { name: 'dhuhr', key: 'dhuhr' },
    { name: 'asr', key: 'asr' },
    { name: 'maghrib', key: 'maghrib' },
    { name: 'isha', key: 'isha' },
  ];

  for (const prayer of prayerOrder) {
    const [h, m] = times[prayer.key].split(':').map(Number);
    const prayerMinutes = h * 60 + m;
    if (prayerMinutes > currentMinutes) {
      return { name: prayer.name, time: times[prayer.key], minutesLeft: prayerMinutes - currentMinutes };
    }
  }

  // All prayers passed today — next is Fajr tomorrow
  const [fH, fM] = times.fajr.split(':').map(Number);
  const fajrMinutes = fH * 60 + fM;
  const minutesLeft = (24 * 60 - currentMinutes) + fajrMinutes;
  return { name: 'fajr', time: times.fajr, minutesLeft };
}

export function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export const prayerInfo: Record<SalahName, { arabic: string; label: string }> = {
  fajr: { arabic: 'الفجر', label: 'Fajr' },
  dhuhr: { arabic: 'الظهر', label: 'Dhuhr' },
  asr: { arabic: 'العصر', label: 'Asr' },
  maghrib: { arabic: 'المغرب', label: 'Maghrib' },
  isha: { arabic: 'العشاء', label: 'Isha' },
};
