// Simple Hijri date approximation
// For production, use a proper Hijri calendar library
export function toHijri(date: Date): string {
  const gregorianEpoch = new Date(622, 6, 16).getTime();
  const diff = date.getTime() - gregorianEpoch;
  const hijriDays = diff / (1000 * 60 * 60 * 24);
  const hijriYears = Math.floor(hijriDays / 354.36667);
  const remainingDays = hijriDays - hijriYears * 354.36667;
  const hijriMonth = Math.floor(remainingDays / 29.53056) + 1;
  const hijriDay = Math.floor(remainingDays % 29.53056) + 1;

  const months = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Ula', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhul Qadah', 'Dhul Hijjah',
  ];

  const monthName = months[Math.min(hijriMonth - 1, 11)] || months[0];
  return `${hijriDay} ${monthName} ${hijriYears} AH`;
}
